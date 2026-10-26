"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionPlanRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const SubscriptionPlan_controller_1 = require("./SubscriptionPlan.controller");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)(client_1.Role.RECRUITER, client_1.Role.USER), SubscriptionPlan_controller_1.subscriptionPlanController.createSubscriptionPlan);
router.get('/', SubscriptionPlan_controller_1.subscriptionPlanController.getAllSubscriptionPlan);
router
    .route('/:id')
    .get(SubscriptionPlan_controller_1.subscriptionPlanController.getSingleSubscriptionPlan)
    .patch((0, auth_1.default)(client_1.Role.ADMIN), SubscriptionPlan_controller_1.subscriptionPlanController.updateSubscriptionPlan)
    .delete((0, auth_1.default)(client_1.Role.ADMIN), SubscriptionPlan_controller_1.subscriptionPlanController.deleteSubscriptionPlan);
exports.subscriptionPlanRouter = router;
