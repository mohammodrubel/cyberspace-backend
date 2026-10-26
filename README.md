# Inventory Management Backend

A scalable, multi-organization inventory management backend built with **Node.js**, **Prisma ORM**, and **PostgreSQL**. It provides the data foundation for managing products, warehouses, suppliers, purchases, sales orders, stock movements, users, and organization subscriptions.

> **Project status:** Schema foundation / backend in development. Feature availability depends on the API services implemented in the application.

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Data Model](#data-model)
- [Roles and Permissions](#roles-and-permissions)
- [Inventory Workflow](#inventory-workflow)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Prisma Commands](#prisma-commands)
- [Important Implementation Notes](#important-implementation-notes)
- [Suggested API Modules](#suggested-api-modules)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is designed for businesses that need a centralized way to track inventory across one or more warehouses. Its organization-scoped data model supports multiple businesses in the same application while keeping their records logically separated.

The backend schema covers:

- Organization and user management
- Role-based access foundations
- Product catalog and categories
- Supplier records
- Warehouse and stock tracking
- Purchase records and line items
- Sales/order records and line items
- Stock movement history
- Monthly organization subscriptions

## Core Features

### Organization Management
- Store organization name, slug, contact details, and address.
- Activate or deactivate an organization.
- Scope business data by `organizationId`.
- Associate users, products, warehouses, purchases, orders, and inventory history with an organization.

### User Management
- Support `SUPER_ADMIN`, `ADMIN`, `MANAGER`, and `EMPLOYEE` roles.
- Activate or deactivate users.
- Enforce unique email addresses within each organization.
- Associate inventory operations with the user who created them.

### Product & Category Management
- Create products with SKU, description, category, unit, cost price, and selling price.
- Support units such as pieces, boxes, kilograms, grams, liters, meters, and sets.
- Set minimum and optional maximum stock thresholds.
- Mark products as active or inactive.
- Enforce SKU uniqueness within an organization.

### Supplier Management
- Store supplier and company names, email, phone, and address.
- Track supplier activation status.
- Associate suppliers with purchase records.

### Warehouse & Stock Management
- Maintain multiple warehouses per organization.
- Track stock quantity and reserved quantity per product and warehouse.
- Prevent duplicate stock rows for the same product/warehouse pair.
- Support stock movement types for purchases, sales, adjustments, transfers, returns, damage, and loss.

### Purchase Management
- Record supplier, invoice number, purchase date, status, subtotal, discount, tax, total, and notes.
- Store purchased products as purchase line items.
- Support `DRAFT`, `PENDING`, `RECEIVED`, and `CANCELLED` statuses.

### Order & Sales Management
- Record orders with unique organization-scoped order numbers.
- Track line items, totals, discounts, taxes, and notes.
- Track order status and payment status separately.
- Support `DRAFT`, `CONFIRMED`, `COMPLETED`, and `CANCELLED` order statuses.
- Support `PENDING`, `PARTIAL`, `PAID`, and `REFUNDED` payment statuses.

### Stock Movement History
- Record stock changes with product, warehouse, movement type, quantity, optional user, reference ID, and note.
- Use movement records as an audit trail for inventory changes.

### Subscription Tracking
- Store an organization's plan, status, start/end dates, monthly billing period, and price.
- Prevent duplicate subscription records for the same organization and billing month/year.

## Technology Stack

- **Runtime:** Node.js
- **ORM:** Prisma ORM (`prisma-client-js`)
- **Database:** PostgreSQL
- **Schema language:** Prisma Schema

The API framework, validation library, authentication strategy, and testing tools can be selected based on the application implementation.

## Data Model

The Prisma schema defines the following main models:

| Model | Purpose |
|---|---|
| `Organization` | Business/tenant and its related records |
| `User` | Organization members and roles |
| `Subscription` | Organization plan and billing period |
| `Category` | Product categorization |
| `Product` | Product catalog and pricing |
| `Supplier` | Supplier contact information |
| `Warehouse` | Physical or logical storage locations |
| `Stock` | Quantity and reserved quantity by product and warehouse |
| `Purchase` | Purchase header and totals |
| `PurchaseItem` | Products and quantities within a purchase |
| `Order` | Sales/order header, totals, and payment status |
| `OrderItem` | Products and quantities within an order |
| `StockMovement` | Inventory change history |

### Relationship summary

- An organization has many users, products, categories, suppliers, warehouses, purchases, orders, and stock movements.
- A product may belong to a category and can have stock in multiple warehouses.
- A purchase can contain multiple purchase items.
- An order can contain multiple order items.
- A stock row connects one product to one warehouse.
- Stock movements record inventory activity for a product and warehouse.

## Roles and Permissions

The schema defines these roles:

| Role | Intended responsibility |
|---|---|
| `SUPER_ADMIN` | Platform-wide administration, if enabled by the application |
| `ADMIN` | Manage an organization's operations and users |
| `MANAGER` | Oversee inventory and business workflows |
| `EMPLOYEE` | Perform permitted day-to-day operations |

**Important:** Prisma enums define available role values, but they do not enforce authorization by themselves. Implement and test permission checks in the API for every protected endpoint. Ensure organization-scoped access is verified server-side.

## Inventory Workflow

A recommended inventory workflow is:

1. Create an organization and its users.
2. Configure product categories, suppliers, and warehouses.
3. Create products and define their cost, selling price, and stock thresholds.
4. Create a purchase with purchase items.
5. When the purchase is received, update stock and create corresponding stock movement records in a database transaction.
6. Create an order with order items.
7. When the order is confirmed or completed according to business rules, validate available stock, update inventory, and record the movement.
8. Review stock levels, movement history, and low-stock reports.

The exact stock update rules should be implemented in the service layer. Creating a purchase or order record alone should not automatically be assumed to change inventory.

## Getting Started

### Prerequisites

Install the following before starting:

- Node.js (use a current LTS release)
- PostgreSQL
- npm, pnpm, or yarn
- The application source code containing this Prisma schema

### 1. Install dependencies

For an existing Node.js project using npm:

```bash
npm install
npm install @prisma/client
npm install -D prisma
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME?schema=public"
```

Replace the placeholders with your PostgreSQL connection details. Do not commit `.env` or database credentials to version control.

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Apply the schema to the database

For local development, create and apply a migration:

```bash
npx prisma migrate dev --name init
```

For a deployment environment, apply committed migrations with:

```bash
npx prisma migrate deploy
```

### 5. Start the application

Use the start or development command configured in your project's `package.json`, for example:

```bash
npm run dev
```

> This repository's exact start command depends on the API framework and scripts configured in `package.json`.

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string used by Prisma |

If the application implements authentication, email, file storage, or external services, document those additional environment variables here as they are introduced.

## Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply a development migration
npx prisma migrate dev --name describe_your_change

# Apply migrations in deployment
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio

# Validate the Prisma schema
npx prisma validate
```

## Important Implementation Notes

Before using this schema in production, consider the following:

1. **Stock quantities and concurrency:** Use database transactions for stock updates. Validate available stock and prevent concurrent requests from overselling inventory.
2. **Warehouse selection:** Purchase and order line items currently do not store a warehouse ID. The API must define how the target warehouse is selected, or the schema should be extended to store it.
3. **Quantity precision:** `Stock.quantity`, `Stock.reservedQty`, and item quantities are integers. If fractional quantities are required for units such as KG, GRAM, LITER, or METER, consider using a suitable `Decimal` field.
4. **Stock movement sign convention:** Define whether `StockMovement.quantity` is always positive with direction inferred from `type`, or whether negative quantities are allowed. Apply that rule consistently.
5. **Organization isolation:** Validate that related products, categories, suppliers, warehouses, and users belong to the same organization before linking records. Relations alone do not guarantee tenant isolation.
6. **Authentication and authorization:** Hash passwords with a suitable password-hashing algorithm, never return password hashes from API responses, and enforce permissions on the server.
7. **Order and purchase totals:** Calculate totals on the server from validated line items. Do not trust client-submitted totals.
8. **Auditability:** Consider recording who performed adjustments and transfers, and use a transaction to update stock and write the corresponding movement record together.
9. **Data integrity:** Consider database-level checks or service validation for non-negative quantities, prices, and reserved stock.
10. **Subscription dates:** Enforce subscription expiry and cancellation rules in application logic; the enum alone does not do so.

## Suggested API Modules

The following are recommended module boundaries, not a claim that these endpoints are already implemented:

```text
/api
  /auth
  /organizations
  /users
  /subscriptions
  /categories
  /products
  /suppliers
  /warehouses
  /stock
  /purchases
  /orders
  /stock-movements
  /reports
```

Potential reporting features include low-stock alerts, stock valuation, purchase summaries, sales summaries, and stock movement reports.

## Contributing

1. Create a feature branch.
2. Make changes and validate the Prisma schema.
3. Add or update migrations when changing the data model.
4. Test authorization, organization isolation, and inventory transaction behavior.
5. Open a pull request with a clear description of the change.

## License

Add your chosen license before publishing or distributing this project. Until a license is included, reuse and distribution permissions may be limited.
