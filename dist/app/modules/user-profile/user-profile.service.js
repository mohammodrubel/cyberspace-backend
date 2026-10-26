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
exports.UserProfileService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Check if user exists
    const isValidUser = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    if (!isValidUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // 2. Check if user profile exists before updating
    const existingProfile = yield prisma_1.default.userProfile.findUnique({
        where: {
            userId: id,
        },
    });
    if (!existingProfile) {
        // Option 1: Create profile if it doesn't exist
        const result = yield prisma_1.default.userProfile.create({
            data: Object.assign({ userId: id }, payload),
        });
        return result;
    }
    // 3. Update existing profile
    const result = yield prisma_1.default.userProfile.update({
        where: {
            userId: id, // Correct - using userId which is @unique
        },
        data: payload,
    });
    return result; // Fixed typo: "reuslt" -> "result"
});
const getSingleUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma_1.default.userProfile.findUnique({
        where: {
            userId: id
        },
    });
    return response;
});
exports.UserProfileService = {
    updateSingleUser,
    getSingleUsers,
};
