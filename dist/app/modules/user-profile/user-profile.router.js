"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const user_profile_controller_1 = require("./user-profile.controller");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), user_profile_controller_1.userProfileController.getSingleUsers);
router.patch('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), user_profile_controller_1.userProfileController.updateProfile);
exports.userProfileRouter = router;
