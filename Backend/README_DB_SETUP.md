# SQLite Database Setup

## 1. Create the Database

In the `Backend` directory, run:

```
sqlite3 db.sqlite < schema.sql
sqlite3 db.sqlite < seed.sql
```

This will create `db.sqlite` with the required tables and sample data.

## 2. Verify Tables and Data

You can check the tables and data using:

```
sqlite3 db.sqlite
sqlite> .tables
sqlite> SELECT * FROM orders;
```

## 3. Requirements
- [SQLite](https://www.sqlite.org/download.html) must be installed on your system.

---

**Files:**
- `schema.sql` – Table definitions
- `seed.sql` – Sample data
- `db.sqlite` – The actual database (created after running above commands) 