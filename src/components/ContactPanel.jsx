import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Github, Linkedin, Send, Loader2 } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { contact } from "../data/content";
import { useRateLimiter } from "../hooks/useRateLimiter";
import { validateEmail } from "../utils/emailValidation";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const STATUS = {
  IDLE: "idle",
  SENDING: "sending",
  SENT: "sent",
  ERROR: "error",
};

export const ContactPanel = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState(""); // bots fill this, humans never see it
  const [status, setStatus] = useState(STATUS.IDLE);
  const [emailError, setEmailError] = useState(null);

  // Max 3 submissions per 5 minutes, tracked per browser.
  const { isLimited, remaining, retryAfterMs, attempt } = useRateLimiter({
    maxAttempts: 3,
    windowMs: 5 * 60_000,
    storageKey: "contactFormRateLimiter",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "email") setEmailError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot tripped — a bot filled a field real users never see.
    // Silently drop it; no need to tell a bot it failed.
    if (honeypot) {
      return;
    }

    const emailIssue = validateEmail(form.email);
    if (emailIssue) {
      setEmailError(emailIssue);
      return;
    }

    if (!attempt()) {
      setStatus(STATUS.ERROR);
      return;
    }

    setStatus(STATUS.SENDING);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus(STATUS.SENT);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus(STATUS.ERROR);
    }
  };

  const minutesLeft = Math.ceil(retryAfterMs / 60_000);

  return (
    <GlassPanel id="contact" title="Get In Touch" icon={Mail}>
      <p className="glass-panel-subtitle">
        Feel free to reach out — I'm always open to new opportunities and
        conversations.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Honeypot — hidden from real users via CSS, bots fill every field they see */}
        <input
          type="text"
          name="company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="contact-honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={status === STATUS.SENDING}
        />
        <div className="contact-field">
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={status === STATUS.SENDING}
          />
          {emailError && <p className="contact-field-error">{emailError}</p>}
        </div>
        <textarea
          name="message"
          placeholder="Your message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          required
          disabled={status === STATUS.SENDING}
        />

        <button
          type="submit"
          className="contact-submit"
          disabled={status === STATUS.SENDING || isLimited}
        >
          {status === STATUS.SENDING ? (
            <>
              <Loader2 size={16} className="spin" /> Sending...
            </>
          ) : (
            <>
              <Send size={16} /> Send Message
            </>
          )}
        </button>

        {status === STATUS.SENT && (
          <p className="contact-status contact-status-success">
            Message sent — thanks for reaching out!
          </p>
        )}
        {status === STATUS.ERROR && isLimited && (
          <p className="contact-status contact-status-error">
            Too many messages sent. Try again in about {minutesLeft} minute
            {minutesLeft === 1 ? "" : "s"}.
          </p>
        )}
        {status === STATUS.ERROR && !isLimited && (
          <p className="contact-status contact-status-error">
            Something went wrong — please try again or email me directly.
          </p>
        )}
        {status === STATUS.IDLE && !isLimited && (
          <p className="contact-status-hint">
            {remaining} message{remaining === 1 ? "" : "s"} left this window
          </p>
        )}
      </form>

      <div className="contact-links">
        <a href={`mailto:${contact.email}`} className="contact-link">
          <Mail size={18} /> {contact.email}
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer" className="contact-link">
          <Github size={18} /> GitHub
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" className="contact-link">
          <Linkedin size={18} /> LinkedIn
        </a>
      </div>
    </GlassPanel>
  );
};
