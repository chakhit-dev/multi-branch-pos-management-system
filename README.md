# 🛒 Multi-Branch POS Management System

A comprehensive multi-branch Point of Sale (POS) and store management system built with modern web technologies. It supports multi-store operations, real-time sales tracking, inventory/product management, table management, and role-based access control (Admin, Owner, and Staff).

---

## ✨ Features

- **Multi-Branch & Store Management:** Seamlessly manage multiple business locations, branches, and unique store inventories.
- **Role-Based Access Control (RBAC):** Dedicated views and permissions for Owners, Store Admins, and Kitchen/Staff operations.
- **Product & Category Control:** Add, edit, organize, and filter products and categories per store or globally.
- **Table & Ordering Management:** Visual floor plans for tables, opening/clearing tables, and processing live orders.
- **Kitchen Display / Order Status:** Real-time tracking of kitchen orders and updateable order statuses.
- **Analytics & Sales Summaries:** Interactive charts and overview statistics summarizing store sales performance across branches.
- **Billing & History:** Complete transaction tracking, historical receipts, and session-based billing.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling & UI:** Tailwind CSS, Shadcn UI, Lucide Icons
- **Database & Backend:** Custom API routes (`/app/api/...`), database integration (`/lib/db.tsx`)
- **Authentication:** NextAuth.js (`/app/api/auth/[...nextauth]`)
- **State Management:** Zustand (`cartStore.tsx`)

---

## 📂 Project Structure

```text
multi-branch-pos-management-system/
├── app/
│   ├── admin/             # Admin dashboard views (categories, charts, products, tables, users)
│   ├── api/               # Backend API routes for CRUD operations (branches, products, orders, tables)
│   ├── billing/           # Receipt and billing sessions
│   ├── checkbills/        # Bill verification screens
│   ├── dashboard/         # Main operational dashboard
│   ├── history/           # Transaction history logs
│   ├── login/             # Authentication login portal
│   ├── order/             # POS ordering interface
│   ├── owner/             # Owner management panels
│   ├── shop/              # Storefront views & kitchen display systems
│   ├── stores/            # Global state stores (Zustand cart store)
│   └── sub_components/    # Reusable feature components (bucket, kitchen cards, sub-menus)
├── components/            # UI layout components, sidebars, charts, and data tables
├── hooks/                 # Custom React hooks (e.g., mobile detection)
├── lib/                   # Database connectors and utility formatters
├── public/                # Static assets, logos, and product item images
└── package.json           # Project dependencies & scripts
