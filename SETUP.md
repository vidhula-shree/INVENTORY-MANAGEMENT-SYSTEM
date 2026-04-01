# Quick Setup Guide

## 🚀 Quick Start

### Step 1: Install Dependencies
```bash
# Install all dependencies (server + client)
npm run install:all

# Or install separately:
cd server && npm install
cd ../client && npm install
```

### Step 2: Database Setup
```bash
# Create MySQL database
mysql -u root -p -e "CREATE DATABASE instockmp2;"

# Or manually:
mysql -u root -p
CREATE DATABASE instockmp2;
exit;
```

### Step 3: Configure Environment Variables

**Backend (`server/.env`):**
```bash
cd server
cp .env.sample .env
# Edit .env with your MySQL credentials
```

**Frontend (`client/.env`):**
```bash
cd client
cp .env.sample .env
# The default values should work if backend runs on port 8080
```

### Step 4: Initialize Database
```bash
# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

### Step 5: Start the Application

**Option A: Using root package.json (Recommended)**
```bash
# Terminal 1 - Start backend
npm run server

# Terminal 2 - Start frontend
npm run client
```

**Option B: Manual start**
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm start
```

### Step 6: Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080

## ✅ Verification

1. Backend is running if you see: `Listening on port 8080`
2. Frontend is running if browser opens to http://localhost:3000
3. Check API: Visit http://localhost:8080/warehouses in browser

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Test MySQL connection
mysql -u root -p instockmp2

# Check if database exists
mysql -u root -p -e "SHOW DATABASES;"
```

### Port Conflicts
- Backend port 8080: Change `PORT` in `server/.env`
- Frontend port 3000: Change `PORT` in `client/.env`

### Environment Variables
- Frontend variables MUST start with `REACT_APP_`
- Restart servers after changing `.env` files

- ((((Great that it's working! 🎉 Here's what you'd need to do on any new computer:
Install these first:

Node.js (from nodejs.org)
MySQL 8 (from mysql.com)

Then these steps every time:
1. MySQL setup

Install MySQL and set a root password
Create the database: CREATE DATABASE instockmp2;
Run the auth fix: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';

2. Update .env in the server folder with the new machine's MySQL password:
DB_LOCAL_PASSWORD=yourpassword
DB_LOCAL_USER=root
3. In the server folder:
powershellnpm install
npx knex migrate:latest
npx knex seed:run
npm start
4. In the client folder:
powershellnpm install react-scripts@5.0.1 --save
npm start

The only things that change machine to machine are:

MySQL password → update .env
If someone uses a different MySQL username → update DB_LOCAL_USER too)))))
