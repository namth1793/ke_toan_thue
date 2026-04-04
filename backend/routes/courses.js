const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/courses
router.get('/', (req, res) => {
  const courses = db.prepare('SELECT * FROM courses ORDER BY id ASC').all();
  res.json(courses);
});

// GET /api/courses/:slug
router.get('/:slug', (req, res) => {
  const course = db.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug);
  if (!course) return res.status(404).json({ error: 'Khóa học không tồn tại.' });
  res.json(course);
});

// POST /api/courses/:id/register
router.post('/:id/register', (req, res) => {
  const { name, phone, email, note } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Vui lòng nhập họ tên và số điện thoại.' });
  }
  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);
  if (!course) return res.status(404).json({ error: 'Khóa học không tồn tại.' });

  try {
    const stmt = db.prepare(
      'INSERT INTO registrations (course_id, name, phone, email, note) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(parseInt(req.params.id), name, phone, email || null, note || null);
    res.status(201).json({ success: true, id: result.lastInsertRowid, message: 'Đăng ký thành công! Chúng tôi sẽ liên hệ xác nhận sớm nhất.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi hệ thống. Vui lòng thử lại sau.' });
  }
});

module.exports = router;
