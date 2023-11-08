import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scent } from './entities/scent.entity';
import { CreateScentDto } from './dto/create-scent.dto';
import { UpdateScentDto } from './dto/update-scent.dto';

@Injectable()
export class ScentService {
  constructor(
    @InjectModel(Scent.name) private readonly scentModel: Model<Scent>,
  ) {}

  findAll() {
    return this.scentModel.find().exec();
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
}
