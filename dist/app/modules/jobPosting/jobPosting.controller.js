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
exports.JobPostController = exports.deleteJobPost = exports.updateJobPost = exports.getAllJobPosts = exports.getSingleJobPost = exports.createJobPost = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const jobPosting_service_1 = require("./jobPosting.service");
const PickFunction_1 = __importDefault(require("../../utils/PickFunction"));
const jobPostingConstant_1 = require("./jobPostingConstant");
// Create Job Post
exports.createJobPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const result = yield jobPosting_service_1.JobPostService.createJobPost(file, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Created job post successfully",
        data: result,
    });
}));
// Get Single Job Post
exports.getSingleJobPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield jobPosting_service_1.JobPostService.getSingleJobPost(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Fetched job post successfully",
        data: result,
    });
}));
// Get All Job Posts
exports.getAllJobPosts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, PickFunction_1.default)(req.query, jobPostingConstant_1.jobSearchFields);
    const options = (0, PickFunction_1.default)(req.query, jobPostingConstant_1.paginationFields);
    const result = yield jobPosting_service_1.JobPostService.getAllJobPosts(filter, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Fetched all job posts successfully",
        data: result,
    });
}));
// Update Job Post
exports.updateJobPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield jobPosting_service_1.JobPostService.updateJobPost(id, updatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Updated job post successfully",
        data: result,
    });
}));
// Delete Job Post
exports.deleteJobPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield jobPosting_service_1.JobPostService.deleteJobPost(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Deleted job post successfully",
        data: result,
    });
}));
exports.JobPostController = {
    createJobPost: exports.createJobPost,
    getAllJobPosts: exports.getAllJobPosts,
    getSingleJobPost: exports.getSingleJobPost,
    updateJobPost: exports.updateJobPost,
    deleteJobPost: exports.deleteJobPost
};
