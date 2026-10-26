"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const userSkill_controller_1 = require("./userSkill.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), userSkill_controller_1.skillController.createSkill);
router.get('/', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), userSkill_controller_1.skillController.getSingleSkill);
router
    .route('/:id')
    .get((0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), userSkill_controller_1.skillController.getSingleSkill)
    .patch((0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), userSkill_controller_1.skillController.updateSingleSkill)
    .delete((0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.USER, client_1.Role.RECRUITER), userSkill_controller_1.skillController.deleteUserSkill);
exports.skillRoutes = router;
