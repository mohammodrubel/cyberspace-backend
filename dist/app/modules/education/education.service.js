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
exports.educationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createEducation = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure required fields have fallbacks if needed
    const result = yield prisma_1.default.education.create({
        data: {
            degree: data.degree || '',
            userId: userId,
            institute: data.institute || '',
            fieldOfStudy: data.fieldOfStudy || '',
            startYear: data.startYear,
            endYear: data.endYear,
            isCurrent: data.isCurrent || false,
            grade: data.grade || '',
            description: data.description || '',
        },
    });
    return result;
});
const getEducation = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId, "userid");
    return prisma_1.default.education.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
});
const updateEducation = (educationId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma_1.default.education.findUnique({
        where: { id: educationId },
    });
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Education record not found');
    }
    const result = yield prisma_1.default.education.update({
        where: { id: educationId },
        data,
    });
    return result;
});
const deleteEducation = (educationId) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma_1.default.education.findUnique({
        where: { id: educationId },
    });
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Education record not found');
    }
    const result = yield prisma_1.default.education.delete({
        where: { id: educationId },
    });
    return result;
});
exports.educationService = {
    createEducation,
    getEducation,
    updateEducation,
    deleteEducation,
};
