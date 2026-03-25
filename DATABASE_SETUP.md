# 🗄️ Database Setup Guide

This guide will walk you through setting up the MySQL database for the Inventory Management System.

## Prerequisites

- ✅ MySQL Server installed and running
- ✅ MySQL root access (or a user with database creation privileges)
- ✅ Node.js and npm installed

## Step-by-Step Database Setup

### Step 1: Install MySQL (if not already installed)

**Windows:**
- Download MySQL Installer from: https://dev.mysql.com/downloads/installer/
- Run the installer and follow the setup wizard
- Remember your root password!

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install mysql-server
sudo systemctl start mysql
```

### Step 2: Create the Database

Open MySQL command line or MySQL Workbench:

```bash
# Login to MySQL
mysql -u root -p
```

Enter your MySQL root password when prompted.

Then create the database:

```sql
CREATE DATABASE instockmp2;
```

Verify it was created:

```sql
SHOW DATABASES;
```

You should see `instockmp2` in the list.

Exit MySQL:

```sql
exit;
```

**OR use command line:**

```bash
mysql -u root -p -e "CREATE DATABASE instockmp2;"
```

### Step 3: Configure Environment Variables

Navigate to the server directory:

```bash
cd server
```

Copy the environment sample file:

```bash
# Windows
copy .env.sample .env

# macOS/Linux
cp .env.sample .env
```

Edit the `.env` file and update these values with your MySQL credentials:

```env
# Database Configuration
DB_HOST=127.0.0.1
DB_LOCAL_DBNAME=instockmp2
DB_LOCAL_USER=root
DB_LOCAL_PASSWORD=your_mysql_password_here
```

**Important:** Replace `your_mysql_password_here` with your actual MySQL root password!

### Step 4: Install Dependencies

Make sure you're in the server directory:

```bash
cd server
npm install
```

This installs Knex.js and MySQL driver.

### Step 5: Run Database Migrations

Migrations create the database tables (warehouses and inventories):

```bash
npm run db:migrate
```

**OR:**

```bash
npx knex migrate:latest
```

**Expected Output:**
```
Batch 1 run: 2 migrations
```

This creates two tables:
- `warehouses` - Stores warehouse information
- `inventories` - Stores inventory items

### Step 6: Seed the Database (Optional but Recommended)

Seed files add sample data to help you test the application:

```bash
npm run db:seed
```

**OR:**

```bash
npx knex seed:run
```

**Expected Output:**
```
seed file "01_warehouses.js" executed
seed file "02_inventories.js" executed
```

This adds:
- 8 sample warehouses (Manhattan, Washington, Jersey, SF, Santa Monica, Seattle, Miami, Boston)
- Sample inventory items

### Step 7: Verify Database Setup

Connect to MySQL and check:

```bash
mysql -u root -p instockmp2
```

```sql
-- Check tables exist
SHOW TABLES;

-- Should show:
-- inventories
-- warehouses

-- Check warehouses data
SELECT * FROM warehouses LIMIT 5;

-- Check inventories data
SELECT * FROM inventories LIMIT 5;

-- Exit
exit;
```

## Database Schema

### Warehouses Table
- `id` (Primary Key, Auto Increment)
- `warehouse_name` (String)
- `address` (String)
- `city` (String)
- `country` (String)
- `contact_name` (String)
- `contact_position` (String)
- `contact_phone` (String)
- `contact_email` (String)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Inventories Table
- `id` (Primary Key, Auto Increment)
- `warehouse_id` (Foreign Key → warehouses.id)
- `item_name` (String)
- `description` (String)
- `category` (String)
- `status` (String: "In Stock" or "Out of Stock")
- `quantity` (Integer)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Troubleshooting

### Error: "ER_NOT_SUPPORTED_AUTH_MODE"

This happens with MySQL 8.0+. Fix it by updating the MySQL user:

```sql
mysql -u root -p

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
exit;
```

### Error: "Access denied for user"

- Check your MySQL username and password in `server/.env`
- Verify MySQL is running: `mysql -u root -p`
- Make sure the database exists: `SHOW DATABASES;`

### Error: "Database instockmp2 does not exist"

Create it:
```sql
CREATE DATABASE instockmp2;
```

### Error: "Table already exists"

Reset migrations:
```bash
cd server
npx knex migrate:rollback --all
npx knex migrate:latest
```

### Error: "Cannot connect to MySQL server"

- Check MySQL service is running:
  - Windows: Services → MySQL
  - macOS: `brew services list`
  - Linux: `sudo systemctl status mysql`
- Verify MySQL is listening on port 3306:
  ```bash
  netstat -an | grep 3306
  ```

### Reset Database (Start Fresh)

If you need to start over:

```bash
cd server

# Drop and recreate database
mysql -u root -p -e "DROP DATABASE IF EXISTS instockmp2; CREATE DATABASE instockmp2;"

# Run migrations
npm run db:migrate

# Run seeds
npm run db:seed
```

## Quick Setup Commands Summary

```bash
# 1. Create database
mysql -u root -p -e "CREATE DATABASE instockmp2;"

# 2. Configure environment
cd server
cp .env.sample .env
# Edit .env with your MySQL password

# 3. Install dependencies
npm install

# 4. Run migrations
npm run db:migrate

# 5. Seed data
npm run db:seed
```

## Testing Database Connection

Test if everything works:

```bash
cd server
node -e "const knex = require('knex')(require('./knexfile')); knex.raw('SELECT 1').then(() => { console.log('✅ Database connection successful!'); process.exit(0); }).catch(err => { console.log('❌ Database connection failed:', err.message); process.exit(1); });"
```

If you see "✅ Database connection successful!", you're all set!

## Next Steps

After setting up the database:

1. ✅ Start the backend server: `cd server && npm start`
2. ✅ Start the frontend server: `cd client && npm start`
3. ✅ Access the app at: http://localhost:3000

---

**Need help?** Check the main `README.md` or `HOW_TO_RUN.md` for more information.
