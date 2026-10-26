"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationFields = exports.jobSearchFields = void 0;
exports.jobSearchFields = [
    "workMode",
    "searchTerm",
    "salaryMin",
    "salaryMax",
    "jobType",
    "datePosted", // preset filter: today/week/month
    "dateStart", // custom range start
    "dateEnd" // custom range end
];
exports.paginationFields = ['limit', 'page', 'sort', 'order'];
