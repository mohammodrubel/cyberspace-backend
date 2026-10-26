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
exports.skillService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createSkill = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userSkill.create({
        data: {
            name: payload.name,
            category: payload.category,
            experience: payload.experience,
            proficiency: payload.proficiency,
            userId: userId
        }
    });
    return result;
});
const getSingleSkill = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userSkill.findMany({
        where: {
            userId: id
        }
    });
    return result;
});
const updateSingleSkill = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidSkill = yield prisma_1.default.userSkill.findUnique({
        where: {
            id: id
        }
    });
    if (!isValidSkill) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Skill Not Found');
    }
    const result = yield prisma_1.default.userSkill.update({
        where: {
            id: id,
            userId: isValidSkill.userId
        },
        data: payload
    });
    return result;
});
const deleteUserSkill = (skillId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const skill = yield prisma_1.default.userSkill.findFirst({
        where: {
            id: skillId,
        },
    });
    if (!skill) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Skill not found or unauthorized');
    }
    const result = yield prisma_1.default.userSkill.delete({
        where: {
            id: skillId,
            userId: userId
        },
    });
    return result;
});
exports.skillService = {
    createSkill,
    getSingleSkill,
    updateSingleSkill,
    deleteUserSkill,
};
