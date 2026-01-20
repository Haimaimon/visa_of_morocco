import { query } from "./_generated/server";
import { v } from "convex/values";

export const getApplication = query({
  args: { applicationId: v.id("visaApplications") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.applicationId);
  },
});

// Secure query that verifies email access
export const getApplicationByEmail = query({
  args: {
    applicationId: v.id("visaApplications"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    
    // Security check: verify email matches
    if (!application) {
      return null;
    }
    
    // Only return application if email matches
    if (application.email.toLowerCase() !== args.email.toLowerCase()) {
      return null; // Don't reveal if application exists
    }
    
    return application;
  },
});

export const getAllApplications = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("visaApplications")
      .withIndex("by_submitted_at")
      .order("desc")
      .collect();
  },
});

export const getApplicationsByStatus = query({
  args: {
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("visaApplications")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});