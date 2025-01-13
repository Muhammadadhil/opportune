import { Model, Document, ObjectId } from "mongoose";
import { IBaseRepository } from "../interfaces/IBaseRepository";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: T): Promise<T> {
        const newItem = new this.model(data);
        return await newItem.save();
    }

    async find(query: object = {}): Promise<T[]> {
        return await this.model.find(query).sort({ createdAt: -1 }).exec();
    }

    async findById(id: ObjectId): Promise<T | null> {
        return await this.model.findById(id).exec();
    }

    async update(id: ObjectId, data: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: ObjectId): Promise<T | null> {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async findOne(query: object = {}): Promise<T | null> {
        return await this.model.findOne(query).exec();
    }
}

