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