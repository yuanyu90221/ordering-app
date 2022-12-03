import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }
  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel.find(entityFilterQuery);
  }
  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }
  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updatedEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updatedEntityData,
      {
        new: true,
      },
    );
  }
  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }
}
