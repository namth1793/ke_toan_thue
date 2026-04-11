const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/database');
const auth = require('../middleware/auth');

const SECRET = process.env.JWT_SECRET || 'saoviet-admin-jwt-secret-2024';

// ─── AUTH ─────────────────────────────────────────────────────────────────────

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin.' });
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
  }
  const token = jwt.sign({ id: admin.id, username: admin.username, name: admin.name }, SECRET, { expiresIn: '24h' });
  res.json({ token, name: admin.name });
});

// POST /api/admin/change-password
router.post('/change-password', auth, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Vui lòng nhập đầy đủ.' });
  if (newPassword.length < 6) return res.status(400).json({ error: 'Mật khẩu mới phải ít nhất 6 ký tự.' });
  const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.admin.id);
  if (!bcrypt.compareSync(currentPassword, admin.password)) {
    return res.status(400).json({ error: 'Mật khẩu hiện tại không đúng.' });
  }
  db.prepare('UPDATE admins SET password = ? WHERE id = ?').run(bcrypt.hashSync(newPassword, 10), req.admin.id);
  res.json({ success: true });
});

// ─── SITE CONTENT ─────────────────────────────────────────────────────────────

// PUT /api/admin/content/:section
router.put('/content/:section', auth, (req, res) => {
  const { data } = req.body;
  if (!data) return res.status(400).json({ error: 'Missing data field.' });
  const existing = db.prepare('SELECT 1 FROM site_content WHERE section = ?').get(req.params.section);
  if (!existing) return res.status(404).json({ error: 'Section not found.' });
  db.prepare('UPDATE site_content SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE section = ?')
    .run(JSON.stringify(data), req.params.section);
  res.json({ success: true });
});

// ─── INBOX: CONTACTS ──────────────────────────────────────────────────────────

// GET /api/admin/contacts
router.get('/contacts', auth, (req, res) => {
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json(contacts);
});

// DELETE /api/admin/contacts/:id
router.delete('/contacts/:id', auth, (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ─── INBOX: REGISTRATIONS ─────────────────────────────────────────────────────

// GET /api/admin/registrations
router.get('/registrations', auth, (req, res) => {
  const rows = db.prepare(`
    SELECT r.*, c.name as course_name
    FROM registrations r
    LEFT JOIN courses c ON c.id = r.course_id
    ORDER BY r.created_at DESC
  `).all();
  res.json(rows);
});

// DELETE /api/admin/registrations/:id
router.delete('/registrations/:id', auth, (req, res) => {
  db.prepare('DELETE FROM registrations WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ─── BLOG CRUD ────────────────────────────────────────────────────────────────

// GET /api/admin/blog — all posts with full content
router.get('/blog', auth, (req, res) => {
  const posts = db.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all();
  res.json(posts);
});

// POST /api/admin/blog — create post
router.post('/blog', auth, (req, res) => {
  const { title, slug, excerpt, content, thumbnail, category } = req.body;
  if (!title || !slug) return res.status(400).json({ error: 'Cần có tiêu đề và slug.' });
  try {
    const result = db.prepare(
      'INSERT INTO blog_posts (title, slug, excerpt, content, thumbnail, category) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(title, slug, excerpt || '', content || '', thumbnail || '', category || 'Kế toán');
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    if (err.message.includes('UNIQUE')) return res.status(400).json({ error: 'Slug đã tồn tại.' });
    res.status(500).json({ error: 'Lỗi hệ thống.' });
  }
});

// PUT /api/admin/blog/:id — update post
router.put('/blog/:id', auth, (req, res) => {
  const { title, slug, excerpt, content, thumbnail, category } = req.body;
  if (!title || !slug) return res.status(400).json({ error: 'Cần có tiêu đề và slug.' });
  try {
    db.prepare(
      'UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, thumbnail=?, category=? WHERE id=?'
    ).run(title, slug, excerpt || '', content || '', thumbnail || '', category || 'Kế toán', req.params.id);
    res.json({ success: true });
  } catch (err) {
    if (err.message.includes('UNIQUE')) return res.status(400).json({ error: 'Slug đã tồn tại.' });
    res.status(500).json({ error: 'Lỗi hệ thống.' });
  }
});

// DELETE /api/admin/blog/:id
router.delete('/blog/:id', auth, (req, res) => {
  db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ─── COURSES CRUD ─────────────────────────────────────────────────────────────

// GET /api/admin/courses
router.get('/courses', auth, (req, res) => {
  const courses = db.prepare('SELECT * FROM courses ORDER BY id ASC').all();
  res.json(courses);
});

// POST /api/admin/courses
router.post('/courses', auth, (req, res) => {
  const { name, slug, duration, price, target, description, level } = req.body;
  if (!name || !slug) return res.status(400).json({ error: 'Cần có tên và slug.' });
  try {
    const result = db.prepare(
      'INSERT INTO courses (name, slug, duration, price, target, description, level) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(name, slug, duration || '', parseInt(price) || 0, target || '', description || '', level || 'Cơ bản');
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    if (err.message.includes('UNIQUE')) return res.status(400).json({ error: 'Slug đã tồn tại.' });
    res.status(500).json({ error: 'Lỗi hệ thống.' });
  }
});

// PUT /api/admin/courses/:id
router.put('/courses/:id', auth, (req, res) => {
  const { name, slug, duration, price, target, description, level } = req.body;
  if (!name || !slug) return res.status(400).json({ error: 'Cần có tên và slug.' });
  try {
    db.prepare(
      'UPDATE courses SET name=?, slug=?, duration=?, price=?, target=?, description=?, level=? WHERE id=?'
    ).run(name, slug, duration || '', parseInt(price) || 0, target || '', description || '', level || 'Cơ bản', req.params.id);
    res.json({ success: true });
  } catch (err) {
    if (err.message.includes('UNIQUE')) return res.status(400).json({ error: 'Slug đã tồn tại.' });
    res.status(500).json({ error: 'Lỗi hệ thống.' });
  }
});

// DELETE /api/admin/courses/:id
router.delete('/courses/:id', auth, (req, res) => {
  db.prepare('DELETE FROM courses WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
