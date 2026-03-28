import type { Mocked } from '@suites/doubles.jest';
import { TestBed } from '@suites/unit';
import { DatabaseService } from '../../src/database/database.service';
import { QuantityService } from '../../src/quantity/quantity.service';

import { createOneQuantity } from './test-data';

describe('Quantity Service Unit Spec', () => {
  let quantityService: QuantityService;
  let databaseService: Mocked<DatabaseService>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(QuantityService).compile();

    quantityService = unit;
    databaseService = unitRef.get(
      DatabaseService,
    ) as unknown as Mocked<DatabaseService>;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new quantity', async () => {
    const quantity = createOneQuantity();

    databaseService.quantity.create.mockResolvedValue(quantity);

    const result = await quantityService.create({
      recordId: quantity.recordId,
      input: quantity.input.toNumber(),
    });

    expect(result).toEqual({
      ...quantity,
      input: quantity.input.toNumber(),
      output: quantity.output.toNumber(),
    });
  });

  it('should update an existing quantity with output and isMarked false', async () => {
    const quantity = createOneQuantity();

    databaseService.quantity.update.mockResolvedValue(quantity);

    const result = await quantityService.update(quantity.id, {
      input: quantity.input.toNumber(),
      output: quantity.output.toNumber(),
      isMarked: quantity.isMarked,
    });

    expect(result).toEqual({
      ...quantity,
      input: quantity.input.toNumber(),
      output: quantity.output.toNumber(),
    });
  });

  it('should update an existing quantity with output and isMarked true', async () => {
    const quantity = createOneQuantity({ isMarked: true });

    databaseService.quantity.update.mockResolvedValue(quantity);

    const result = await quantityService.update(quantity.id, {
      input: quantity.input.toNumber(),
      output: quantity.output.toNumber(),
      isMarked: quantity.isMarked,
    });

    expect(result).toEqual({
      ...quantity,
      input: quantity.input.toNumber(),
      output: quantity.output.toNumber(),
    });
  });
});
