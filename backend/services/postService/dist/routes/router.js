"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicationValidator_1 = __importDefault(require("../validators/applicationValidator"));
const editGigValidator_1 = __importDefault(require("../validators/editGigValidator"));
// import { deleteGigValidator } from "../validators/deleteGigvalidator";
const multerConfig_1 = __importDefault(require("../utils/multerConfig"));
const common_1 = require("@_opportune/common");
const express_validator_1 = require("express-validator");
const inversify_1 = __importDefault(require("../config/inversify"));
const types_1 = require("../types/types");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
const jobController = inversify_1.default.get(types_1.TYPES.IJobController);
const gigController = inversify_1.default.get(types_1.TYPES.IGigController);
const portfolioController = inversify_1.default.get(types_1.TYPES.IPortFolioController);
router.get("/gigs/:id", gigController.getGigs);
router.get("/gigs", gigController.getAllGigs);
router.patch("/gig/:id", gigController.changeStatus);
router.post("/postaGig", multerConfig_1.default.array("images", 3), gigController.postAGig);
router.post("/editGig", multerConfig_1.default.array("images", 3), (0, express_validator_1.checkSchema)((0, editGigValidator_1.default)()), common_1.DataValidation, gigController.editGig);
// jobs
router.get("/jobs", jobController.getJobs);
router.get("/jobs/:id", (0, authenticate_1.authenticate)(['client']), jobController.getJobsByClient);
router.post("/job", (0, authenticate_1.authenticate)(['client']), jobController.postJob);
router.post("/job/status/change/:id/:status", (0, authenticate_1.authenticate)(['admin']), jobController.changeJobStatus);
router.patch("/job", (0, authenticate_1.authenticate)(["client"]), jobController.editJob);
router.patch("/job/:id", (0, authenticate_1.authenticate)(['client']), jobController.removeJob);
router.post("/job/application", (0, authenticate_1.authenticate)(['freelancer']), (0, express_validator_1.checkSchema)((0, applicationValidator_1.default)()), common_1.DataValidation, jobController.applyForJob);
router.post("/job/approve", (0, authenticate_1.authenticate)(['client']), jobController.approveApplication);
router.get("/batch/jobs", jobController.getJobDetails);
router.get('/job/:id', (0, authenticate_1.authenticate)(['client', 'freelancer']), jobController.getJobDetail);
//offer 
router.post("/job/offer", (0, authenticate_1.authenticate)(["client"]), jobController.sendOffer);
//portfolio
router.post("/porfolio", (0, authenticate_1.authenticate)(["freelancer"]), portfolioController.postPortfolio);
router.get('/portfolios/:userId', (0, authenticate_1.authenticate)(["freelancer", "client"]), portfolioController.getPortfolios);
exports.default = router;
