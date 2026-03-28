import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@thallesp/nestjs-better-auth';

import { ApiStandardResponse } from 'src/decorators/api-response.decorator';
import { CreateMaterialDto } from './dto/create-material.dto';
import { ResponseMaterialDto } from './dto/response-material.dto';
import { MaterialService } from './material.service';

@ApiTags('materials')
@Controller('materials')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ type: ResponseMaterialDto })
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @ApiStandardResponse({
    description: 'Material created successfully',
    type: ResponseMaterialDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Material already exists',
  })
  @ApiBody({ type: CreateMaterialDto })
  public async create(@Body() createMaterialDto: { name: string }) {
    const material = await this.materialService.create(createMaterialDto);

    return material;
  }

  @Get()
  @ApiStandardResponse({
    description: 'Materials found successfully',
    type: ResponseMaterialDto,
    isArray: true,
  })
  public async findAll() {
    const materials = await this.materialService.findAll();

    return materials;
  }

  @Get(':id')
  @ApiStandardResponse({
    description: 'Material found successfully',
    type: ResponseMaterialDto,
  })
  public async findOne(@Param('id') id: string) {
    const material = await this.materialService.findOne(id);

    return material;
  }

  @Delete(':id')
  @Roles(['admin'])
  @ApiStandardResponse({
    description: 'Material deleted successfully',
    type: ResponseMaterialDto,
  })
  public async remove(@Param('id') id: string) {
    const material = await this.materialService.remove(id);

    return material;
  }
}
