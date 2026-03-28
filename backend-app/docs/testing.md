# Testing

This project uses **Jest** as the testing framework and **@suites/unit** for simplified dependency injection and mocking in unit tests.

## Structure

Tests are located in the `test/` directory, organized by feature module:

- `test/item`: Unit tests for `ItemService`.
- `test/material`: Unit tests for `MaterialService`.
- `test/quantity`: Unit tests for `QuantityService`.
- `test/record`: Unit tests for `RecordService`.

Each module directory typically contains:
- `*.service.spec.ts`: The actual unit test file.
- `test-data.ts`: Helper functions to create mock data (factories) for tests.

## Writing Tests

We use `@suites/unit` to create isolated test environments. This allows us to mock dependencies easily.

### Example Pattern

```typescript
import { type Mocked, TestBed } from '@suites/unit';
import { DatabaseService } from '../../src/database/database.service';
import { YourService } from '../../src/your-module/your.service';
import { createOneEntity } from './test-data';

describe('Your Service Unit Spec', () => {
  let service: YourService;
  let databaseService: Mocked<DatabaseService>;

  beforeAll(async () => {
    // Solitary test bed mocks all dependencies automatically
    const { unit, unitRef } = await TestBed.solitary(YourService).compile();

    service = unit;
    databaseService = unitRef.get(DatabaseService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create entity successfully', async () => {
    const entity = createOneEntity();
    databaseService.entity.create.mockResolvedValue(entity);

    const result = await service.create(entity);

    expect(result).toEqual(entity);
  });
});
```

### Test Data Factories

Use `test-data.ts` files to define reusable factories for your data models. This keeps tests clean and consistent.

```typescript
// test/item/test-data.ts
export const createOneItem = ({ name = 'TEST_ITEM' } = {}) => ({
  id: '1',
  name,
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

## Running Tests

You can run tests using the following commands:

| Command | Description |
| :--- | :--- |
| `pnpm test` | Run all unit tests. |
| `pnpm test:watch` | Run tests in watch mode (reruns on file change). |
| `pnpm test:cov` | Run tests and generate code coverage report. |
| `pnpm test:debug` | Run tests in debug mode. |
| `pnpm test:e2e` | Run end-to-end tests (requires `test/jest-e2e.json`). |

## Coverage

We aim for high test coverage on Services. Run `pnpm test:cov` to see the current coverage status.
