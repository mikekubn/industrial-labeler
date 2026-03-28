import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiStandardResponse } from 'src/decorators/api-response.decorator';
import { DeleteResponseDto } from 'src/types/global-dto/response-delete.dto';
import { CreateQuantityDto } from './dto/create-quantity.dto';
import { ResponseQuantityDto } from './dto/response-quantity.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { QuantityService } from './quantity.service';

@ApiTags('quantities')
@Controller('quantities')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ type: ResponseQuantityDto })
export class QuantityController {
  constructor(private readonly quantityService: QuantityService) {}

  @Post()
  @ApiStandardResponse({
    type: ResponseQuantityDto,
    description: 'Quantity created successfully',
  })
  public async create(@Body() createQuantityDto: CreateQuantityDto) {
    const quantity = await this.quantityService.create(createQuantityDto);

    return quantity;
  }

  @Get(':id')
  @ApiStandardResponse({
    type: ResponseQuantityDto,
    description: 'Quantity found successfully',
  })
  public async findById(@Param('id') id: string) {
    const quantity = await this.quantityService.findById(id);

    return quantity;
  }

  @Put(':id')
  @ApiStandardResponse({
    type: ResponseQuantityDto,
    description: 'Quantity updated successfully',
  })
  public async update(
    @Param('id') id: string,
    @Body() updateQuantityDto: UpdateQuantityDto,
  ) {
    const quantity = await this.quantityService.update(id, updateQuantityDto);

    return quantity;
  }

  @Delete(':id')
  @SerializeOptions({ type: DeleteResponseDto })
  @ApiStandardResponse({
    type: DeleteResponseDto,
    description: 'Quantity deleted successfully',
  })
  public async delete(@Param('id') id: string) {
    const quantity = await this.quantityService.delete(id);

    return quantity;
  }
}
