# Contact Management REST API

## Base Endpoint

`{ENDPOINT}` **-** `/api/v1`

## 🔐 Authentication
- **POST** `/login` → User login
- **POST** `/signup` → User registration

## 📋 Contact Management
- **GET** `/contact/all` 🔒 **→** Fetch all contact details
- **GET** `/contact/:id` 🔒 **→** Fetch contact details by ID
- **POST** `/contact/new` 🔒 **→** Create a new contact
- **DELETE** `/contact/:id` 🔒 **→** Delete a contact
- **PATCH** `/contact/:id` 🔒 **→** Update a contact

---
🚀 **Secure endpoints** (🔒) require authentication.
