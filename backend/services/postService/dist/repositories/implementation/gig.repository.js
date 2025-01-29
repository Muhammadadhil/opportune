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
exports.GigRepository = void 0;
const gig_schema_1 = __importDefault(require("../../schema/gig.schema"));
const baseRepository_1 = require("./baseRepository");
const inversify_1 = require("inversify");
let GigRepository = class GigRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(gig_schema_1.default);
    }
    updateGigUsingFreelancerId(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gig_schema_1.default.findOneAndUpdate({ freelancerId: id }, { $set: data }, { new: true });
        });
    }
    //change active status
    updateActiveStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const gig = yield gig_schema_1.default.findById(id);
            if (!gig) {
                return null;
            }
            gig.isActive = !gig.isActive;
            return yield gig.save();
        });
    }
};
exports.GigRepository = GigRepository;
exports.GigRepository = GigRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], GigRepository);
