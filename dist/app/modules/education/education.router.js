"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationRoutes = void 0;
// education.routes.ts
const express_1 = require("express");
const education_controller_1 = require("./education.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const education_validation_1 = require("./education.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), (0, validateRequest_1.default)(education_validation_1.educationValidation.educationValidationSchema), education_controller_1.educationController.createEducation);
router.get('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), education_controller_1.educationController.getEducation);
router.patch('/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), (0, validateRequest_1.default)(education_validation_1.educationValidation.educationValidationSchema), education_controller_1.educationController.updateEducation);
router.delete('/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), education_controller_1.educationController.deleteEducation);
exports.educationRoutes = router;
