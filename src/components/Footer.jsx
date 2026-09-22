import { ArrowUp } from "lucide-react";

const YEAR = new Date().getFullYear();

export const Footer = () => (
  <footer className="site-footer">
    <a href="#home" className="site-footer-top">
      <ArrowUp size={14} aria-hidden="true" /> Back to top
    </a>
    <p>© {YEAR} Day Maringisanwa · Built with React &amp; Vite</p>
  </footer>
);
