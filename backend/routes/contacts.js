const express = require('express');
const router = express.Router();
const db = require('../db/database');

// POST /api/contacts - submit contact form
router.post('/', (req, res) => {
  const { name, phone, email, service, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Vui lòng nhập họ tên và số điện thoại.' });
  }
  try {
    const stmt = db.prepare(
      'INSERT INTO contacts (name, phone, email, service, message) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(name, phone, email || null, service || null, message || null);
    res.status(201).json({ success: true, id: result.lastInsertRowid, message: 'Chúng tôi sẽ liên hệ bạn sớm nhất!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi hệ thống. Vui lòng thử lại sau.' });
  }
});

// GET /api/contacts - admin view
router.get('/', (req, res) => {
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json(contacts);
});

module.exports = router;
