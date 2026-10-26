"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_router_1 = require("../modules/user/user.router");
const userSkill_router_1 = require("../modules/userSkill/userSkill.router");
const user_profile_router_1 = require("../modules/user-profile/user-profile.router");
const education_router_1 = require("../modules/education/education.router");
const userExperience_router_1 = require("../modules/userExperience/userExperience.router");
const jobPosting_router_1 = require("../modules/jobPosting/jobPosting.router");
const JobApplication_router_1 = require("../modules/JobApplication/JobApplication.router");
const SubscriptionPlan_router_1 = require("../modules/SubscriptionPlan/SubscriptionPlan.router");
const router = express_1.default.Router();
const routes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/user',
        route: user_router_1.userRouter,
    },
    {
        path: '/user-skill',
        route: userSkill_router_1.skillRoutes,
    },
    {
        path: '/user-profile',
        route: user_profile_router_1.userProfileRouter,
    },
    {
        path: '/education',
        route: education_router_1.educationRoutes,
    },
    {
        path: '/experience',
        route: userExperience_router_1.userExperienceRoutes,
    },
    {
        path: '/',
        route: jobPosting_router_1.jobPostingRoutes,
    },
    {
        path: '/job-application',
        route: JobApplication_router_1.jobApplicationRouter,
    },
    {
        path: '/subscription-plan',
        route: SubscriptionPlan_router_1.subscriptionPlanRouter,
    },
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
