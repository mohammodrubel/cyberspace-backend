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
exports.subscriptionPlanService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createSubscriptionPlan = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.subscriptionPlan.create({
        data: Object.assign({}, payload)
    });
    return result;
});
const getAllSubscriptionPlan = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.subscriptionPlan.findMany({
        where: {}
    });
    return result;
});
const getSingleSubscriptionPlan = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidSubscription = yield prisma_1.default.subscriptionPlan.findUnique({
        where: {
            id: id
        }
    });
    if (!isValidSubscription) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "invalid subscription");
    }
    const rueslt = yield prisma_1.default.subscriptionPlan.findUnique({
        where: {
            id: id,
            status: "ACTIVE"
        }
    });
    return rueslt;
});
const updateSubscriptionPlan = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidSubscription = yield prisma_1.default.subscriptionPlan.findUnique({
        where: {
            id: id,
        },
    });
    if (!isValidSubscription) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Invalid subscription plan");
    }
    const result = yield prisma_1.default.subscriptionPlan.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return result;
});
const deleteSubscriptionPlan = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reuslt = yield prisma_1.default.subscriptionPlan.delete({
        where: {
            id: id
        }
    });
    return reuslt;
});
exports.subscriptionPlanService = {
    createSubscriptionPlan,
    getAllSubscriptionPlan,
    getSingleSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan
};
