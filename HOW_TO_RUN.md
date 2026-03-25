# 🚀 How to Run the Inventory Management System

## Prerequisites
Make sure you have installed:
- ✅ Node.js (v14 or higher)
- ✅ MySQL (v5.7 or higher)
- ✅ npm (comes with Node.js)

## Step-by-Step Instructions

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

**OR use the convenience command from root:**
```bash
npm run install:all
```

### Step 2: Set Up Database

```bash
# Create the MySQL database
mysql -u root -p -e "CREATE DATABASE instockmp2;"
```

**OR manually:**
```bash
mysql -u root -p
CREATE DATABASE instockmp2;
exit;
```

### Step 3: Configure Environment Variables

#### Backend Configuration
```bash
cd server
cp .env.sample .env
```

Edit `server/.env` file and update your MySQL credentials:
```env
DB_LOCAL_USER=root
DB_LOCAL_PASSWORD=your_mysql_password_here
DB_LOCAL_DBNAME=instockmp2
```

#### Frontend Configuration
```bash
cd client
cp .env.sample .env
```

The `client/.env` file should have (default values usually work):
```env
REACT_APP_API_URL=http://localhost:8080
```

### Step 4: Initialize Database

```bash
cd server

# Create database tables
npm run db:migrate

# Add sample data
npm run db:seed
```

### Step 5: Start the Application

**You need TWO terminal windows open:**

#### Terminal 1 - Start Backend Server
```bash
cd server
npm start
```

You should see: `Listening on port 8080`

#### Terminal 2 - Start Frontend Server
```bash
cd client
npm start
```

The browser should automatically open to `http://localhost:3000`

### Step 6: Access the Application

- **Frontend (Web App):** http://localhost:3000
- **Backend API:** http://localhost:8080

## ✅ Verify It's Working

1. Backend is running if you see: `Listening on port 8080`
2. Frontend is running if browser opens automatically
3. You should see warehouses and inventory items (not "Loading...")

## 🐛 Troubleshooting

### Problem: "Loading..." screen stuck
**Solution:**
- Make sure backend is running on port 8080
- Check MySQL is running: `mysql -u root -p`
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`
- Check `server/.env` has correct MySQL credentials

### Problem: Database connection error
**Solution:**
- Verify MySQL is running
- Check username/password in `server/.env`
- Make sure database `instockmp2` exists

### Problem: Port already in use
**Solution:**
- Backend port 8080: Change `PORT` in `server/.env`
- Frontend port 3000: Change `PORT` in `client/.env`
- Or stop the process using that port

### Problem: CORS errors
**Solution:**
- Make sure backend is running
- Check `CORS_ORIGIN` in `server/.env` matches frontend URL

## 📝 Quick Reference Commands

```bash
# Install all dependencies
npm run install:all

# Start backend (from root)
npm run server

# Start frontend (from root)
npm run client

# Database migrations
npm run db:migrate

# Database seeding
npm run db:seed
```

## 🎯 What You Should See

When everything is working:
- ✅ Backend terminal shows: `Listening on port 8080`
- ✅ Frontend terminal shows: `Compiled successfully!`
- ✅ Browser shows warehouses/inventory tables (not "Loading...")
- ✅ You can click on warehouses and see inventory items

---

**Need more help?** Check `README.md` for detailed documentation.
