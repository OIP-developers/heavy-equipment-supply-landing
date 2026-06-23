import express from 'express'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 4173

app.use(express.json())
app.use(express.static(join(__dirname, 'dist')))

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, fullName, email, phone, fundSource, amount, notes } = req.body

  if (!email || !phone) {
    return res.status(400).json({ success: false, message: 'Email and phone are required.' })
  }

  const name = fullName || `${firstName || ''} ${lastName || ''}`.trim()

  try {
    await transporter.sendMail({
      from: `"Ricoh International" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: `New Investment Interest — ${name}`,
      html: `
        <h2 style="color:#333">New Investment Inquiry</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:500px">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Fund Source</strong></td><td>${fundSource || '—'}</td></tr>
          <tr><td><strong>Investment Amount</strong></td><td>${amount || '—'}</td></tr>
          ${notes ? `<tr><td><strong>Notes</strong></td><td>${notes}</td></tr>` : ''}
        </table>
      `,
    })
    res.json({ success: true })
  } catch (err) {
    console.error('Mail error:', err)
    res.status(500).json({ success: false, message: 'Failed to send. Please try again.' })
  }
})

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
