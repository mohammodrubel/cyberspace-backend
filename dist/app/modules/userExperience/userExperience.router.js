"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExperienceRoutes = void 0;
// userExperience.routes.ts
const express_1 = require("express");
const userExperience_controller_1 = require("./userExperience.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), userExperience_controller_1.userExperienceController.createExperience);
router.get('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), userExperience_controller_1.userExperienceController.getAllExperience);
router.patch('/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), userExperience_controller_1.userExperienceController.updateExperience);
router.delete('/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), userExperience_controller_1.userExperienceController.deleteExperience);
exports.userExperienceRoutes = router;
