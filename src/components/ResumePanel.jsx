import { GraduationCap, Briefcase, Download, FileText } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { experience, education } from "../data/content";

export const ResumePanel = () => {
  return (
    <GlassPanel id="resume" title="Resume" icon={FileText}>
      <div className="resume-columns">
        <div>
          <h3 className="resume-subheading">
            <Briefcase size={18} aria-hidden="true" /> Experience
          </h3>
          {experience.map((item) => (
            <div className="resume-entry" key={item.role}>
              <h4>{item.role}</h4>
              {(item.organisation || item.period) && (
                <span>{[item.organisation, item.period].filter(Boolean).join(" · ")}</span>
              )}
              <p>{item.detail}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="resume-subheading">
            <GraduationCap size={18} aria-hidden="true" /> Education
          </h3>
          {education.map((item) => (
            <div className="resume-entry" key={item.title}>
              <h4>{item.title}</h4>
              <span>{item.period}</span>
              {item.detail && <p>{item.detail}</p>}
            </div>
          ))}
        </div>
      </div>

      <a href="/Day_Maringisanwa_CV.pdf" download className="btn btn-outline resume-download">
        Download Full CV <Download size={16} aria-hidden="true" />
      </a>
    </GlassPanel>
  );
};
