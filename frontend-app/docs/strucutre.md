# Application Structure

This document outlines the high-level architecture and structure of the application.

## Core Application Areas
The application is logically divided into two primary sections:
- **Dashboard:** The main user-facing interface where standard operations and viewing of related records, items, and materials take place.
- **Admin Section:** A specialized, restricted area designed for privileged users. It is responsible for sensitive operations such as access management, data management (modifying records, items, materials), and executing specific delete endpoints.

## Authentication and Access
- **Public Login:** Users can authenticate via the public login page to access the standard dashboard.
- **Registration & Initial Setup:** The initial setup for the application's very first user is handled through a specialized registration view. To secure this process, the first user must provide a secret key (`ROOT_APP_SECRET`) which immediately provisions them with administrator rights. Subsequent user creation is completely managed by the established admin users.
