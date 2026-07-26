import AppError from "../utils/AppError.js";

export default class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getById(id) {
    const document = await this.repository.findById(id);

    if (!document) {
      throw new AppError("Resource not found", 404);
    }

    return document;
  }

  async getAll(filter = {}) {
    return this.repository.findMany(filter);
  }

  async create(data) {
    return this.repository.create(data);
  }

  async update(id, data) {
    const updated = await this.repository.updateById(id, data);

    if (!updated) {
      throw new AppError("Resource not found", 404);
    }

    return updated;
  }

  async delete(id) {
    const deleted = await this.repository.deleteById(id);

    if (!deleted) {
      throw new AppError("Resource not found", 404);
    }

    return deleted;
  }
}
