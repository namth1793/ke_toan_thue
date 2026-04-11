const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/content — all sections (public, used by frontend on load)
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT section, data FROM site_content').all();
  const content = {};
  for (const row of rows) {
    try { content[row.section] = JSON.parse(row.data); } catch { content[row.section] = {}; }
  }
  res.json(content);
});

// GET /api/content/:section — one section (public)
router.get('/:section', (req, res) => {
  const row = db.prepare('SELECT data FROM site_content WHERE section = ?').get(req.params.section);
  if (!row) return res.status(404).json({ error: 'Section not found' });
  try { res.json(JSON.parse(row.data)); } catch { res.json({}); }
});

module.exports = router;
