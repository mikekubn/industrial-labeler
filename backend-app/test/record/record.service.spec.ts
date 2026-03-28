import type { Mocked } from '@suites/doubles.jest';
import type { Prisma } from 'generated/prisma/client';
import { TestBed } from '@suites/unit';
import { DatabaseService } from '../../src/database/database.service';
import { ItemNotFoundException } from '../../src/item/http-exception/item-exception';
import { MaterialNotFoundException } from '../../src/material/http-exception/material-exception';
import { RecordService } from '../../src/record/record.service';
import { createManyQuantities } from '../../test/quantity/test-data';
import { createOneItem } from '../item/test-data';
import { createOneMaterial } from '../material/test-data';

import { createOneRecord } from './test-data';

describe('Record Service Unit Spec', () => {
  let recordService: RecordService;
  let databaseService: Mocked<DatabaseService>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(RecordService).compile();

    recordService = unit;
    databaseService = unitRef.get(
      DatabaseService,
    ) as unknown as Mocked<DatabaseService>;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create record successfully', async () => {
    const record = createOneRecord();
    const item = createOneItem();
    const material = createOneMaterial();

    databaseService.item.findUnique.mockResolvedValue(item);
    databaseService.material.findUnique.mockResolvedValue(material);
    databaseService.record.create.mockResolvedValue(record);

    const result = await recordService.create(record);

    expect(databaseService.record.create).toHaveBeenCalledWith({
      data: {
        itemId: record.itemId,
        materialId: record.materialId,
      },
    });

    expect(result).toEqual(record);
  });

  it('should throw ItemNotFoundException if item not found', async () => {
    const record = createOneRecord();
    const material = createOneMaterial();

    databaseService.item.findUnique.mockResolvedValue(null);
    databaseService.material.findUnique.mockResolvedValue(material);

    await expect(recordService.create(record)).rejects.toThrow(
      ItemNotFoundException,
    );
  });

  it('should throw MaterialNotFoundException if material not found', async () => {
    const record = createOneRecord();
    const item = createOneItem();

    databaseService.item.findUnique.mockResolvedValue(item);
    databaseService.material.findUnique.mockResolvedValue(null);

    await expect(recordService.create(record)).rejects.toThrow(
      MaterialNotFoundException,
    );
  });

  it('should return connected quantity for record', async () => {
    const item = createOneItem();
    const material = createOneMaterial();
    const record = createOneRecord({
      itemId: item.id,
      materialId: material.id,
    });
    const quantities = createManyQuantities({ length: 2 });

    databaseService.record.findUnique.mockResolvedValue({
      id: record.id,
      itemId: record.itemId,
      materialId: record.materialId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      item: {
        id: item.id,
        name: item.name,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      },
      material: {
        id: material.id,
        name: material.name,
        createdAt: material.createdAt,
        updatedAt: material.updatedAt,
      },
      quantities: quantities,
    } as Prisma.RecordGetPayload<{
      include: {
        item: true;
        material: true;
        quantities: true;
      };
    }>);

    const result = await recordService.findOne(record.id);

    expect(result).toEqual({
      ...record,
      item,
      material,
      quantities: quantities.map((q) => ({
        ...q,
        input: q.input.toNumber(),
        output: q.output.toNumber(),
      })),
    });
  });
});
