import { GraduationCap, Briefcase, Download } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { experience, education } from "../data/content";

export const ResumePanel = () => {
  return (
    <GlassPanel id="resume" title="Resume" icon={GraduationCap}>
      <div className="resume-columns">
        <div>
          <h3 className="resume-subheading">
            <Briefcase size={18} /> Experience
          </h3>
          {experience.map((item) => (
            <div className="resume-entry" key={item.role}>
              <h4>{item.role}</h4>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="resume-subheading">
            <GraduationCap size={18} /> Education
          </h3>
          {education.map((item) => (
            <div className="resume-entry" key={item.title}>
              <h4>{item.title}</h4>
              <span>{item.period}</span>
            </div>
          ))}
        </div>
      </div>

      <a href="/Day_Maringisanwa_CV.pdf" download className="btn btn-outline resume-download">
        Download Full CV <Download size={16} />
      </a>
    </GlassPanel>
  );
};
