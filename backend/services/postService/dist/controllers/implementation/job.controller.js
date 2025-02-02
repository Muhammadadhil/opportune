"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const common_1 = require("@_opportune/common");
const mongoose_1 = require("mongoose");
const inversify_1 = require("inversify");
const types_1 = require("../../types/types");
let JobController = class JobController {
    constructor(jobService) {
        /**
         * Gets the jobs based on the filters provided in the query parameters.
         *
         * @param {Request} req - The request object, containing the query parameters.
         * @param {Response} res - The response object, used to send back the HTTP response.
         * @param {NextFunction} next - The next middleware function in the Express stack.
         * @returns {Promise<void>} 200 - Returns the jobs.
         * @throws {Error} 500 - Internal server error if getting the jobs fails.
         */
        this.getJobs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.query:", req.query);
                const { page = 1, limit = 10 } = req.query;
                let jobs;
                let totalPages;
                if (req.query.filters) {
                    console.log("req.query.filters:", req.query.filters);
                    const { status, category, applications, budgetRange, search, sort } = req.query.filters;
                    const { Alljobs, totalPagesCount } = yield this._jobService.getJobs(page, limit, status, category, applications, budgetRange, search, sort);
                    jobs = Alljobs;
                    totalPages = totalPagesCount;
                }
                else {
                    const { Alljobs, totalPagesCount } = yield this._jobService.getJobs(page, limit);
                    jobs = Alljobs;
                    totalPages = totalPagesCount;
                }
                res.status(200).json({ jobs, totalPages });
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * Gets the active jobs for the given client ID.
         *
         * @param {Request} req - The request object, containing the client ID in the params.
         * @param {Response} res - The response object, used to send back the HTTP response.
         * @param {NextFunction} next - The next middleware function in the Express stack.
         * @returns {Promise<void>} 200 - Returns the active jobs for the client.
         * @throws {Error} 500 - Internal server error if getting the active jobs fails.
         */
        this.getJobsByClient = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const jobs = yield this._jobService.getJobsByClient(id);
                res.status(200).json(jobs);
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * Saves a new job.
         *
         * @param {Request} req - The request object, containing the new job data in the body.
         * @param {Response} res - The response object, used to send back the HTTP response.
         * @param {NextFunction} next - The next middleware function in the Express stack.
         * @returns {Promise<void>} 200 - Returns the saved job.
         * @throws {Error} 500 - Internal server error if saving the job fails.
         */
        this.postJob = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const savedData = yield this._jobService.saveJob(req.body);
                res.status(200).json(savedData);
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * Edits an existing job.
         *
         * @param {Request} req - The request object, containing the edited job data in the body.
         * @param {Response} res - The response object, used to send back the HTTP response.
         * @param {NextFunction} next - The next middleware function in the Express stack.
         * @returns {Promise<void>} 200 - Returns the edited job.
         * @throws {Error} 500 - Internal server error if editing the job fails.
         */
        this.editJob = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const editedJob = yield this._jobService.editJob(req.body);
                if (!editedJob) {
                    throw new common_1.CustomError("Error in Updating Job", 400);
                }
                res.status(200).json(editedJob);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        /**
         * Removes an existing job.
         *
         * @param {Request} req - The request object, containing the job ID in the params.
         * @param {Response} res - The response object, used to send back the HTTP response.
         * @param {NextFunction} next - The next middleware function in the Express stack.
         * @returns {Promise<void>} 200 - Returns the removed job.
         * @throws {Error} 500 - Internal server error if removing the job fails.
         */
        this.removeJob = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jobId = req.params.id;
                console.log("going to remove ", jobId);
                const removedJob = yield this._jobService.removeJob(jobId);
                if (!removedJob) {
                    throw new common_1.CustomError("Error in removing Job", 400);
                }
                res.status(200).json(removedJob);
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * Applies for a job.
         *
         * @param {Request} req - The request object, containing the application data in the body.
         * @param {Response} res - The response object, used to send back the HTTP response.
         * @param {NextFunction} next - The next middleware function in the Express stack.
         * @returns {Promise<void>} 201 - Returns a success message if the application is submitted.
         * @throws {Error} 500 - Internal server error if submitting the application fails.
         */
        this.applyForJob = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const applicationData = req.body;
                const result = yield this._jobService.applyJob(applicationData);
                res.status(201).json({
                    success: true,
                    message: "Job application submitted successfully",
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * Approves an application by the client.
         *
         * @param {Request} req - The request object, containing the application approval data in the body.
         * @param {Response} res - The response object, used to send back the HTTP response.
         * @param {NextFunction} next - The next middleware function in the Express stack.
         * @returns {Promise<void>} 201 - Returns a success message if the application is approved.
         * @throws {Error} 500 - Internal server error if approval fails.
         */
        this.approveApplication = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const approvalData = req.body;
                yield this._jobService.approveApplication(approvalData);
                res.status(201).json({ message: "Application approved successfully" });
            }
            catch (error) {
                console.error("Error in approve application :", error);
                next(error);
            }
        });
        /**
         * Get the details of multiple jobs by their IDs.
         *
         * @route GET /batch/jobs
         * @queryParam {string[]} jobIds - Array of job IDs to fetch details for.
         * @returns {Promise<Response>} 200 - Returns the job details.
         * @throws {Error} 500 - Internal server error.
         */
        this.getJobDetails = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("controller: getting job details");
                const { jobIds } = req.query;
                const jobs = yield this._jobService.getJobDetails(jobIds);
                console.log("fetched jobs:", jobs);
                res.status(200).json(jobs);
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * Retrieves the details of a specific job by its ID.
         *
         * @route GET /job
         * @queryParam {string} jobId - The ID of the job to retrieve details for.
         * @param {Request} req - The request object, containing the job ID in the query parameters.
         * @param {Response} res - The response object, used to send back the HTTP response.
         * @param {NextFunction} next - The next middleware function in the Express stack.
         * @returns {Promise<void>} 200 - Returns the job details.
         * @throws {Error} 500 - Internal server error if retrieval fails.
         */
        this.getJobDetail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new mongoose_1.Types.ObjectId(req.params.id);
                const job = yield this._jobService.getJobDetail(id);
                console.log("job:", job);
                res.status(200).json(job);
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * Send an offer to a freelancer.
         *
         * @route POST /job/offer
         * @param {Request} req - The request object, containing the offer data in the body.
         * @param {Response} res - The response object, used to send back the HTTP response.
         * @param {NextFunction} next - The next middleware function in the Express stack.
         * @returns {Promise<void>} 200 - Returns a success message if the offer is sent.
         * @throws {Error} 500 - Internal server error if sending the offer fails.
         */
        this.sendOffer = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._jobService.sendOfferToFreelancer(req.body);
                res.status(200).json({ message: "Offer sent successfully" });
            }
            catch (error) {
                next(error);
            }
        });
        this.changeJobStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, status } = req.params;
                yield this._jobService.changeJobStatus(id, status);
                res.status(200).json({ message: `Job status changed to ${status}` });
            }
            catch (error) {
                next(error);
            }
        });
        this._jobService = jobService;
    }
};
exports.JobController = JobController;
exports.JobController = JobController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IJobService)),
    __metadata("design:paramtypes", [Object])
], JobController);
