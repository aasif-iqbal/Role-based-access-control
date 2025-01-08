# Role Based Access Control
RBAC (Role-Based Access Control) is a security model used to manage user permissions by assigning roles to users. Each role has a set of predefined permissions, and users inherit these permissions based on their assigned roles. This approach simplifies permission management and ensures that users can access only the resources they are authorized to use.

In short:
- Roles define permissions.
- Users are assigned to roles.
- Access is granted based on the roles.

--- 

## How to start project
1. git clone 
2. cd backend 
    - npm install
    - npm install typescript ts-node @types/node --save-dev
    - npm run build
    - npm start
    - npm run start:dev (nodemon)

---

## Project Directory Structure
```
└── 📁backend
    └── 📁src
        └── app.ts
        └── 📁config
            └── db.ts
        └── 📁controllers
            └── categories.ts
            └── comments.ts
            └── likes.ts
            └── permissions.ts
            └── posts.ts
            └── roles.ts
            └── routePermissions.ts
            └── userPermissions.ts
            └── users.ts
        └── 📁helpers
            └── routePermissionHelper.ts
            └── userPermissionHelper.ts
        └── index.ts
        └── 📁middlewares
            └── authenticate.ts
            └── checkPermission.ts
            └── onlyAdminAccess.ts
            └── 📁validators
                └── category.ts
                └── comment.ts
                └── like.ts
                └── login.ts
                └── permission.ts
                └── post.ts
                └── role.ts
                └── routePermissions.ts
                └── user.ts
                └── userPermission.ts
        └── 📁models
            └── categories.ts
            └── comments.ts
            └── likes.ts
            └── permissions.ts
            └── posts.ts
            └── roles.ts
            └── router-permissions.ts
            └── user-permissions.ts
            └── users.ts
        └── 📁routes
            └── category.ts
            └── comment.ts
            └── index.ts
            └── like.ts
            └── permission.ts
            └── post.ts
            └── role.ts
            └── routePermissions.ts
            └── user.ts
            └── userPermissions.ts
        └── 📁services
            └── authService.ts
            └── mailService.ts
        └── 📁types
            └── authenticated-request.ts
            └── express.d.ts
        └── 📁utils
            └── getRoutes.ts
            └── interfaces.d.ts
    └── .env
    └── .env-example
    └── .gitignore
    └── nodemon.json
    └── package-lock.json
    └── package.json
    └── tsconfig.json
```