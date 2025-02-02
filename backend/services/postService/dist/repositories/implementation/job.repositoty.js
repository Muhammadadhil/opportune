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
exports.JobRepository = void 0;
const job_schema_1 = __importDefault(require("../../schema/job.schema"));
const baseRepository_1 = require("./baseRepository");
const inversify_1 = require("inversify");
let JobRepository = class JobRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(job_schema_1.default);
    }
    findActiveJobs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield job_schema_1.default.find({ clientId: id, isActive: true }).sort({ createdAt: -1 }).exec();
        });
    }
    //change active status
    updateActiveStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield job_schema_1.default.findById(id);
            if (!job) {
                return null;
            }
            job.isActive = false;
            return yield job.save();
        });
    }
    updateApplicantsCount(jobId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield job_schema_1.default.findByIdAndUpdate({ _id: jobId }, { $addToSet: { applicants: userId }, $inc: { applicantsCount: 1 } }).exec();
        });
    }
    getFilteredJobs(page, limit, filters, sortOption) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            return yield job_schema_1.default.find(filters).sort(sortOption).skip(skip).limit(limit).populate("clientId", "firstname lastname email averageRating reviewCount").exec();
        });
    }
    getJobsCount(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield job_schema_1.default.countDocuments(filters).exec();
        });
    }
};
exports.JobRepository = JobRepository;
exports.JobRepository = JobRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], JobRepository);
