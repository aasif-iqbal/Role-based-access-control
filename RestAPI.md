## User-Registration

POST | localhost:3000/v1/users/register
{
	"name": "Mahesh",
    "email":"Mahesh123@gmail.com",
    "password":"12345"
}

{
    "status": "success",
    "message": "User created successfully",
    "data": {
        "name": "Mahesh",
        "email": "Mahesh123@gmail.com",
        "password": "12345",
        "role": 0,
        "_id": "677c460428d0a69914477578",
        "createdAt": "2025-01-06T21:07:16.776Z",
        "updatedAt": "2025-01-06T21:07:16.776Z",
        "__v": 0
    }
}

----

## Login

POST | localhost:3000/v1/users/login

Request
{
    "email":"Mahesh123@gmail.com", // normal user
    // "email":"aasif@x.com",  // admin
    "password":"12345"
}

Response
{
    "status": "success",
    "message": "User logged in successfully",
    "data": [
        {
            "_id": "677c460428d0a69914477578",
            "name": "Mahesh",
            "email": "Mahesh123@gmail.com",
            "role": 0,
            "permissions": {}
        }
    ]
}
---------

POST | localhost:3000/v1/roles

Authorization 
Auth Type : Bearer Token | <JWT-Token>

Request
{
    "role_name":"Editor", 
    "value":3, 
    "description":"Editor"
}

Response

{
    "status": "success",
    "message": "Role created successfully",
    "data": {
        "role_name": "Editor",
        "value": 3,
        "description": "Editor",
        "_id": "677d50798289170fc5cf4f35",
        "createdAt": "2025-01-07T16:04:09.247Z",
        "updatedAt": "2025-01-07T16:04:09.247Z",
        "__v": 0
    }
}


## Get all roles
GET | localhost:3000/v1/roles

Authorization 
Auth Type : Bearer Token | <JWT-Token>

Response
```json
{
    "status": "success",
    "message": "Roles fetched successfully",
    "data": [
        {
            "_id": "6766f72f1dcee65ffe41c9a1",
            "role_name": "Admin",
            "value": 1,
            "description": "admin can access all permission",
            "createdAt": "2024-12-21T17:13:19.942Z",
            "updatedAt": "2024-12-21T17:13:19.942Z",
            "__v": 0
        },
        {
            "_id": "67790f148993deee36e021ab",
            "role_name": "Normal User",
            "value": 0,
            "description": "Normal user",
            "createdAt": "2025-01-04T10:36:04.783Z",
            "updatedAt": "2025-01-04T10:36:04.783Z",
            "__v": 0
        },
        {
            "_id": "67790f808993deee36e021ae",
            "role_name": "Sub-Admin",
            "value": 2,
            "description": "Sub-Admin is under admin",
            "createdAt": "2025-01-04T10:37:52.829Z",
            "updatedAt": "2025-01-04T10:37:52.829Z",
            "__v": 0
        },
        {
            "_id": "677d50798289170fc5cf4f35",
            "role_name": "Editor",
            "value": 3,
            "description": "Editor",
            "createdAt": "2025-01-07T16:04:09.247Z",
            "updatedAt": "2025-01-07T16:04:09.247Z",
            "__v": 0
        }
    ]
}
```

## create Permissions
POST |  localhost:3000/v1/permissions

Request
```json
{
    "permission_name":"manage_post",
    "permissions": [0,1],
    "description":"User can Create & Read any Post"
}
```

Response
```json
{
    "status": "success",
    "message": "Permission created successfully",
    "data": {
        "permission_name": "manage_post",
        "permissions": [
            0,
            1
        ],
        "description": "User can Create & Read any Post",
        "is_default": 0,
        "_id": "677d630c8289170fc5cf4f39",
        "createdAt": "2025-01-07T17:23:24.787Z",
        "updatedAt": "2025-01-07T17:23:24.787Z",
        "__v": 0
    }
}
```


## Create categories

POST | localhost:3000/v1/categories

```json
{
    "category_name":"sports",
    "description":"All POST belongs to sports-category"
}
```

```json
{
    "status": "success",
    "message": "Category created",
    "data": {
        "category_name": "sports",
        "description": "All POST belongs to sports-category",
        "_id": "677d6ada2a847ef077e0cc6f",
        "createdAt": "2025-01-07T17:56:42.932Z",
        "updatedAt": "2025-01-07T17:56:42.932Z",
        "__v": 0
    }
}
```

## Create Posts

POST | localhost:3000/v1/posts

```json
{
    "title":"TypeScript and OOP",
    "description":"Object-oriented programming (OOP) is not a programming language or framework but a coding paradigm.",
    "category":"677d6aa72a847ef077e0cc6b",
    "author":"67633f9e0bf3627ca09059d8"
}
```
Response
```json
{
    "status": "success",
    "message": "Post created",
    "data": {
        "title": "TypeScript and OOP",
        "description": "Object-oriented programming (OOP) is not a programming language or framework but a coding paradigm.",
        "category": "677d6aa72a847ef077e0cc6b",
        "author": "67633f9e0bf3627ca09059d8",
        "_id": "677d6c472a847ef077e0cc72",
        "createdAt": "2025-01-07T18:02:47.174Z",
        "updatedAt": "2025-01-07T18:02:47.174Z",
        "__v": 0
    }
}
```

## Update User & User Permissions 
- when user permission created first time

PATCH | localhost:3000/v1/users/6763433e75c6d53e4da121b6

Request 
```json
{
    "name":"Riyaz Khan",
    "email":"riyaz@x.com",
    "password":"12345",   
    "permissions":[{
        "id":"677d887c80a3acc326d77b35", // manage_comment(id)
        "permission_value":[0,1, 2, 3]
    }]
}
```

Response

```json
{
    "status": "success",
    "message": "User Permissions Created successfully",
    "data": {
        "user_id": "6763433e75c6d53e4da121b6",
        "permissions": [
            {
                "permission_name": "manage_comments",
                "permission_value": [
                    0,
                    1,
                    2,
                    3
                ],
                "_id": "677d965761adbd096700d2ba"
            }
        ],
        "_id": "677d965761adbd096700d2b9",
        "createdAt": "2025-01-07T21:02:15.014Z",
        "updatedAt": "2025-01-07T21:02:15.014Z",
        "__v": 0
    }
}
```

- When we update existing UserPermission

Request 

```json
{
    "name":"Riyaz Khan",
    "email":"riyaz@x.com",
    "password":"12345",   
    "permissions":[{
        "id":"677d887c80a3acc326d77b35",
        "permission_value":[0,1]  // only read and write
    }]
}
```

Response
```json
{
    "status": "success",
    "message": "User Permissions Updated successfully",
    "data": {
        "_id": "677d9424b108f339d1d9013a",
        "user_id": "6763433e75c6d53e4da121b6",
        "permissions": [
            {
                "permission_name": "manage_comments",
                "permission_value": [
                    0,
                    1,
                    2,
                    3
                ],
                "_id": "677d9424b108f339d1d9013b"
            }
        ],
        "createdAt": "2025-01-07T20:52:52.780Z",
        "updatedAt": "2025-01-07T20:52:52.780Z",
        "__v": 0
    }
}
```


