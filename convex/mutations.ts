import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const createVisaApplication = mutation({
  args: {
    fullName: v.string(),
    idNumber: v.string(),
    passportNumber: v.string(),
    passportImageStorageId: v.id("_storage"),
    personalImageStorageId: v.id("_storage"),
    email: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    // Get file URLs from storage
    const passportImageUrl = await ctx.storage.getUrl(args.passportImageStorageId);
    const personalImageUrl = await ctx.storage.getUrl(args.personalImageStorageId);

    const applicationId = await ctx.db.insert("visaApplications", {
      fullName: args.fullName,
      idNumber: args.idNumber,
      passportNumber: args.passportNumber,
      passportImageUrl: passportImageUrl || "",
      personalImageUrl: personalImageUrl || "",
      status: "pending",
      paymentStatus: "pending",
      submittedAt: Date.now(),
      email: args.email,
      phone: args.phone,
    });

    // Schedule email to be sent after mutation completes
    await ctx.scheduler.runAfter(0, api.emails.sendApplicationConfirmationEmail, {
      email: args.email,
      fullName: args.fullName,
      applicationId,
    });

    return applicationId;
  },
});

export const updatePaymentStatus = mutation({
  args: {
    applicationId: v.id("visaApplications"),
    paymentStatus: v.union(v.literal("pending"), v.literal("paid"), v.literal("failed")),
    paymentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (!application) {
      throw new Error("Application not found");
    }

    await ctx.db.patch(args.applicationId, {
      paymentStatus: args.paymentStatus,
      paymentId: args.paymentId,
    });

    // Send email if payment was successful
    if (args.paymentStatus === "paid") {
      await ctx.scheduler.runAfter(0, api.emails.sendPaymentConfirmationEmail, {
        email: application.email,
        fullName: application.fullName,
        applicationId: args.applicationId,
      });
    }
  },
});

export const updateApplicationStatus = mutation({
  args: {
    applicationId: v.id("visaApplications"),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed")
    ),
    visaDocumentUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (!application) {
      throw new Error("Application not found");
    }

    const update: any = {
      status: args.status,
    };

    if (args.status === "processing") {
      update.processedAt = Date.now();
    }

    if (args.status === "completed") {
      update.completedAt = Date.now();
      if (args.visaDocumentUrl) {
        update.visaDocumentUrl = args.visaDocumentUrl;
      }
    }

    if (args.notes) {
      update.notes = args.notes;
    }

    await ctx.db.patch(args.applicationId, update);

    // Send status update email for important status changes
    if (["processing", "approved", "completed", "rejected"].includes(args.status)) {
      await ctx.scheduler.runAfter(0, api.emails.sendStatusUpdateEmail, {
        email: application.email,
        fullName: application.fullName,
        applicationId: args.applicationId,
        status: args.status,
        notes: args.notes,
      });
    }
  },
});