import { Download, MapPin } from "lucide-react";
import { useTypewriter } from "../hooks/useTypewriter";
import { heroRoles, profile } from "../data/content";

export const Hero = () => {
  const roleText = useTypewriter(heroRoles);

  return (
    <section id="home" className="hero">
      <div className="hero-avatar">
        <div className="hero-avatar-ring">
          <div className="hero-avatar-inner">
            <img
              src="/profile-photo.webp"
              alt="Day Maringisanwa"
              className="hero-avatar-img"
              width="480"
              height="480"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <h1>
        <span className="hero-name">Day Maringisanwa</span> is a Software Developer
      </h1>
      <p className="hero-role">
        Based in Harare, Zimbabwe — <span className="hero-typed">{roleText}</span>
        <span className="hero-cursor" aria-hidden="true">|</span>
      </p>
      <p className="hero-bio">
        Day Maringisanwa builds secure, user-focused web products with React, Next.js, and Supabase.
        {" "}
        {profile.bio}
      </p>
      <p className="hero-meta">
        <MapPin size={14} aria-hidden="true" />
        <span>
          {profile.location} · {profile.availability}
        </span>
      </p>

      <div className="hero-actions">
        <a href="#projects" className="btn btn-primary">
          View My Work
        </a>
        <a href="/Day_Maringisanwa_CV.pdf" download className="btn btn-outline">
          Download CV <Download size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
