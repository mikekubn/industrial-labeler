import type { Mocked } from '@suites/doubles.jest';
import { TestBed } from '@suites/unit';
import { DatabaseService } from '../../src/database/database.service';
import {
  MaterialAlreadyExistsException,
  MaterialHasAnyRecordException,
  MaterialNotFoundException,
} from '../../src/material/http-exception/material-exception';
import { MaterialService } from '../../src/material/material.service';
import { RecordService } from '../../src/record/record.service';
import { createOneRecord } from '../record/test-data';

import { createOneMaterial } from './test-data';

describe('Material Service Unit Spec', () => {
  let materialService: MaterialService;
  let databaseService: Mocked<DatabaseService>;
  let recordService: Mocked<RecordService>;

  beforeAll(async () => {
    const { unit, unitRef } = await TestBed.solitary(MaterialService).compile();

    materialService = unit;
    databaseService = unitRef.get(
      DatabaseService,
    ) as unknown as Mocked<DatabaseService>;
    recordService = unitRef.get(
      RecordService,
    ) as unknown as Mocked<RecordService>;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create material successfully', async () => {
    const material = createOneMaterial();

    databaseService.material.findUnique.mockResolvedValue(null);
    databaseService.material.create.mockResolvedValue(material);

    const result = await materialService.create(material);

    expect(databaseService.material.findUnique).toHaveBeenCalledWith({
      where: { name: material.name },
    });
    expect(databaseService.material.create).toHaveBeenCalledWith({
      data: {
        name: material.name,
      },
    });

    expect(result).toEqual(material);
  });

  it('should throw MaterialAlreadyExistsException if material already exists', () => {
    const material = createOneMaterial();

    databaseService.material.findUnique.mockResolvedValue(material);

    expect(materialService.create(material)).rejects.toThrow(
      MaterialAlreadyExistsException,
    );

    expect(databaseService.material.create).not.toHaveBeenCalled();
    expect(databaseService.material.findUnique).toHaveBeenCalledWith({
      where: { name: material.name },
    });
  });

  it('should remove material successfully', async () => {
    const material = createOneMaterial();

    databaseService.material.findUnique.mockResolvedValue(material);
    databaseService.material.delete.mockResolvedValue(material);

    const result = await materialService.remove(material.id);

    expect(databaseService.material.delete).toHaveBeenCalledWith({
      where: { id: material.id, name: material.name },
    });
    expect(result).toEqual(material);
  });

  it('should throw MaterialNotFoundException if material not exists', async () => {
    const material = createOneMaterial();

    databaseService.material.findUnique.mockResolvedValue(null);

    await expect(materialService.remove(material.id)).rejects.toThrow(
      MaterialNotFoundException,
    );

    expect(databaseService.material.findUnique).toHaveBeenCalledWith({
      where: { id: material.id },
    });
    expect(databaseService.material.delete).not.toHaveBeenCalled();
  });

  it('should throw MaterialHasAnyRecordException if material has any records', async () => {
    const material = createOneMaterial();
    const record = createOneRecord({ materialId: material.id });

    databaseService.material.findUnique.mockResolvedValue(material);
    databaseService.material.delete.mockResolvedValue(material);
    recordService.findRecordByMaterialId.mockResolvedValue(record);

    await expect(materialService.remove(material.id)).rejects.toThrow(
      MaterialHasAnyRecordException,
    );

    expect(recordService.findRecordByMaterialId).toHaveBeenCalledWith(
      material.id,
    );
    expect(databaseService.material.delete).not.toHaveBeenCalled();
  });
});
