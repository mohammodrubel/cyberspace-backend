"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobApplicationRouter = void 0;
// education.routes.ts
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const JobApplication_controller_1 = require("./JobApplication.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.Role.USER), JobApplication_controller_1.JobApplicationController.applyJob);
router.get('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), JobApplication_controller_1.JobApplicationController.getAllApply);
router.get('/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), JobApplication_controller_1.JobApplicationController.getSingleJob);
// router.patch(
//   '/:id',
//   auth(Role.USER),
//   JobApplicationController.,
// );
router.delete('/:id', (0, auth_1.default)(client_1.Role.MODERATOR, client_1.Role.USER, client_1.Role.ADMIN), JobApplication_controller_1.JobApplicationController.deleteJob);
exports.jobApplicationRouter = router;
