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
import { CreateScentDto } from './dto/create-scent.dto/create-scent.dto';

@Controller('scent')
export class ScentController {
  constructor(private readonly scentService: ScentService) {}

  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;

    console.log(
      '\n\n>>>>>>>>>>>>>>>>>>>>>>>> paginationQuery <<<<<<<<<<<<<<<<<<<<<\n\n',
    );
    console.log(paginationQuery);
    console.log('\n\n>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<\n\n');

    return this.scentService.get();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return id;
  }

  @Post()
  create(@Body() createScenteDto: CreateScentDto) {
    return createScenteDto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return { id, ...body };
  }
}
