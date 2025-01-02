### How to use Mongodb Shell
```
Open terminal - type mongo
> show dbs
```


What is Permission?
Permission(right) is a role that can access certain resources in the application.

In `permission model`, we have permission called "comment", "like", "post"
```json
{
    _id: "6772bbc54573ba0468410ad5",
    permission_name: "comment",
    is_default: 1 // 0->user not able to access this permission, 1->user can access this permission
}
```

example: User can access all the comments, likes and posts.
ie: In `user model`, we have permission called "comment", "like", "post"
```json
{
    name: "adil",
    email: "adil@x.com",
    password: "12345",
    role: 0,
    permission_name: "comment", 
    value: [0, 1, 2, 3] // 0->Create, 1->Read, 2->Update, 3->Delete 
}
```

What is Role?
Role is a group of permissions.
ie: In `role model`, we have role called "admin", "user"
```json
{
    _id: "6772bbc54573ba0468410ad5",
    role_name: "admin",
    value: 0,
    description: "admin can access all permission"
}   
```
example: Admin can access all the permissions.
ie: In `user model`, we have role called "admin", "user"
```json
{
    name: "adil",
    email: "adil@x.com",
    password: "12345",
    role: 0,
    permission_name: "comment", 
    value: [0, 1, 2, 3] // 0->Create, 1->Read, 2->Update, 3->Delete 
}
```



Role-Based Access Control (RBAC) uses roles to grant permissions to users. Permissions in RBAC typically involve access to resources and actions within a system. Below is a comprehensive list of permissions commonly used in RBAC systems, which you can customize based on your application's requirements:

---

### **Resource Access Permissions**
1. **Read (View):** Allows viewing resources (e.g., read-only access to files, records, or settings).
2. **Write (Edit):** Allows modifying or editing existing resources.
3. **Create (Add):** Allows creating new resources.
4. **Delete (Remove):** Allows deleting existing resources.
5. **Execute:** Grants permission to execute or run processes, scripts, or commands.
6. **Download:** Allows downloading files or data.
7. **Upload:** Allows uploading files or data.

---

### **User Management Permissions**
1. **Manage Users:**
   - Add users.
   - Edit user details.
   - Deactivate/Activate users.
   - Delete users.
2. **Assign Roles:** Assign roles to users.
3. **Modify Roles:** Create, edit, or delete roles.
4. **Manage Groups:** Add, edit, or remove user groups.

---

### **Resource-Specific Permissions**
1. **Access Restricted Sections:** Grant access to restricted areas (e.g., admin dashboard).
2. **Configure Resources:** Adjust resource settings or configurations.
3. **Approve/Reject Actions:** Approve or reject user requests (e.g., approvals for workflows or submissions).

---

### **Administrative Permissions**
1. **System Settings Management:**
   - Access and modify system-wide settings.
   - Manage notifications and alerts.
2. **Audit Logs Access:** View and manage logs for tracking user activities.
3. **Manage API Keys:** Generate or revoke API keys for external integrations.
4. **Manage Permissions:** Define or edit resource-specific permissions.

---

### **Application-Specific Permissions**
1. **Report Management:** Access, generate, or delete reports.
2. **Data Export/Import:** Allow exporting or importing data.
3. **Workflow Management:**
   - Initiate workflows.
   - Modify existing workflows.
   - Terminate workflows.
4. **Integration Management:** Configure third-party integrations (e.g., APIs, plugins).

---

### **Time-Based or Context-Sensitive Permissions**
1. **Temporary Access:** Grant permissions for a limited period.
2. **Geographical Restrictions:** Limit actions based on user location.
3. **Access Time Restrictions:** Restrict permissions to specific times or dates.

---

### **System-Level Permissions**
1. **Super Admin:** Full access to all resources and settings.
2. **Read-Only Admin:** View-only access to resources and configurations.
3. **Custom Roles:** Define unique combinations of permissions.

---

### **Example in Practice**
A healthcare application like **BookMYDoc** could have RBAC permissions such as:
1. **Patient Role:** View and book appointments, upload medical documents.
2. **Doctor Role:** Manage their schedule, view patient details, provide consultation.
3. **Admin Role:** Manage users, approve doctor registrations, view system logs.

---

 