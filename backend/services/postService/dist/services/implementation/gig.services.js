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
exports.GigService = void 0;
const uploadToS3_1 = require("../../utils/uploadToS3");
const inversify_1 = require("inversify");
const types_1 = require("../../types/types");
let GigService = class GigService {
    constructor(_gigRepository) {
        this._gigRepository = _gigRepository;
    }
    saveGig(files, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                console.log("uploading image to s3 !!");
                return yield (0, uploadToS3_1.uploadTosS3)(file.buffer, file.mimetype);
            })));
            const newGig = yield this._gigRepository.create(Object.assign(Object.assign({}, data), { images }));
            return newGig;
        });
    }
    editGig(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._gigRepository.update(data._id, data);
        });
    }
    changeGigStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._gigRepository.updateActiveStatus(id);
        });
    }
    getGigs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const gigDatas = yield this._gigRepository.find({ freelancerId: id, isActive: true });
            for (const gig of gigDatas) {
                const imageUrls = yield Promise.all(gig.images.map((image) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, uploadToS3_1.getSignedImageURL)(image);
                })));
                gig.imageUrls = imageUrls;
            }
            return gigDatas;
        });
    }
    getAllGigs() {
        return __awaiter(this, void 0, void 0, function* () {
            const gigDatas = yield this._gigRepository.find();
            for (const gig of gigDatas) {
                const imageUrls = yield Promise.all(gig.images.map((image) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, uploadToS3_1.getSignedImageURL)(image);
                })));
                gig.imageUrls = imageUrls;
            }
            return gigDatas;
        });
    }
};
exports.GigService = GigService;
exports.GigService = GigService = __decorate([
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IGigRepository)),
    __metadata("design:paramtypes", [Object])
], GigService);
