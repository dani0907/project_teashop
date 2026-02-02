# 🍵Tea Selection: Full-Stack E-Commerce Solution

A comprehensive online tea shop featuring a User Storefront and a Integrated Admin Dashboard.

## 📌 Project Overview

This project is a full-stack e-commerce application designed for premium tea enthusiasts. It consists of two main parts:

- **User Storefront**: A seamless shopping experience for customers to browse, filter, and purchase tea products.
- **Admin Dashboard**: A powerful management tool for administrators to track sales data, manage inventory, and monitor business growth.

## 🛠Tech Stack

- **Frontend**: React (v18), React Router
- **Backend/Database**: Supabase (BaaS)
- **Data Visualization**: Recharts
- **State Management**: React Context API & Hooks

## ✨ Key Features

### 🛒 User Storefront (Customer Side)

- **Dynamic Product Catalog**: Browse a wide variety of teas with real-time availability sync.
- **Advanced Shopping Cart**:
  - Real-time quantity adjustments with instant subtotal calculation.
  - Persistent cart state management using `React's unidirectional data flow`.
- **Order History & Status Tracking**: A dedicated portal for customers to view and track their past purchase history and order details.

### 📊 Admin Dashboard (Management Side)

- **Sales Analytics**:
  - Daily revenue summary and weekly sales trend visualization using `Recharts`.
  - Implemented `PostgreSQL functions` for automated "zero-sales" data padding to ensure accurate and continuous trend visualization.
- **Inventory Control (CRUD)**:
  - Add, edit, and delete products with instant database updates.
  - Streamlined asset management with automated timestamping and image handling.
- **User Management**:
  - Provides an overview of registered customers to monitor user activity and account status.

## 🔍 Technical Challenges & Solution

### 1. Synchronized Full-Stack Data Flow

- **Challenge**: Ensuring that inventory changes in the Admin Panel are instantly reflected in the User Storefront without data inconsistency.
- **Solution**: Leveraged `Supabase’s real-time capabilities` and `centralized the product state` in the root component (App.jsx), ensuring a "Single Source of Truth" across both user and admin interfaces.

### 2. Time-Series Data Aggregation (PostgreSQL)

- **Challenge**: Generating a continuous 7-day sales graph even when certain days had no transactions.
- **Solution**: Wrote a `custom SQL Function (RPC)` using generate_series and LEFT JOIN. This backend-heavy approach reduced the frontend processing load and ensured data integrity for business reporting.

### 3. Database Schema Integrity & Constraint Management

- **Challenge**: Encountered a `23502: Not-Null Constraint Violation` error during a database schema migration. This occurred when reverting the `created_at` column type, which inadvertently dropped the pre-configured default values and blocked all new data entries.
- **Solution**: Identified the root cause as a missing `DEFAULT` value assignment in the PostgreSQL engine. Resolved the issue by re-establishing the `now()` function as the default value via SQL, ensuring system stability and automated timestamping for every transaction.

## 🚀Future Enhancements

- **Authentication**: Implement Role-Based Access Control (RBAC) for Customers and Admins.
- **Payment Gateway**: Integrate Stripe for actual checkout processing.
- **Search & Filter**: Add multi-criteria filtering (origin, tea type, caffeine level) to the storefront.
- **Implement Robust Data Validation**: Add client-side and server-side validation for the signup process (e.g., Email format verification, password strength requirements)
- **Mobile Responsiveness**: Implement a fully responsive design for a seamless "on-the-go" experience for both customers and admins.
