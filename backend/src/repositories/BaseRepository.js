export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findOne(filter = {}) {
    return this.model.findOne(filter);
  }

  async findMany(filter = {}, options = {}) {
    return this.model.find(filter, null, options);
  }

  async updateById(id, data) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async updateOne(filter, data) {
    return this.model.findOneAndUpdate(filter, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  async exists(filter = {}) {
    return this.model.exists(filter);
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }
}
