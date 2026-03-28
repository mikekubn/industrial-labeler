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
import { ApiStandardResponse } from '../decorators/api-response.decorator';

import { CreateItemDto } from './dto/create-item.dto';
import { ResponseItemDto } from './dto/response-item.dto';
import { ItemService } from './item.service';

@ApiTags('items')
@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ type: ResponseItemDto })
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiStandardResponse({
    description: 'Item created successfully',
    type: ResponseItemDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Item already exists',
  })
  @ApiBody({ type: CreateItemDto })
  public async create(@Body() createItemDto: CreateItemDto) {
    const item = await this.itemService.create(createItemDto);

    return item;
  }

  @Get()
  @ApiStandardResponse({
    description: 'Items found successfully',
    type: ResponseItemDto,
    isArray: true,
  })
  public async findAll() {
    const items = await this.itemService.findAll();

    return items;
  }

  @Get(':id')
  @ApiStandardResponse({
    description: 'Item found successfully',
    type: ResponseItemDto,
  })
  public async findOne(@Param('id') id: string) {
    const item = await this.itemService.findOne(id);

    return item;
  }

  @Delete(':id')
  @Roles(['admin'])
  @ApiStandardResponse({
    description: 'Item deleted successfully',
    type: ResponseItemDto,
  })
  public async remove(@Param('id') id: string) {
    const item = await this.itemService.remove(id);

    return item;
  }
}
