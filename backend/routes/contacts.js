const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendContactNotification(contact) {
  if (!resend || !process.env.ADMIN_EMAIL) return;
  try {
    await resend.emails.send({
      from: 'SORATA Advisory <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      subject: `[Liên hệ mới] ${contact.name} — ${contact.phone}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <h2 style="color:#2563eb;border-bottom:2px solid #e2e8f0;padding-bottom:12px">
            📩 Khách hàng mới liên hệ
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr><td style="padding:8px 0;color:#64748b;width:130px">Họ tên</td><td style="padding:8px 0;font-weight:bold">${contact.name}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b">Điện thoại</td><td style="padding:8px 0"><a href="tel:${contact.phone}" style="color:#2563eb">${contact.phone}</a></td></tr>
            ${contact.email ? `<tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0"><a href="mailto:${contact.email}" style="color:#2563eb">${contact.email}</a></td></tr>` : ''}
            ${contact.service ? `<tr><td style="padding:8px 0;color:#64748b">Dịch vụ</td><td style="padding:8px 0">${contact.service}</td></tr>` : ''}
            ${contact.message ? `<tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Nội dung</td><td style="padding:8px 0">${contact.message}</td></tr>` : ''}
          </table>
          <div style="margin-top:24px;padding:12px 16px;background:#eff6ff;border-radius:8px;font-size:13px;color:#64748b">
            Đăng nhập admin tại <a href="http://localhost:5174/admin" style="color:#2563eb">localhost:5174/admin</a> để xem hộp thư.
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Resend email error:', err.message);
  }
}

// POST /api/contacts - submit contact form
router.post('/', async (req, res) => {
  const { name, phone, email, service, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Vui lòng nhập họ tên và số điện thoại.' });
  }
  try {
    const stmt = db.prepare(
      'INSERT INTO contacts (name, phone, email, service, message) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(name, phone, email || null, service || null, message || null);
    sendContactNotification({ name, phone, email, service, message });
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
