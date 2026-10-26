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
exports.UserExperienceService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createExperience = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(data,"service")
    if (!data.company || !data.role || !data.startDate) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "company, role, startDate required");
    }
    const result = yield prisma_1.default.userExperience.create({
        data: {
            company: data === null || data === void 0 ? void 0 : data.company,
            role: data === null || data === void 0 ? void 0 : data.role,
            startDate: data === null || data === void 0 ? void 0 : data.startDate,
            endDate: data === null || data === void 0 ? void 0 : data.endDate,
            isCurrent: (data === null || data === void 0 ? void 0 : data.isCurrent) || false,
            location: data === null || data === void 0 ? void 0 : data.location,
            description: data === null || data === void 0 ? void 0 : data.description,
            industry: data === null || data === void 0 ? void 0 : data.industry,
            userId: userId
        }
    });
    return result;
});
const getAllExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userExperience.findMany({
        where: {
            userId: id
        }
    });
    return result;
});
const updateExperience = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidUserExperience = yield prisma_1.default.userExperience.findUnique({
        where: {
            id: id
        }
    });
    if (!isValidUserExperience) {
        throw new AppError_1.default(http_status_1.default.OK, "invalid user experience id");
    }
    const result = yield prisma_1.default.userExperience.update({
        where: {
            id: id
        },
        data: data
    });
    return result;
});
const deleteExperience = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidUserExperience = yield prisma_1.default.userExperience.findUnique({
        where: {
            id: id
        }
    });
    if (!isValidUserExperience) {
        throw new AppError_1.default(http_status_1.default.OK, "invalid user experience id");
    }
    const reuslt = yield prisma_1.default.userExperience.delete({
        where: {
            id: id
        }
    });
    return reuslt;
});
exports.UserExperienceService = {
    createExperience,
    getAllExperience,
    updateExperience,
    deleteExperience
};
