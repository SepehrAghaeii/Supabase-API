# Supabase API
A REST API built with Node.js, Express, and Supabase for user management with authentication.

## Features
- User registration and login with Supabase Auth
- CRUD operations for customers
- Protected profile endpoint with token-based authentication

## Setup
1. Clone the repo: `git clone https://github.com/SepehrAghaeii/Supabase-API`
2. Install dependencies: `npm install`
3. Create a `.env` file with:
SUPABASE_URL=your_supabase_url SUPABASE_KEY=your_supabase_key PORT=3000
4. Run the server: `node index.js`

## Endpoints
- `POST /register` - Register a new user (body: {email, password})
- `POST /login` - Login and get token (body: {email, password})
- `GET /profile` - Get logged-in user info (header: Authorization: Bearer <token>)
- `GET /customers` - Get all customers
- `POST /customers` - Add a new customer (body: {email})
- `PUT /customers/:id` - Update a customer (body: {email})
- `DELETE /customers/:id` - Delete a customer

## Technologies
- Node.js
- Express
- Supabase (Database & Auth)
