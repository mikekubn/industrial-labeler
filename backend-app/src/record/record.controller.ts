import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '@thallesp/nestjs-better-auth';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response';

import { ApiStandardResponse } from 'src/decorators/api-response.decorator';
import { CreateRecordDto } from './dto/create-record.dto';
import { QueryRecordDto } from './dto/query-record.dto';
import { ResponsePaginatedRecordsDto } from './dto/response-paginated-records.dto';
import { ResponseRecordDto } from './dto/response-record.dto';
import { RecordService } from './record.service';

@ApiTags('records')
@Controller('records')
@UseInterceptors(ClassSerializerInterceptor)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @ApiStandardResponse({
    type: ResponseRecordDto,
    description: 'Record created successfully',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Record already exists',
  })
  @ApiBody({ type: CreateRecordDto })
  @SerializeOptions({ type: ResponseRecordDto })
  public async create(@Body() createRecordDto: CreateRecordDto) {
    const record = await this.recordService.create(createRecordDto);

    return record;
  }

  @Get()
  @ApiPaginatedResponse(ResponseRecordDto)
  @SerializeOptions({ type: ResponsePaginatedRecordsDto })
  public async findAll(@Query() queryRecordDto: QueryRecordDto) {
    const records = await this.recordService.findAll(queryRecordDto);

    return records;
  }

  @Get(':id')
  @ApiStandardResponse({
    type: ResponseRecordDto,
    description: 'Record found successfully',
  })
  @SerializeOptions({ type: ResponseRecordDto })
  public async findOne(@Param('id') id: string) {
    const record = await this.recordService.findOne(id);

    return record;
  }

  @Get('item/:itemId')
  @ApiStandardResponse({
    type: ResponseRecordDto,
    description: 'Record found successfully',
  })
  @SerializeOptions({ type: ResponseRecordDto })
  public async findRecordByItemId(@Param('itemId') itemId: string) {
    const record = await this.recordService.findRecordByItemId(itemId, {
      item: true,
      material: true,
    });

    return record;
  }

  @Delete(':id')
  @Roles(['admin'])
  @ApiStandardResponse({
    type: ResponseRecordDto,
    description: 'Record deleted successfully',
  })
  @SerializeOptions({ type: ResponseRecordDto })
  public async delete(@Param('id') id: string) {
    const record = await this.recordService.delete(id);

    return record;
  }
}
