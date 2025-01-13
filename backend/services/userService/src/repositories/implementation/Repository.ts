import { Model, Document } from "mongoose";
import { IBaseRepository } from "../interfaces/IRepository";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: T): Promise<T> {
        try {
            console.log("this.model:", this.model);

            const newItem = new this.model(data);
            return await newItem.save();
        } catch (error) {
            console.error("Error in create method:", error);
            throw error;
        }
    }

    async find(query: object = {}): Promise<T[]> {
        try {
            return await this.model.find(query).sort({ createdAt: 1 }).exec();
        } catch (error) {
            console.error("Error in find method:", error);
            throw error;
        }
    }

    async findOne(query: object = {}): Promise<T | null> {
        try {
            return await this.model.findOne(query).exec();
        } catch (error) {
            console.error("Error in findOne method:", error);
            throw error;
        }
    }

    async findById(id: string): Promise<T | null> {
        try {
            return await this.model.findById(id).exec();
        } catch (error) {
            console.error("Error in findById method:", error);
            throw error;
        }
    }

    async updateById(id: string, data: Partial<T>): Promise<T | null> {
        try {
            return await this.model.findByIdAndUpdate(id, {$set:data}, { new: true }).exec();
        } catch (error) {
            console.error("Error in update method:", error);
            throw error;
        }
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        try {
            return await this.model.findOneAndUpdate({userId:id}, data, { new: true }).exec();
        } catch (error) {
            console.error("Error in update method:", error);
            throw error;
        }
    }

    async delete(id: string): Promise<T | null> {
        try {
            return await this.model.findByIdAndDelete(id).exec();
        } catch (error) {
            console.error("Error in delete method:", error);
            throw error;
        }
    }

}
