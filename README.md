# Contact Management REST API

The **Contact Management REST API** provides a simple and secure way to manage user contacts. It allows users to **register**, **log in**, and perform various operations on their stored contacts, such as **retrieving**, **adding**, **updating**, and **deleting** contact details. This API follows RESTful principles and requires authentication for managing contacts.

## Features
- ➥ 🔒 Secure authentication system
- ➥ 📂 CRUD operations for managing contacts
- ➥ 🔄 RESTful API design for easy integration
- ➥ ⚡ Fast and efficient data handling
- ➥ 📡 Scalable and extendable architecture

### 🔐 Authentication
- ➽ **POST** `/login` **➠** User login
- ➽ **POST** `/signup` **➠** User registration

### 📋 Contact Management

`{ENDPOINT}` **➠** `/api/v1`
`{:id}` **➠** User Id

- ➽ **GET** `/contact/all` 🔒 **➠** Fetch all contact details
- ➽ **POST** `/contact/:id/new` 🔒 **➠** Create a new contact
- ➽ **DELETE** `/contact/:id` 🔒 **➠** Delete a contact
- ➽ **PATCH** `/contact/:id` 🔒 **➠** Update a contact

---
🚀 **Secure endpoints** (🔒) require authentication.
