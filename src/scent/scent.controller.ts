import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ScentService } from './scent.service';
import { CreateScentDto } from './dto/create-scent.dto';
import { UpdateScentDto } from './dto/update-scent.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ConfigType } from '@nestjs/config';
import scentConfig from './config/scent.config';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('scent')
export class ScentController {
  constructor(
    private readonly scentService: ScentService,
    @Inject(scentConfig.KEY)
    private readonly scentConfiguration: ConfigType<typeof scentConfig>,
  ) {
    console.log(scentConfiguration);
  }

  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
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
