import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Scent } from './entities/scent.entity';
import { CreateScentDto } from './dto/create-scent.dto';
import { UpdateScentDto } from './dto/update-scent.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class ScentService {
  constructor(
    @InjectModel(Scent.name) private readonly scentModel: Model<Scent>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.scentModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const scent = await this.scentModel.findOne({ _id: id }).exec();
    if (!scent) {
      throw new NotFoundException(`Scent #${id} not found`);
    }
    return scent;
  }

  create(createScentDto: CreateScentDto) {
    const scent = new this.scentModel(createScentDto);
    return scent.save();
  }

  async update(id: string, updateScentDto: UpdateScentDto) {
    const existingScent = await this.scentModel
      .findOneAndUpdate({ _id: id }, { $set: updateScentDto }, { new: true })
      .exec();

    if (!existingScent) {
      throw new NotFoundException(`Scent #${id} not found`);
    }
    return existingScent;
  }

  async remove(id: string) {
    const scent = await this.findOne(id);
    return scent.deleteOne();
  }

  async recommendScent(scent: Scent) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      scent.recommendations++;

      const recommendEvent = new this.eventModel({
        name: 'recommend_scent',
        type: 'scent',
        payload: { scentId: scent.id },
      });
      await recommendEvent.save({ session });
      await scent.save({ session });

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}
