import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (message.length > 5000) {
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
