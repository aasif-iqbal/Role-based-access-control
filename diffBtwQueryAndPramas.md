## Difference between  **query parameters** and **route parameters** (`params`) ?

The primary difference between **query parameters** and **route parameters** (`params`) lies in how and where they are specified in the URL and their typical use cases. Here’s a detailed explanation:

---

### **1. Query Parameters**
- **Location in URL**: 
  Query parameters are appended to the end of the URL after a `?` and are separated by `&`.
  
  **Example**:
  ```
  https://example.com/users?age=25&role=admin
  ```

- **Access in Express**:
  Accessed via `req.query` in Express.

  **Example**:
  ```javascript
  app.get('/users', (req, res) => {
    console.log(req.query); // { age: '25', role: 'admin' }
  });
  ```

- **Use Cases**:
  - Filtering data (e.g., `?age=25&role=admin`).
  - Pagination (e.g., `?page=1&limit=10`).
  - Sorting (e.g., `?sort=desc`).
  - Optional parameters.

---

### **2. Route Parameters (Params)**
- **Location in URL**:
  Route parameters are part of the URL path and are defined using `:` in the route.

  **Example**:
  ```
  https://example.com/users/123
  ```

- **Access in Express**:
  Accessed via `req.params` in Express.

  **Example**:
  ```javascript
  app.get('/users/:id', (req, res) => {
    console.log(req.params); // { id: '123' }
  });
  ```

- **Use Cases**:
  - Identifying a specific resource (e.g., `/users/:id` for fetching a specific user).
  - Required parameters.

---

### **Key Differences**

| Aspect                | Query Parameters                            | Route Parameters                       |
|-----------------------|---------------------------------------------|---------------------------------------|
| **Syntax**            | `?key=value` appended to the URL.           | Defined in the URL as `:key`.          |
| **Location**          | After the `?` in the URL.                   | Part of the URL path.                  |
| **Access in Express** | `req.query`                                 | `req.params`                           |
| **Example URL**       | `/users?role=admin&age=25`                  | `/users/:id` → `/users/123`            |
| **Use Case**          | Filtering, sorting, pagination, optional.   | Identifying specific resources, required. |
| **Number of Values**  | Can have multiple optional key-value pairs. | Typically a single or few defined values. |

---

### **Combined Example**

For a request like:
```
https://example.com/users/123?age=25&role=admin
```

**Route**:
```javascript
app.get('/users/:id', (req, res) => {
  const params = req.params; // { id: '123' }
  const query = req.query;   // { age: '25', role: 'admin' }
  console.log(params, query);
});
```

**Output**:
```javascript
{ id: '123' }  // Route parameter
{ age: '25', role: 'admin' }  // Query parameters
```

### **Best Practices**
- Use **route parameters** (`params`) for mandatory data required to identify a resource.
- Use **query parameters** for optional data such as filters, sorts, and limits.


## What is diff between create() and save()?

In Mongoose, both `save()` and `create()` are used to persist data to the database, but they have distinct use cases and differences in behavior:

---

### **`save()`**
1. **Purpose**: Used to save or update an instance of a Mongoose model.
2. **Workflow**:
   - You first create a document (instance of the model) using `new Model()`.
   - Then, you call `.save()` on that instance.
   - Example:
     ```javascript
     const user = new User({ name: 'Alice', age: 25 });
     user.save()
       .then(doc => console.log(doc))
       .catch(err => console.error(err));
     ```

3. **Validation**:
   - Triggers Mongoose schema validations before saving.
   - Custom `pre` and `post` hooks associated with the `save()` method are executed.

4. **Use Case**:
   - When you need to save a document after modifying it.
   - When you want fine-grained control over creating and saving the document separately.

5. **Updating a Document**:
   - If the document already exists (has an `_id`), calling `save()` updates it in the database instead of creating a new one.

---

### **`create()`**
1. **Purpose**: A convenience method to create and save a new document in one step.
2. **Workflow**:
   - You pass an object (or array of objects) to `Model.create()`.
   - Mongoose internally creates the document(s), saves them, and returns the saved document(s).
   - Example:
     ```javascript
     User.create({ name: 'Alice', age: 25 })
       .then(doc => console.log(doc))
       .catch(err => console.error(err));
     ```

3. **Validation**:
   - Triggers Mongoose schema validations before saving.
   - Custom `pre` and `post` hooks for `create()` are executed.

4. **Use Case**:
   - When you only need to create and save a document in a single step.
   - Simplifies the code for creating new documents.

5. **Batch Insert**:
   - You can create multiple documents at once:
     ```javascript
     User.create([{ name: 'Alice' }, { name: 'Bob' }])
       .then(docs => console.log(docs))
       .catch(err => console.error(err));
     ```

---

### Key Differences:
| Feature                | `save()`                                         | `create()`                                     |
|------------------------|------------------------------------------------|-----------------------------------------------|
| **Method Type**         | Called on a document instance.                  | Called directly on the model.                 |
| **Workflow**            | Create the document, then call `save()`.         | Creates and saves in a single step.           |
| **Use Case**            | Modify or update an existing document.          | Quickly create and save a new document.       |
| **Multiple Documents**  | Can only save one document at a time.           | Can create and save multiple documents.       |
| **Hooks**               | Triggers `save` hooks.                          | Triggers `insertMany` hooks when batching.    |

---

### Example Scenario:
1. **When to use `save()`**:
   ```javascript
   const user = new User({ name: 'Alice', age: 25 });
   user.age = 30; // Modify the document.
   user.save()
     .then(updatedUser => console.log(updatedUser))
     .catch(err => console.error(err));
   ```

2. **When to use `create()`**:
   ```javascript
   User.create({ name: 'Alice', age: 25 })
     .then(newUser => console.log(newUser))
     .catch(err => console.error(err));
   ```

Choose the method based on the requirement: If you're directly inserting data, use `create()`. If you're working with an existing document or want more granular control, use `save()`.


## Singleton pattern



The provided code does not fully implement a **singleton pattern**. While it ensures that you only create a single connection when the `db_connection` function is invoked, it does not enforce that subsequent calls reuse the same connection object. A proper singleton ensures that only one instance is created and reused throughout the application.

### What this code does:
1. Attempts to connect to a MongoDB database.
2. Returns the connection instance if successful.
3. Logs errors if the connection fails.

However, every time `db_connection` is called, it creates a new connection to the database unless `mongoose.connect` internally caches the connection (which it does by default in Mongoose). This means that while Mongoose itself handles connection reuse, your function does not explicitly enforce a singleton behavior.

### To make it a proper singleton:
You can store the connection instance in a variable and check if it already exists before creating a new connection.

Here’s a modified version to implement the singleton pattern:

```javascript
import mongoose from "mongoose";

let connection: typeof mongoose | null = null;

const db_connection = async (): Promise<typeof mongoose | void> => {
    if (connection) {
        console.log('Reusing existing database connection');
        return connection;
    }

    try {
        const localConnectionString = `${process.env.MONGO_URI}`;
        connection = await mongoose.connect(localConnectionString);

        console.log('Database connected successfully');
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err; // Rethrow error for better error handling
    }
};

export default db_connection;
```

### Key Points:
1. **Singleton Variable**: `let connection` stores the single instance of the connection.
2. **Reuse**: The function checks if `connection` is already initialized and reuses it if available.
3. **Error Handling**: Throws an error if the connection fails for better visibility in the application.

### Why Use a Singleton for Database Connections?
- **Efficiency**: Reusing the same connection avoids unnecessary overhead of opening multiple connections.
- **Consistency**: Ensures all parts of your application use the same connection instance.
- **Scalability**: Helps to manage limited resources (e.g., maximum concurrent connections). 

This modified implementation is a proper singleton.