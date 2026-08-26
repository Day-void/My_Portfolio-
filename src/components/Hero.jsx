import { Download } from "lucide-react";
import { useTypewriter } from "../hooks/useTypewriter";

export const Hero = () => {
  const roleText = useTypewriter([
    "A Software Developer",
    "A React Developer",
    "A Self-Directed Learner",
  ]);

  return (
    <section id="home" className="hero">
      <div className="hero-avatar">
        <div className="hero-avatar-ring">
          <div className="hero-avatar-inner">
            <img src="/profile-photo.jpg" alt="Day Maringisanwa" className="hero-avatar-img" />
          </div>
        </div>
      </div>

      <h1>
        Hi, I'm <span className="hero-name">Day Maringisanwa</span>
      </h1>
      <p className="hero-role">
        I'm <span className="hero-typed">{roleText}</span>
        <span className="hero-cursor">|</span>
      </p>
      <p className="hero-bio">
        Adaptable and self-directed, with a practical, results-focused approach
        to software engineering. I pick up new tools quickly and combine
        independent study with hands-on project work.
      </p>

      <div className="hero-actions">
        <a href="#projects" className="btn btn-primary">
          View My Work
        </a>
        <a href="/Day_Maringisanwa_CV.pdf" download target="_blank" rel="noreferrer" className="btn btn-outline">
          Download CV <Download size={16} />
        </a>
      </div>
    </section>
  );
};
