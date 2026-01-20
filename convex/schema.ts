import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  visaApplications: defineTable({
    fullName: v.string(),
    idNumber: v.string(),
    passportNumber: v.string(),
    passportImageUrl: v.string(),
    personalImageUrl: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed")
    ),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed")
    ),
    paymentId: v.optional(v.string()),
    submittedAt: v.number(),
    processedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    email: v.string(),
    phone: v.string(),
    visaDocumentUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_payment_status", ["paymentStatus"])
    .index("by_submitted_at", ["submittedAt"]),
});