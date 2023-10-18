import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ScentService } from './scent.service';
import { CreateScentDto } from './dto/create-scent.dto';
import { UpdateScentDto } from './dto/update-scent.dto';

@Controller('scent')
export class ScentController {
  constructor(private readonly scentService: ScentService) {}

  @Get()
  async findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;

    return this.scentService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scentService.findOne(id);
  }

  @Post()
  create(@Body() createScentDto: CreateScentDto) {
    return this.scentService.create(createScentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScentDto: UpdateScentDto) {
    return this.scentService.update(id, updateScentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scentService.remove(id);
  }
}
