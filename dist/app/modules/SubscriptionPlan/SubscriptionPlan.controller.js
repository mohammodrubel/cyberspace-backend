"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionPlanController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const SubscriptionPlan_service_1 = require("./SubscriptionPlan.service");
const createSubscriptionPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SubscriptionPlan_service_1.subscriptionPlanService.createSubscriptionPlan(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Subscription plan created successfully",
        data: result,
    });
}));
const getAllSubscriptionPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SubscriptionPlan_service_1.subscriptionPlanService.getAllSubscriptionPlan();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Subscriptions retrieved successfully",
        data: result,
    });
}));
const getSingleSubscriptionPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SubscriptionPlan_service_1.subscriptionPlanService.getSingleSubscriptionPlan(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Subscription retrieved successfully",
        data: result,
    });
}));
const updateSubscriptionPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SubscriptionPlan_service_1.subscriptionPlanService.updateSubscriptionPlan(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Subscription updated successfully",
        data: result,
    });
}));
const deleteSubscriptionPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SubscriptionPlan_service_1.subscriptionPlanService.deleteSubscriptionPlan(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Subscription deleted successfully",
        data: result,
    });
}));
exports.subscriptionPlanController = {
    createSubscriptionPlan,
    getAllSubscriptionPlan,
    getSingleSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
};
