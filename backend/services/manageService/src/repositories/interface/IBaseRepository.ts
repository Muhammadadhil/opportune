export interface IBaseRepository<T> {
    create(data: T): Promise<T>;
    find(query?: object): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
