# Freelancer Tracker — Backend API

Production-ready REST API for the Freelancer Tracker MERN application, built with
Node.js, Express.js, MongoDB (Mongoose), and JWT authentication.

## Tech Stack

- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication + bcryptjs
- express-validator (request validation)
- helmet, express-rate-limit, cors, express-mongo-sanitize (security)
- multer (file uploads) + nodemailer (email)
- morgan (logging) + compression

## Project Structure

```
server/
├── config/          # DB connection, multer, logger config
├── controllers/      # Route handler logic
├── middleware/        # Auth, error, validation, upload, rate-limit middleware
├── models/            # Mongoose schemas: User, Project, Client, Payment, Activity
├── routes/             # Express routers
├── services/           # Email + activity logging services
├── utils/               # Helpers: AppError, apiResponse, generateToken, paginate
├── validators/           # express-validator rule sets
├── uploads/               # Uploaded files (images, PDFs, ZIPs, docs)
├── logs/                   # Access log files
├── app.js                    # Express app setup
├── server.js                   # Entry point
├── .env.example
└── package.json
```

## Installation

```bash
cd server
npm install
cp .env.example .env
# fill in your MongoDB URI, JWT secret, and email credentials in .env
```

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (default `5000`) |
| `NODE_ENV` | `development` or `production` |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | JWT expiry, e.g. `7d` |
| `JWT_COOKIE_EXPIRES_IN` | Cookie expiry in days |
| `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_FROM` | SMTP credentials for Nodemailer |
| `CLIENT_URL` | URL of the deployed frontend (used for CORS + reset links) |

## Run — Development

```bash
npm run dev
```

Starts the server with `nodemon`, auto-restarting on file changes.

## Run — Production

```bash
npm start
```

## API Documentation

All responses follow this shape:

**Success**
```json
{ "success": true, "message": "Project created successfully", "data": {} }
```

**Error**
```json
{ "success": false, "message": "Validation failed", "errors": [] }
```

### Auth — `/api/auth`

| Method | Route | Description | Access |
|---|---|---|---|
| POST | `/signup` | Register a new user | Public |
| POST | `/login` | Log in, returns JWT | Public |
| POST | `/logout` | Clear auth cookie | Private |
| GET | `/profile` | Get current user | Private |
| PUT | `/profile` | Update profile (supports `profileImage` upload) | Private |
| PUT | `/change-password` | Change password | Private |
| POST | `/forgot-password` | Send password reset email | Public |
| PUT | `/reset-password/:token` | Reset password with token | Public |

### Projects — `/api/projects`

| Method | Route | Description |
|---|---|---|
| GET | `/` | List projects — supports `search`, `status`, `paymentStatus`, `priority`, `client`, `companyName`, `deadlineBefore`, `deadlineAfter`, `sortBy`, `order`, `page`, `limit` |
| POST | `/` | Create project (supports `attachments` upload, up to 5 files) |
| GET | `/:id` | Get single project (includes payment timeline) |
| PUT | `/:id` | Update project |
| DELETE | `/:id` | Delete project |

### Clients — `/api/clients`

| Method | Route | Description |
|---|---|---|
| GET | `/` | List clients — supports `search`, `sortBy`, `order`, `page`, `limit` |
| POST | `/` | Create client |
| GET | `/:id` | Get single client |
| PUT | `/:id` | Update client |
| DELETE | `/:id` | Delete client (blocked if projects are linked) |

### Payments — `/api/payments`

| Method | Route | Description |
|---|---|---|
| GET | `/` | List payments — supports `project`, `status`, `sortBy`, `order`, `page`, `limit` |
| POST | `/` | Create payment (auto-syncs project's received/remaining amount) |
| GET | `/project/:projectId` | All payments for a project |
| PUT | `/:id` | Update payment |
| DELETE | `/:id` | Delete payment |

### Dashboard — `/api/dashboard`

| Method | Route | Description |
|---|---|---|
| GET | `/` | Returns total/completed/active/pending/paid/unpaid project counts, monthly/yearly/total/pending income, upcoming deadlines, and recent activities |

### Search — `/api/search`

| Method | Route | Description |
|---|---|---|
| GET | `/?q=term` | Search projects by project name, client name, or company name |

## Security

- Helmet for secure HTTP headers
- express-rate-limit (global + stricter auth-route limiting)
- express-mongo-sanitize to prevent NoSQL injection
- bcryptjs password hashing
- JWT auth via Bearer token or httpOnly cookie
- express-validator on every mutating request

## Notes

- All Project/Client/Payment resources are scoped to the authenticated user (`createdBy`).
- File uploads are stored in `uploads/` and served statically at `/uploads/<filename>`.
- The API is fully compatible with the Freelancer Tracker React frontend — set
  `VITE_API_URL` in the client's `.env` to `http://localhost:5000/api`.
