# QuickHire

**Project:** QuickHire — simple job board with admin panel and application flow

**Overview**
- Full-stack web app with a React/Vite frontend and an Express/MongoDB backend.
- Admins can create/update/delete jobs; users can view and apply.

**Architecture (Clean-ish structure)**
- The codebase is split into two main parts:
  - **Frontend (client/):** presentation layer — UI components, pages, API helpers.
  - **Backend (server/):** application core — controllers, routes, middleware, models.

- Responsibilities by layer:
  - **Controllers:** application use-cases and orchestration (server/src/controllers).
  - **Routes:** HTTP transport mapping to use-cases (server/src/routes).
  - **Middleware:** auth, validation, request-level concerns (server/src/middleware).
  - **Models:** persistence via Mongoose (server/src/models).
  - **Client components/pages:** UI and routing (client/src/components, client/src/page).
  - **API helpers:** thin axios helpers that the UI calls (client/src/api/api.js).

**Repository structure (important files)**
- [client](client): React app
  - [client/src/App.jsx](client/src/App.jsx) - main routes
  - [client/src/api/api.js](client/src/api/api.js) - axios API wrappers
  - [client/src/page](client/src/page) - pages: `Home`, `AdminPanel`, `JobDetail`, `Login`, `Signup`
  - [client/src/components](client/src/components) - UI components, `Navbar`, `Jobcard`, `ApplicationForm`, `ProtectedRoute`

- [server](server): Express API
  - [server/src/app.js](server/src/app.js) - express app, route registration
  - [server/src/server.js](server/src/server.js) - server bootstrap and DB connect
  - [server/src/controllers](server/src/controllers) - `auth.controller.js`, `job.controller.js`, `application.controller.js`
  - [server/src/routes](server/src/routes) - `auth.routes.js`, `job.routes.js`, `application.routes.js`
  - [server/src/middleware](server/src/middleware) - `auth.js` (isAdmin), validators
  - [server/src/models](server/src/models) - `user.js`, `job.js`, `application.js`
  - [.env](server/.env) - environment variables (not checked into git)

**Prerequisites**
- Node.js (16+ recommended)
- npm
- MongoDB running locally or accessible via connection string

**Environment**
- Create a `.env` in the `server` folder with at least:
  - `MONGO_URI=mongodb://localhost:27017/quickhire`
  - `JWT_SECRET=your_jwt_secret_here`
  - `PORT=5000`

**Install & Run (development)**
1. Backend

```bash
cd server
npm install
npm run dev
```

2. Frontend

```bash
cd client
npm install
npm run dev
```

Open the frontend UI at `http://localhost:5173` (vite default) and the API runs on `http://localhost:5000`.

**Auth / Admin notes**
- Authentication uses JWT. Tokens are returned by `POST /api/auth/login` and stored in `localStorage`.
- The `isAdmin` middleware verifies the JWT and checks `user.role === 'admin'` for protected `POST/PUT/DELETE /api/jobs` endpoints.
- To get an admin account you can either:
  - Promote an existing user in MongoDB (`db.users.updateOne({email:...}, {$set:{role:'admin'}})`), or
  - Seed an admin user with a script and hashed password (not included).

**How data flows**
- UI calls `client/src/api/api.js` helpers → backend routes → controllers → models → MongoDB.
- Example: `createJob()` calls `POST /api/jobs` (protected), backend `job.controller.createJob` inserts a `Job` document.

**Common troubleshooting**
- `ERR_CONNECTION_REFUSED` when posting from client → backend not running on port 5000.
- Duplicate job entries → make sure the backend is running and client prevents double submits (the admin UI includes a loading guard).
- Validation errors → server returns `{ success:false, message:"Server error", error: ... }` — check server logs.


