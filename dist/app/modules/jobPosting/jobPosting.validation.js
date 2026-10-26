"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobZodSchema = exports.JobStatusEnum = exports.WorkModeEnum = exports.JobTypeEnum = void 0;
const zod_1 = require("zod");
// Enums (match your Prisma enums exactly)
exports.JobTypeEnum = zod_1.z.enum([
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERNSHIP",
    "FREELANCE",
]);
exports.WorkModeEnum = zod_1.z.enum([
    "ONSITE",
    "REMOTE",
    "HYBRID",
]);
exports.JobStatusEnum = zod_1.z.enum([
    "PENDING",
    "APPROVED",
    "CLOSED",
    "REJECTED",
]);
exports.JobZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(3, { message: "Title must be at least 3 characters" }),
        description: zod_1.z
            .string()
            .min(10, { message: "Description must be at least 10 characters" }),
        jobType: exports.JobTypeEnum,
        workMode: exports.WorkModeEnum,
        salaryMin: zod_1.z
            .number({ invalid_type_error: "Salary min must be a number" })
            .int()
            .nonnegative()
            .optional(),
        salaryMax: zod_1.z
            .number({ invalid_type_error: "Salary max must be a number" })
            .int()
            .nonnegative()
            .optional(),
        status: exports.JobStatusEnum.optional(),
        postedById: zod_1.z.string().uuid().optional(),
        approvedAt: zod_1.z.string().datetime().optional(),
        closedAt: zod_1.z.string().datetime().optional(),
        deadline: zod_1.z.string().datetime({ message: "Deadline must be a valid ISO date string" }),
        publishedAt: zod_1.z.string().datetime().optional(),
        // New fields added from your updated schema
        tags: zod_1.z.array(zod_1.z.string()).min(1, { message: "At least one tag is required" }), // required array
        companyName: zod_1.z.string().min(1, { message: "Company name is required" }),
        location: zod_1.z.string().min(1, { message: "Location is required" }),
    })
});
