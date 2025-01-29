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
exports.GigController = void 0;
const mongoose_1 = require("mongoose");
const inversify_1 = require("inversify");
const types_1 = require("../../types/types");
let GigController = class GigController {
    constructor(gigService) {
        this.gigService = gigService;
        this.postAGig = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const files = req.files;
                if (!files) {
                    res.status(400).json({ message: "No file uploaded" });
                    return;
                }
                const savedGigData = yield this.gigService.saveGig(files, req.body);
                res.status(200).json(savedGigData);
            }
            catch (error) {
                next(error);
            }
        });
        this.editGig = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedData = yield this.gigService.editGig(req.body);
                if (!updatedData) {
                    res.status(404).json({ message: "Error editing gig. no Database response" });
                    return;
                }
                res.status(200).json(updatedData);
            }
            catch (error) {
                next(error);
            }
        });
        this.changeStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = new mongoose_1.Types.ObjectId(req.params.id);
                yield this.gigService.changeGigStatus(id);
                res.status(200).json({ message: "status updated successfully!" });
            }
            catch (error) {
                next(error);
            }
        });
        this.getGigs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const gigs = yield this.gigService.getGigs(id);
                res.status(200).json(gigs);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllGigs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const gigs = yield this.gigService.getAllGigs();
                res.status(200).json(gigs);
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.GigController = GigController;
exports.GigController = GigController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IGigService)),
    __metadata("design:paramtypes", [Object])
], GigController);
