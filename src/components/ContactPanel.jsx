import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { contact } from "../data/content";

export const ContactPanel = () => {
  return (
    <GlassPanel id="contact" title="Get In Touch" icon={Mail}>
      <p className="glass-panel-subtitle">
        Feel free to reach out — I'm always open to new opportunities and
        conversations.
      </p>
      <div className="contact-links">
        <a href={`mailto:${contact.email}`} className="contact-link">
          <Mail size={18} /> {contact.email}
        </a>
        <a href={contact.github} target="_blank" rel="noreferrer" className="contact-link">
          <FaGithub size={18} /> GitHub
        </a>
        <a href={contact.linkedin} target="_blank" rel="noreferrer" className="contact-link">
          <FaLinkedin size={18} /> LinkedIn
        </a>
      </div>
    </GlassPanel>
  );
};
