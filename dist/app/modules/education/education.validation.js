"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationValidation = exports.educationValidationSchema = void 0;
const zod_1 = require("zod");
exports.educationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        institute: zod_1.z
            .string()
            .min(1, "Institute is required")
            .max(255),
        degree: zod_1.z
            .string()
            .min(1, "Degree is required")
            .max(255)
            .optional(),
        fieldOfStudy: zod_1.z
            .string()
            .max(255)
            .optional()
            .nullable(),
        startYear: zod_1.z
            .string()
            .optional()
            .nullable(),
        endYear: zod_1.z
            .string()
            .optional()
            .nullable(),
        isCurrent: zod_1.z.boolean().default(false),
        grade: zod_1.z
            .string()
            .max(50)
            .optional()
            .nullable(),
        description: zod_1.z
            .string()
            .max(1000)
            .optional()
            .nullable(),
    })
});
exports.educationValidation = {
    educationValidationSchema: exports.educationValidationSchema
};
