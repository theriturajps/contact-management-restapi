# Contact Management REST API

The **Contact Management REST API** provides a simple and secure way to manage user contacts. It allows users to **register**, **log in**, and perform various operations on their stored contacts, such as **retrieving**, **adding**, **updating**, and **deleting** contact details. This API follows RESTful principles and requires authentication for managing contacts.

## Features
- ➥ 🔒 Secure authentication system **OAuth 2.0**
- ➥ 📂 CRUD operations for managing contacts
- ➥ 🔄 RESTful API design for easy integration
- ➥ ⚡ Fast and efficient data handling
- ➥ 📡 Scalable and extendable architecture

### 🔐 Authentication

`{ENDPOINT}` **➠** `/user`

- ➽ **POST** `/login` **➠** User login
- ➽ **POST** `/signup` **➠** User registration
- ➽ **POST** `/newtoken` 🔒 **➠** Renew the access token
- ➽ **DELETE** `/delete` 🔒 **➠** Delete user from database

### 📋 Contact Management

`{ENDPOINT}` **➠** `/api/v1/contact`

`{:id}` **➠** Contact Id

- ➽ **GET** `/all` 🔒 **➠** Fetch all contact details
- ➽ **POST** `/new` 🔒 **➠** Create a new contact for user
- ➽ **DELETE** `/:id` 🔒 **➠** Delete a contact
- ➽ **PATCH** `/:id` 🔒 **➠** Update a contact

---
🚀 **Secure endpoints** (🔒) require authentication.
