# Administrator Logic

This document describes the role, capabilities, and setup for administrators in the application.

## Initial Setup
- The **first user** is set up via the registration page.
- This registration is secured using the secret key: `ROOT_APP_SECRET`. 
- Providing this secret key during registration grants access to the admin page even if the user has not yet been explicitly assigned admin rights.

## Capabilities and Permissions

Administrators have elevated privileges and can perform the following actions:
- **Access Management:** Have full access to the Access Page.
- **User Management:** Create new users and reset user passwords.
- **Data Management:** Have the ability to change and manage:
  - Records
  - Items
  - Materials Management
- **Destructive Actions:** Can fetch and use specific delete endpoints across the application.
