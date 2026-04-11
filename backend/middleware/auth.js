const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'saoviet-admin-jwt-secret-2024';

module.exports = function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Chưa đăng nhập.' });
  try {
    req.admin = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn.' });
  }
};
