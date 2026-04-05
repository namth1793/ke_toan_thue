const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize DB (creates tables + seeds if empty)
require('./db/database');

const app = express();
const PORT = process.env.PORT || 5013;

// CORS: allow specific origin in production, all in development
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : true;

app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json());

app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/courses', require('./routes/courses'));

app.get('/', (_req, res) => {
  res.json({ message: 'Kế Toán Thuế Sao Việt API - Running OK', port: PORT });
});

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
