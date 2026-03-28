# Business Logic & Workflows

## Record Management

The core unit of tracking in the Labeler application is the **Record**. A Record represents a unique association between a specific **Material** and a specific **Item**, along with tracking associated **Quantities**.

### Core Constraints

The system enforces specific constraints on how Materials and Items relate to Records:

1.  **Shared Materials**: A `Material` entity **can be associated with multiple Records**. This allows the same material type to be used across different items.
2.  **Unique Items**: An `Item` entity can only be associated with **one** Record. Once linked to a Record, it cannot be reused for another.

This implies:
-   `1 Material` ↔ `N Records`
-   `1 Item` ↔ `1 Record`

### Workflow: Creating a Record

To successfully create a record, you must follow this sequence of operations, as the Record entity depends on the existence of both a Material and an Item.

#### Step 1: Create a Material
First, creating the data for the material.

-   **Endpoint**: `POST /materials` (Assuming standard REST conventions, please check Swagger docs for exact path)
-   **Validation**: The material `name` validation typically ensures uniqueness of the name itself within the materials table, but the key business constraint is its availability for a record.

#### Step 2: Create an Item
Next, create the item definition.

-   **Endpoint**: `POST /items`
-   **Validation**: Similar to materials, the item `name` must usually be unique.

#### Step 3: Create the Record
Finally, create the record by linking the previously created Material and Item.

-   **Endpoint**: `POST /records`
-   **Payload**: You must provide the `materialId` (can be new or existing) and a unique `itemId`.
-   **Behavior**:
    -   The system will verify that the `materialId` and `itemId` exist.
    -   The system will enforce that the Item is **not** already assigned to another Record.
    -   Multiple Records can point to the same Material.
    -   If successful, a new Record is created.

### Quantities

Once a **Record** is established, you can track **Quantities** against it. A Record can have multiple Quantity entries, allowing for tracking changes over time or different batches associated with that specific Material-Item pairing.
