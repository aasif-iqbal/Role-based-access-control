TODO: 
1.  Add jwt token [Done]
2.  Only admin can access Permission api's - onlyAdminAccess [Done]
3.  getProfile(controller) - get user profile | api- profile 
4.  create, read, update, delete for permissions [Done]
5.  create, read, update, delete for categories 
6.  create, read, update, delete for posts
7.  Store and Get Roles API for Admin - [done]
8.  Send Mail to User
9.  Create PostLikes Controller 
10. Assign Default permission on user registration 
11. create query for get permissions in Login api - [Done]
12. Add permission to get & create user api - [Done]
13. Update permission
14. Get all routes endpoints - [Done]
15. Create & Update RouterPermissions Api - [Done]
16. Get RouterPermissions Api By Endpoint & Method - [Done]
17. Create Helper method(to find user permission) - [Done]
18. Reset RouterPermissions Api - 
19. Create Middleware to check user permission - [Done]

- checkPermisson middleware is for only Sub-admin & Editor

## What i learn
- Is it correct Promise<void> for  api development
const createPermission = async (req: Request, res: Response): Promise<void> => {}

Yes, using `Promise<void>` for an API development function like the one you shared is correct and common practice in TypeScript when defining asynchronous Express route handlers. Here's why and how it works:

### Why `Promise<void>` is Correct
1. **Return Type**: 
   - The `createPermission` function doesn't explicitly return any value to the caller. Instead, it handles the request-response cycle by sending a response using `res`.
   - In such cases, the return type `void` is appropriate since nothing is returned to the caller of this function.

2. **Asynchronous Function**:
   - Since the function is asynchronous (using `async`), it always returns a `Promise`. Combining this with `void` indicates that the function returns a `Promise` that doesn't resolve to a value.

### Full Example
```typescript
import { Request, Response } from 'express';

const createPermission = async (req: Request, res: Response): Promise<void> => {
  try {
    // Your logic here, for example:
    const { permissionName, role } = req.body;

    // Simulating saving to the database
    // await database.savePermission({ permissionName, role });

    res.status(201).json({ message: 'Permission created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
```

### When `Promise<void>` is Not Ideal
If you have a middleware or higher-order function wrapping this route handler (e.g., for error handling), you might prefer not to explicitly use `Promise<void>`. Instead, you can handle the promise resolution and error propagation in the wrapper.

For instance:
```typescript
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: Function) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const createPermission = async (req: Request, res: Response) => {
  // Same logic as above
};
app.post('/permission', asyncHandler(createPermission));
```

Here, TypeScript will infer the types without needing explicit `Promise<void>`.