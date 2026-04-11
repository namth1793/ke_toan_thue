const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize DB (creates tables + seeds if empty)
try {
  require('./db/database');
  console.log('✅ Database initialized');
} catch (err) {
  console.error('❌ Database initialization failed:', err.message);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5013;

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : true;

app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/content', require('./routes/content'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/upload', require('./routes/upload'));

app.get('/', (_req, res) => {
  res.json({ message: 'SORATA Advisory API - Running OK', port: PORT, version: 'v2-with-content' });
});

app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
});
