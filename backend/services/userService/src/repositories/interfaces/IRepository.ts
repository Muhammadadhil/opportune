export interface IBaseRepository<T> {
    create(data: T): Promise<T>;
    find(query?: object): Promise<T[]>;
    findOne(query: object): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
