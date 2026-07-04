### SPA Booking Backend System
A clean, modular backend booking system for spa services, built with Node.js, Express, TypeScript, and Prisma.
This project handles authentication, service management, bookings, admin workflows, and business rules with a maintainable architecture.

🚀 Features
🔐 Authentication & Authorization
User registration

User login

JWT‑based authentication

Role‑based access (Admin / User)

Protected routes with middleware

💆 Service Management (Admin Only)
Create a service

Update a service

Delete a service

View all services

View a single service

📅 Booking Management
Users can create bookings

Users can view their own bookings

Admin can view all bookings

Admin can update booking status (approved, cancelled, declined)

Booking conflict‑prevention logic (no double‑booking)

🧩 Architecture
Clean, layered structure:

controllers → use-cases → repositories → database
This keeps logic separated, testable, and easy to maintain.

🗄️ Database
Prisma ORM

PostgreSQL (or any Prisma‑supported DB)

Full Prisma schema

Migrations included

🧪 Testing
Full test suite

80%+ coverage

Tests for authentication, services, bookings, and business rules

📂 Project Structure:
spa_booking_backend/
│
├── src/
│   ├── controllers/
│   ├── use-cases/
│   ├── repositories/
│   ├── middlewares/
│   ├── prisma/
│   ├── routes/
│   ├── server.ts
│   └── app.ts
│
├── tests/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── dist/
├── package.json
├── tsconfig.json
└── README.md

🧪 Testing
Run the full test suite:
npm run test
Coverage reports are generated automatically.

🎯 Why This Project Matters
This backend demonstrates:

Real authentication

Real business logic

Real admin workflows

Real database schema

Real testing

Real architecture

It’s exactly the kind of project that shows you can build production-style systems even as a beginner.

👩🏽‍💻 Built by Sainabou Camara
A clean, structured backend project built for learning, practicing architecture, and understanding real‑world API design.
