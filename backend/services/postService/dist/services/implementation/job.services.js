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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Producer_1 = require("../../events/rabbitmq/producer/Producer");
const inversify_1 = require("inversify");
const types_1 = require("../../types/types");
const jobStatus_1 = require("../../enums/jobStatus");
let JobService = class JobService {
    constructor(_jobRepository, producer) {
        this._jobRepository = _jobRepository;
        this.producer = producer;
        this.contractServiceUrl = process.env.CONTRACT_SERVICE_URL;
    }
    getJobs(page, limit, status, category, applications, budgetRange, search, sort, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = {};
            let sortOption;
            if (status) {
                filters.status = status;
            }
            else {
                filters.isActive = true;
            }
            if (category)
                filters.category = category;
            if (applications)
                filters.applications = { $lte: Number(applications) };
            if (budgetRange) {
                const [min, max] = budgetRange.split("-").map(Number);
                filters.budget = max ? { $gte: min, $lte: max } : { $gte: min };
            }
            if (search)
                filters.jobTitle = new RegExp(search, "i");
            if (!sort) {
                sortOption = { createdAt: -1 };
            }
            else {
                sortOption = sort == "newest" ? { createdAt: -1 } : { createdAt: 1 };
            }
            console.log("filters::", filters);
            const totalJobs = yield this._jobRepository.getJobsCount(filters);
            let Alljobs = yield this._jobRepository.getFilteredJobs(page, limit, filters, sortOption);
            const totalPagesCount = Math.ceil(totalJobs / limit);
            return {
                Alljobs,
                totalPagesCount,
            };
        });
    }
    getJobsByClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("clientId:", id);
            const jobs = yield this._jobRepository.findActiveJobs(id);
            return jobs;
        });
    }
    saveJob(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJob = yield this._jobRepository.create(data);
            console.log("newGig:", newJob);
            return newJob;
        });
    }
    editJob(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data._id) {
                return null;
            }
            return yield this._jobRepository.update(data._id, data);
        });
    }
    removeJob(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("jobId to delete:", id);
            return yield this._jobRepository.updateActiveStatus(id);
        });
    }
    applyJob(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.connect();
            // const response = await axios.get(`${this.contractServiceUrl}/application`, {
            //     params: { jobId: data.jobId, freelancerId: data.freelancerId },
            // });
            // if (response.data.exists) {
            //     throw new CustomError("You have already applied for this job", 400);
            // }
            console.log("In service layer: going to publish the message with data:", data);
            const trackingId = new mongoose_1.default.Types.ObjectId().toString();
            const messagePayload = Object.assign(Object.assign({}, data), { trackingId });
            yield this.producer.publish("job.application.created", messagePayload);
            // update applicants count
            const updated = yield this._jobRepository.updateApplicantsCount(data.jobId, data.freelancerId);
            console.log("updated:", updated);
            return {
                trackingId,
                data: messagePayload,
            };
        });
    }
    approveApplication(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.connect();
            console.log("going to publish message with data:", data);
            const exchangeName = "job_approval_exchange";
            yield this.producer.publishToMultiple(exchangeName, data);
        });
    }
    getJobDetails(jobIds) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("jobIds to fetch jobs details:", jobIds);
            return yield this._jobRepository.find({ _id: { $in: jobIds } });
        });
    }
    /**
     * @description Fetches the job with the given jobId.
     * @param jobId The id of the job to be fetched.
     * @returns The job with the given jobId if exists, else null.
     */
    getJobDetail(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._jobRepository.findById(jobId);
        });
    }
    /**
     * @description Publishes an offer to the given freelancer.
     * @param data The data of the offer to be published.
     * @returns A promise that resolves when the message has been published.
     */
    sendOfferToFreelancer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.connect();
            console.log("going to publish message with data:", data);
            const exchangeName = "offer_created_exchange";
            yield this.producer.publishToMultiple(exchangeName, data);
        });
    }
    changeJobStatus(jobId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const isActive = status !== jobStatus_1.jobStatus.CLOSED; // if status is closed, set isActive to false
            return yield this._jobRepository.update(jobId, { isActive, status });
        });
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IJobRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.RabbitMQProducer)),
    __metadata("design:paramtypes", [Object, Producer_1.RabbitMQProducer])
], JobService);
