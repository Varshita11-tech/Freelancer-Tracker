# Freelancer Tracker - Deployment Guide

This project is a complete MERN (MongoDB, Express, React, Node.js) stack application, fully configured for automated deployments to **Netlify** (frontend) and **Render** (backend).

---

## 🚀 Deployment Instructions

### 1. Database (MongoDB Atlas)
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (if you don't have one).
3. Under "Database Access", create a new database user.
4. Under "Network Access", allow access from anywhere (`0.0.0.0/0`).
5. Click "Connect" -> "Connect your application" and copy your connection string.

### 2. Backend (Render)
This repository contains a `render.yaml` file for automated deployment.
1. Log in to [Render](https://render.com/).
2. Click **New** -> **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically detect the `render.yaml` configuration and create the `freelancer-tracker-api` web service.
5. In the Render Dashboard for the new service, go to **Environment** and fill in the values for the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secure random string for signing JWT tokens.
   - `JWT_EXPIRES_IN`: e.g., `30d`.
   - `CLIENT_URL`: The URL of your deployed frontend (e.g., `https://your-frontend.netlify.app`).
   - *Email environment variables (if applicable)*: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`.
6. Deploy the latest commit.

### 3. Frontend (Netlify)
This repository contains a `netlify.toml` file for automated deployment.
1. Log in to [Netlify](https://www.netlify.com/).
2. Click **Add new site** -> **Import an existing project**.
3. Connect your GitHub repository.
4. Netlify will automatically detect the `netlify.toml` and configure the build settings (`client` folder, `npm run build`, `dist` folder).
5. Before deploying, click on **Site configuration** or add Environment Variables:
   - Key: `VITE_API_URL`
   - Value: The URL of your Render backend (e.g., `https://freelancer-tracker-api.onrender.com/api`)
6. Deploy the site.

---

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Setup
1. Clone the repository.
2. Setup the server:
   ```bash
   cd server
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```
3. Setup the client:
   ```bash
   cd client
   npm install
   npm run dev
   ```

---

## 📥 Pushing to GitHub

Follow these exact steps in your terminal to push this project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit - Ready for Production (Render + Netlify)"
git branch -M main
git remote add origin https://github.com/Varshita11-tech/Freelancer-Tracker.git
git push -u origin main
```
