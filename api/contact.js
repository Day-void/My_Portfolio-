import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message, company } = req.body || {};

  // Honeypot: real users never fill this field, since it's hidden from
  // sighted users and unreachable by keyboard. A bot that skips the React
  // form entirely and POSTs here directly will still fill every field it
  // sees, including this one. Return 200 (not an error) so it doesn't learn
  // its submission was rejected.
  if (company) return res.status(200).json({ ok: true });

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: "Message too long" });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: "maringisanwaday@gmail.com",
    replyTo: email,
    subject: `Message from ${name}`,
    text: `${message}\n\n---\nFrom: ${name} <${email}>`,
  });

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true });
}
