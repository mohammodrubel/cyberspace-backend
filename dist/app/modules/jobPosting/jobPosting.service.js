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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const pagination_1 = __importDefault(require("../../utils/pagination"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const createJobPost = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "file is required");
    }
    const uniqueImageName = `company-${Date.now()}`;
    const uploadedImage = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(file.path, uniqueImageName);
    const reuslt = yield prisma_1.default.job.create({
        data: Object.assign(Object.assign({}, data), { companyLogo: uploadedImage.secure_url })
    });
    return reuslt;
});
// http://localhost:9000/api/get-all-job?workMode=REMOTE&salaryMin=500&salaryMax=1500&searchTerm=Dhaka Mirpur&jobType=CONTRACT&dateStart=2026-02-20T00:00:00.000Z&dateEnd=2026-02-21T23:59:59.999Z&datePosted=month
const getAllJobPosts = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { searchTerm } = query, filter = __rest(query, ["searchTerm"]);
    const { limit, page, order, sort } = (0, pagination_1.default)(options);
    const andCondition = [];
    // 1️⃣ Search term
    if (searchTerm) {
        const orCondition = [];
        ["title", "description", "companyName", "location"].forEach((field) => {
            orCondition.push({ [field]: { contains: searchTerm, mode: "insensitive" } });
        });
        andCondition.push({ OR: orCondition });
    }
    // 2️⃣ Filters
    if (filter.salaryMin || filter.salaryMax) {
        andCondition.push({
            AND: [
                { salaryMin: { lte: Number((_a = filter.salaryMax) !== null && _a !== void 0 ? _a : Infinity) } },
                { salaryMax: { gte: Number((_b = filter.salaryMin) !== null && _b !== void 0 ? _b : 0) } },
            ],
        });
    }
    if (filter.workMode)
        andCondition.push({ workMode: filter.workMode });
    if (filter.jobType)
        andCondition.push({ jobType: filter.jobType });
    if (filter.status)
        andCondition.push({ status: filter.status });
    if (filter.location)
        andCondition.push({ location: { contains: filter.location, mode: "insensitive" } });
    if (filter.companyName)
        andCondition.push({ companyName: { contains: filter.companyName, mode: "insensitive" } });
    if (filter.tags) {
        const tagsArray = Array.isArray(filter.tags) ? filter.tags : [filter.tags];
        andCondition.push({ tags: { hasSome: tagsArray } });
    }
    // 3️⃣ Date filters
    // Preset: today/week/month
    if (filter.datePosted) {
        const now = new Date();
        let fromDate;
        if (filter.datePosted === "today") {
            fromDate = new Date();
            fromDate.setDate(now.getDate() - 1);
        }
        else if (filter.datePosted === "week") {
            fromDate = new Date();
            fromDate.setDate(now.getDate() - 7);
        }
        else if (filter.datePosted === "month") {
            fromDate = new Date();
            fromDate.setMonth(now.getMonth() - 1);
        }
        if (fromDate) {
            andCondition.push({ createdAt: { gte: fromDate } });
        }
    }
    // Custom range: dateStart & dateEnd
    if (filter.dateStart && filter.dateEnd) {
        const start = new Date(filter.dateStart);
        const end = new Date(filter.dateEnd);
        andCondition.push({ createdAt: { gte: start, lte: end } });
    }
    // 4️⃣ Build where condition
    const whereCondition = andCondition.length ? { AND: andCondition } : {};
    console.log("Where condition:", JSON.stringify(whereCondition, null, 2));
    // 5️⃣ Fetch data
    const result = yield prisma_1.default.job.findMany({
        where: whereCondition,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: options.sort && options.order ? { [sort]: order } : { createdAt: "desc" },
    });
    const total = yield prisma_1.default.job.count({ where: whereCondition });
    return {
        meta: { page: Number(page), limit: Number(limit), total },
        data: result,
    };
});
const getSingleJobPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reuslt = yield prisma_1.default.job.findUnique({
        where: {
            id: id
        }
    });
    return reuslt;
});
const updateJobPost = () => __awaiter(void 0, void 0, void 0, function* () { });
const deleteJobPost = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.JobPostService = {
    createJobPost,
    getAllJobPosts,
    getSingleJobPost,
    updateJobPost,
    deleteJobPost
};
