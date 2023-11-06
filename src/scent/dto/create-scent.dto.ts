import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateScentDto {
  @ApiProperty({ description: 'name of the scent' })
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
