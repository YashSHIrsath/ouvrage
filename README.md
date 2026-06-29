# 🏗️ Ouvrage — Construction Company Website Platform

A premium, modern, and fully customizable website platform built for construction, land development, and engineering companies. Features a powerful admin panel for content management, dynamic theming, and a polished public-facing site.

---

## Tech Stack

| Layer       | Technology                                                     |
| ----------- | -------------------------------------------------------------- |
| **Backend** | PHP 8.3+, Laravel 13, Sanctum (SPA cookie auth), SQLite        |
| **Frontend**| React 19, TypeScript 6, Vite 8, Ant Design 6, Zustand, TanStack Query |
| **Styling** | CSS Modules, custom theme system (light / dark / custom)       |
| **Tooling** | Composer, npm, OxLint                                          |

---

## Prerequisites

Make sure the following are installed on your machine before you begin:

| Requirement  | Version  | Check command          |
| ------------ | -------- | ---------------------- |
| **PHP**      | ≥ 8.3    | `php -v`               |
| **Composer** | ≥ 2.x    | `composer --version`   |
| **Node.js**  | ≥ 20.x   | `node -v`              |
| **npm**      | ≥ 10.x   | `npm -v`               |
| **Git**      | any      | `git --version`        |

> **Note:** SQLite is used by default — no separate database server is required. The PHP `pdo_sqlite` extension must be enabled (it is included by default in most PHP distributions).

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YashSHIrsath/ouvrage.git
cd ouvrage
```

---

### 2. Backend Setup (Laravel)

```bash
cd backend
```

#### Install PHP dependencies

```bash
composer install
```

#### Create environment file

```bash
cp .env.example .env        # Linux / macOS
copy .env.example .env       # Windows (CMD)
```

#### Generate application key

```bash
php artisan key:generate
```

#### Create the SQLite database

```bash
# Linux / macOS
touch database/database.sqlite

# Windows (PowerShell)
New-Item database/database.sqlite -ItemType File
```

> The `.env.example` is pre-configured with `DB_CONNECTION=sqlite`, which uses the `database/database.sqlite` file automatically.

#### Run migrations

```bash
php artisan migrate
```

#### Seed the database (optional but recommended)

Seeds create a default admin user, sample services, pages, and navigation items.

```bash
php artisan db:seed
```

**Default admin credentials after seeding:**

| Field    | Value               |
| -------- | ------------------- |
| Email    | `test@example.com`  |
| Password | `password`          |

#### Create storage symlink

```bash
php artisan storage:link
```

---

### 3. Frontend Setup (React + Vite)

Open a **new terminal** and navigate to the frontend directory:

```bash
cd frontend
```

#### Install Node dependencies

```bash
npm install
```

That's it — no additional frontend configuration is needed. The Vite dev server is pre-configured to proxy `/api` and `/sanctum` requests to the Laravel backend at `http://localhost:8000`.

---

## Running the Application

You need **two terminals** running simultaneously:

### Terminal 1 — Backend (Laravel)

```bash
cd backend
php artisan serve
```

The API will be available at **http://localhost:8000**.

### Terminal 2 — Frontend (Vite)

```bash
cd frontend
npm run dev
```

The website will be available at **http://localhost:5173**.

> **Tip:** You can also run everything in a single terminal from the `backend` directory using the composer dev script:
>
> ```bash
> cd backend
> composer dev
> ```
>
> This concurrently starts the Laravel server, queue worker, log watcher, and Vite dev server.

---

## Project Structure

```
ouvrage/
├── backend/                    # Laravel 13 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Admin/      # Admin panel API controllers
│   │   │   │   └── Public/     # Public website API controllers
│   │   │   ├── Requests/       # Form request validation
│   │   │   └── Resources/      # API resource transformers
│   │   └── Models/             # Eloquent models
│   ├── database/
│   │   ├── migrations/         # Database schema
│   │   └── seeders/            # Sample data seeders
│   ├── routes/
│   │   └── api.php             # API route definitions
│   └── .env.example            # Environment template
│
├── frontend/                   # React 19 + TypeScript SPA
│   ├── src/
│   │   ├── components/         # Shared UI components
│   │   ├── features/           # Feature modules (services, pages, navigation, etc.)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── layouts/            # Layout components (Admin, Website)
│   │   ├── pages/              # Page-level components & routes
│   │   ├── routes/             # React Router configuration
│   │   ├── services/           # Axios API client setup
│   │   ├── stores/             # Zustand state stores
│   │   ├── styles/             # Global styles & design tokens
│   │   ├── themes/             # Theme configuration
│   │   ├── types/              # Shared TypeScript types
│   │   └── utils/              # Utility functions
│   ├── vite.config.ts          # Vite configuration with API proxy
│   └── package.json
│
└── DOCS/                       # Project documentation
    ├── PROJECT_OVERVIEW.md
    └── MODULE_ARCHITECTURE.md
```

---

## Environment Configuration

The backend `.env` file controls all configuration. Key variables:

| Variable           | Default               | Description                         |
| ------------------ | --------------------- | ----------------------------------- |
| `APP_URL`          | `http://localhost`    | Backend URL                         |
| `APP_DEBUG`        | `true`                | Enable debug mode (disable in prod) |
| `DB_CONNECTION`    | `sqlite`              | Database driver                     |
| `SESSION_DRIVER`   | `database`            | Session storage                     |
| `QUEUE_CONNECTION` | `database`            | Queue driver                        |
| `FILESYSTEM_DISK`  | `local`               | File storage driver                 |
| `MAIL_MAILER`      | `log`                 | Mail driver (uses log in dev)       |

### Using MySQL / PostgreSQL instead of SQLite

Update these variables in `backend/.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ouvrage
DB_USERNAME=root
DB_PASSWORD=your_password
```

Then run `php artisan migrate` to create the tables in your database.

---

## Available Scripts

### Backend (`backend/`)

| Command                      | Description                              |
| ---------------------------- | ---------------------------------------- |
| `php artisan serve`          | Start the development server             |
| `php artisan migrate`        | Run database migrations                  |
| `php artisan migrate:fresh`  | Drop all tables and re-run migrations    |
| `php artisan db:seed`        | Seed the database with sample data       |
| `php artisan migrate:fresh --seed` | Reset DB and re-seed in one command |
| `php artisan test`           | Run the test suite                       |
| `composer dev`               | Start all services concurrently          |

### Frontend (`frontend/`)

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start Vite dev server (port 5173)    |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Lint the codebase with OxLint        |

---

## Troubleshooting

### "SQLSTATE: no such table"

You haven't run migrations yet. Run:

```bash
cd backend
php artisan migrate
```

### CORS / cookie issues on login

The Vite dev server proxies `/api` and `/sanctum` to Laravel. Make sure:

1. Laravel is running on port **8000** (`php artisan serve`).
2. You're accessing the site via **http://localhost:5173** (not `127.0.0.1`).
3. `SESSION_DOMAIN` in `.env` is set to `null` (default).

### "Failed to open stream: No such file or directory" (SQLite)

The SQLite database file doesn't exist. Create it:

```bash
# Linux / macOS
touch backend/database/database.sqlite

# Windows (PowerShell)
New-Item backend/database/database.sqlite -ItemType File
```

### Port already in use

- Backend: `php artisan serve --port=8001`
- Frontend: Update the `server.port` in `frontend/vite.config.ts` and the proxy target accordingly.

### Frontend can't reach the API

Make sure both servers are running and the Vite proxy config in `frontend/vite.config.ts` points to the correct Laravel URL (default: `http://localhost:8000`).

---

## Production Build

```bash
# Build frontend assets
cd frontend
npm run build

# The built files will be in frontend/dist/
# Serve them with any static file server or integrate with Laravel
```

For production deployment, also make sure to:

- Set `APP_ENV=production` and `APP_DEBUG=false` in `backend/.env`
- Run `php artisan config:cache && php artisan route:cache && php artisan view:cache`
- Use a proper web server (Nginx / Apache) instead of `php artisan serve`

---

## License

This project is proprietary. All rights reserved.
