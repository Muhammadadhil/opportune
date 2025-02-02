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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = new this.model(data);
                return yield newItem.save();
            }
            catch (error) {
                console.error("Error in create method:", error);
                throw error;
            }
        });
    }
    find() {
        return __awaiter(this, arguments, void 0, function* (query = {}) {
            try {
                return yield this.model.find(query).sort({ createdAt: -1 }).exec();
            }
            catch (error) {
                console.error("Error in find method:", error);
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findById(id).exec();
            }
            catch (error) {
                console.error("Error in findById method:", error);
                throw error;
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findByIdAndUpdate(id, data, { new: true }).exec();
            }
            catch (error) {
                console.error("Error in update method:", error);
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findByIdAndDelete(id).exec();
            }
            catch (error) {
                console.error("Error in delete method:", error);
                throw error;
            }
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne(query).exec();
            }
            catch (error) {
                console.error("Error in findOne method:", error);
                throw error;
            }
        });
    }
}
exports.BaseRepository = BaseRepository;
