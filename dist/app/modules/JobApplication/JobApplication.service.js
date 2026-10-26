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
exports.JobApplicationService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const applyJob = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.jobApplication.create({
        data: Object.assign(Object.assign({}, payload), { userId: userId })
    });
    return result;
});
const getAllApply = () => __awaiter(void 0, void 0, void 0, function* () {
});
const getSingleJob = () => __awaiter(void 0, void 0, void 0, function* () { });
const deleteJob = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.JobApplicationService = {
    applyJob,
    getAllApply,
    getSingleJob,
    deleteJob
};
