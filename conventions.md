# Project conventions for naming and organizing files and directories

## Using server actions and api

### Server actions

Server actions should only be used when fetching data that is unlikely to fail or which you don't need to handle errors for. If you need to handle errors, use the API instead. Server actions should be placed in `actions` folder.

All files and functions should have `Action` suffix.

Example:

```typescript
"use server";

import { fooRepository } from "repositories";

export const getFooByIdAction = async (id: number) => {
  return await fooRepository.getFooById(id);
};
```

> This is okay because only way for this to fail is if the database is down or the id is invalid.

### API

API should be used when calling functions that create, update or delete data. API endpoints should not be called directly and a wrapper should be created in `services` folder to reduce error compared to using fetch.

All files and functions should have `Service` suffix.

Example: `fooService` `getBarService`

```typescript
import { apiFetch } from "utils";

const sendMessageService = async (message: string, receiverId: string) => {
  const body = {
    message,
  };

  return await apiFetch(`/users/${receiverId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export default returnBorrowService;
```

## Database

### Database

Direct interaction with the database should be avoided. Instead, use wrapper functions to ensure consistency and reduce errors. All database functions should be exported from a single module to prevent accidental modifications to the wrong table and to clearly indicate when the database is being accessed. If a function queries multiple tables, it should be placed in the repository file of the most relevant table.

Example usage:

```typescript
"use server";

import { fooRepository } from "repositories";

export const getFooByIdAction = async (id: number) => {
  return await fooRepository.getFooById(id);
};
```
