"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobApplicationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createJobApplicationSchema = zod_1.default.object({
    body: zod_1.default.object({
        jobId: zod_1.default.string().uuid("Invalid jobId"),
        resumeId: zod_1.default.string().uuid("Invalid resumeId").optional().nullable(),
        coverLetter: zod_1.default
            .string()
            .min(100)
            .max(5000, "Cover letter must be under 5000 characters")
            .optional()
            .nullable(),
    })
});
