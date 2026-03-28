import type { Mocked } from '@suites/doubles.jest';
import { TestBed } from '@suites/unit';
import { DatabaseService } from '../../src/database/database.service';
import {
  ItemAlreadyExistsException,
  ItemNotFoundException,
} from '../../src/item/http-exception/item-exception';
import { ItemService } from '../../src/item/item.service';

import { createManyItems, createOneItem } from './test-data';

describe('Item Service Unit Spec', () => {
  let itemService: ItemService;
  let databaseService: Mocked<DatabaseService>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(ItemService).compile();

    itemService = unit;
    databaseService = unitRef.get(
      DatabaseService,
    ) as unknown as Mocked<DatabaseService>;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create item successfully', async () => {
    const item = createOneItem();

    databaseService.item.findUnique.mockResolvedValue(null);
    databaseService.item.create.mockResolvedValue(item);

    const result = await itemService.create(item);

    expect(databaseService.item.findUnique).toHaveBeenCalledWith({
      where: { name: item.name },
    });
    expect(databaseService.item.create).toHaveBeenCalledWith({
      data: { name: item.name },
    });
    expect(result).toEqual(item);
  });

  it('should throw ItemAlreadyExistsException if item already exists', async () => {
    const item = createOneItem();

    databaseService.item.findUnique.mockResolvedValue(item);

    await expect(itemService.create(item)).rejects.toThrow(
      ItemAlreadyExistsException,
    );

    expect(databaseService.item.findUnique).toHaveBeenCalledWith({
      where: { name: item.name },
    });
    expect(databaseService.item.create).not.toHaveBeenCalled();
  });

  it('should find uniq item by id', async () => {
    const item = createOneItem();

    databaseService.item.findUnique.mockResolvedValue(item);

    const result = await itemService.findOne(item.id);

    expect(databaseService.item.findUnique).toHaveBeenCalledWith({
      where: { id: item.id },
    });
    expect(result).toEqual(item);
  });

  it('should throw ItemNotFoundException if item not exists', async () => {
    const item = createOneItem();

    databaseService.item.findUnique.mockResolvedValue(null);

    await expect(itemService.findOne(item.id)).rejects.toThrow(
      ItemNotFoundException,
    );

    expect(databaseService.item.findUnique).toHaveBeenCalledWith({
      where: { id: item.id },
    });
    expect(databaseService.item.create).not.toHaveBeenCalled();
  });

  it('should find all items successfully', async () => {
    const items = createManyItems();

    databaseService.item.findMany.mockResolvedValue(items);

    const result = await itemService.findAll();

    expect(databaseService.item.findMany).toHaveBeenCalled();
    expect(result).toEqual(items);
  });

  it('should remove item from db if exist', async () => {
    const item = createOneItem();

    databaseService.item.findUnique.mockResolvedValue(item);
    databaseService.item.delete.mockResolvedValue(item);

    const result = await itemService.remove(item.id);

    expect(databaseService.item.delete).toHaveBeenCalledWith({
      where: { id: item.id, name: item.name },
    });
    expect(result).toEqual(item);
  });

  it('should throw ItemNotFoundException if item not exists', async () => {
    const item = createOneItem();

    databaseService.item.findUnique.mockResolvedValue(null);

    await expect(itemService.remove(item.id)).rejects.toThrow(
      ItemNotFoundException,
    );

    expect(databaseService.item.findUnique).toHaveBeenCalledWith({
      where: { id: item.id },
    });
    expect(databaseService.item.delete).not.toHaveBeenCalled();
  });
});
