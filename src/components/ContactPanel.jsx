import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Github, Linkedin, MessageCircle, Send, Loader2 } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { contact } from "../data/content";
import { useRateLimiter } from "../hooks/useRateLimiter";
import { validateEmail } from "../utils/emailValidation";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const IS_EMAILJS_CONFIGURED = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
);

const STATUS = {
  IDLE: "idle",
  SENDING: "sending",
  SENT: "sent",
  ERROR: "error",
};

// Coarse on purpose: the text changes once a minute, so screen readers
// aren't interrupted by a per-second countdown.
const formatRetry = (ms) => {
  const minutes = Math.ceil(ms / 60_000);
  if (minutes <= 1) return "a minute";
  return `${minutes} minutes`;
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
    // Editing after a result clears the old message.
    if (status === STATUS.SENT || status === STATUS.ERROR) setStatus(STATUS.IDLE);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot tripped: a bot filled a field real people never see. The field
    // has an unusual name so browser autofill won't touch it. We show the
    // generic error rather than a fake success, so the rare real person who
    // trips it knows to email directly instead of waiting on a reply.
    if (honeypot) {
      setStatus(STATUS.ERROR);
      return;
    }

    const emailIssue = validateEmail(form.email);
    if (emailIssue) {
      setEmailError(emailIssue);
      return;
    }

    if (!IS_EMAILJS_CONFIGURED) {
      console.error("EmailJS is not configured — copy .env.example to .env and fill it in.");
      setStatus(STATUS.ERROR);
      return;
    }

    // Blocked: the limit message below explains why.
    if (!attempt()) return;

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

  let feedback = null;
  if (status === STATUS.SENT) {
    feedback = (
      <p className="contact-status contact-status-success">
        Message sent — thanks for reaching out!
      </p>
    );
  } else if (isLimited) {
    feedback = (
      <p className="contact-status contact-status-error">
        You've sent a few messages already. Please try again in about{" "}
        {formatRetry(retryAfterMs)}, or email me directly.
      </p>
    );
  } else if (status === STATUS.ERROR) {
    feedback = (
      <p className="contact-status contact-status-error">
        Something went wrong — please try again or email me at{" "}
        <a href={`mailto:${contact.email}`} className="contact-inline-link">
          {contact.email}
        </a>
        .
      </p>
    );
  } else if (remaining === 1) {
    feedback = <p className="contact-status-hint">You can send 1 more message right now.</p>;
  }

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
          name="contact_me_by_fax_only"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="contact-honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="contact-field">
          <label htmlFor="contact-name" className="sr-only">
            Your name
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            maxLength={100}
            required
            disabled={status === STATUS.SENDING}
          />
        </div>

        <div className="contact-field">
          <label htmlFor="contact-email" className="sr-only">
            Your email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={emailError ? "true" : undefined}
            aria-describedby={emailError ? "contact-email-error" : undefined}
            disabled={status === STATUS.SENDING}
          />
          {emailError && (
            <p id="contact-email-error" role="alert" className="contact-field-error">
              {emailError}
            </p>
          )}
        </div>

        <div className="contact-field">
          <label htmlFor="contact-message" className="sr-only">
            Your message
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Your message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            maxLength={2000}
            required
            disabled={status === STATUS.SENDING}
          />
        </div>

        <button
          type="submit"
          className="contact-submit"
          disabled={status === STATUS.SENDING || isLimited}
        >
          {status === STATUS.SENDING ? (
            <>
              <Loader2 size={16} className="spin" aria-hidden="true" /> Sending...
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" /> Send Message
            </>
          )}
        </button>

        <div role="status" aria-live="polite" className="contact-feedback">
          {feedback}
        </div>
      </form>

      <div className="contact-links">
        <a href={`mailto:${contact.email}`} className="contact-link">
          <Mail size={18} aria-hidden="true" /> {contact.email}
        </a>
        <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="contact-link">
          <MessageCircle size={18} aria-hidden="true" /> WhatsApp
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer" className="contact-link">
          <Github size={18} aria-hidden="true" /> GitHub
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" className="contact-link">
          <Linkedin size={18} aria-hidden="true" /> LinkedIn
        </a>
      </div>
    </GlassPanel>
  );
};
