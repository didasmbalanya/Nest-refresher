import { PartialType } from '@nestjs/mapped-types';
import { CreateScentDto } from '../create-scent.dto/create-scent.dto';

export class UpdateScentDto extends PartialType(CreateScentDto) {}
