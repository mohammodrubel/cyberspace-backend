"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobPostingRoutes = void 0;
// education.routes.ts
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const jobPosting_controller_1 = require("./jobPosting.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = (0, express_1.Router)();
router.post('/job-posting', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), sendImageToCloudinary_1.upload.single("file"), (req, res, next) => {
    if (req.body.data) {
        try {
            req.body = JSON.parse(req.body.data); // Parse the JSON string
        }
        catch (error) {
            return res.status(400).json({ message: "Invalid JSON data" });
        }
    }
    next();
}, jobPosting_controller_1.JobPostController.createJobPost);
router.get('/get-all-job', jobPosting_controller_1.JobPostController.getAllJobPosts);
router.get('/get-single-job/:id', jobPosting_controller_1.JobPostController.getSingleJobPost);
router.patch('/update-job/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), jobPosting_controller_1.JobPostController.updateJobPost);
router.delete('/job-remove/:id', (0, auth_1.default)(client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.RECRUITER, client_1.Role.USER), jobPosting_controller_1.JobPostController.deleteJobPost);
exports.jobPostingRoutes = router;
