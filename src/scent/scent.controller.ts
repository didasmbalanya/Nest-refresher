import {
  Body,
  Controller,
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
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;

    return this.scentService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.scentService.findOne(id);
  }

  @Post()
  create(@Body() createScenteDto: CreateScentDto) {
    return this.scentService.create(createScenteDto);
  }

  @Patch(':id')
  update(@Body() updateScentDto: UpdateScentDto) {
    return this.scentService.update(updateScentDto);
  }
}
