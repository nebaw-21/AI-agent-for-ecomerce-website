# AI E-Commerce Backend API

## Project Structure

```
Backend/
├── db.sqlite           # SQLite database (created after setup)
├── schema.sql          # Database schema
├── seed.sql            # Sample data
├── package.json        # Node.js dependencies and scripts
├── src/
│   ├── index.js        # Main Express server
│   └── routes/
│       ├── order.js    # /order endpoints
│       ├── shipping.js # /shipping endpoints
│       ├── product.js  # /product endpoints
│       └── log.js      # /log endpoints
```

## How to Run

1. **Install dependencies:**
   ```bash
   cd Backend
   npm install
   ```
2. **Ensure db.sqlite exists:**
   (See `README_DB_SETUP.md` for setup)
3. **Start the server:**
   ```bash
   npm run dev   # for development (nodemon)
   npm start     # for production
   ```

## API Endpoints

### Orders
- `GET /order/:order_id` → `{ status }`

### Shipping
- `GET /shipping/:tracking_id` → `{ status }`

### Products
- `GET /product/name/:product_name` → `{ available, stock }`

### Logs
- `POST /log` `{ user_id, query, response }` → `{ success: true }`
- `GET /log/:user_id` → `{ logs: [ { query, response, timestamp } ] }`

---

**All endpoints return JSON.** 