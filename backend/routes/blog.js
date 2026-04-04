const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/blog - list posts (with optional category filter & pagination)
router.get('/', (req, res) => {
  const { category, page = 1, limit = 6 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let query = 'SELECT id, title, slug, excerpt, thumbnail, category, views, created_at FROM blog_posts';
  let countQuery = 'SELECT COUNT(*) as total FROM blog_posts';
  const params = [];

  if (category && category !== 'Tất cả') {
    query += ' WHERE category = ?';
    countQuery += ' WHERE category = ?';
    params.push(category);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

  const posts = db.prepare(query).all(...params, parseInt(limit), offset);
  const total = db.prepare(countQuery).get(...params).total;

  res.json({ posts, total, page: parseInt(page), limit: parseInt(limit) });
});

// GET /api/blog/:slug - single post
router.get('/:slug', (req, res) => {
  const post = db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(req.params.slug);
  if (!post) return res.status(404).json({ error: 'Bài viết không tồn tại.' });
  // increment views
  db.prepare('UPDATE blog_posts SET views = views + 1 WHERE id = ?').run(post.id);
  res.json(post);
});

module.exports = router;
