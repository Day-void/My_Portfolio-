import { Code2 } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { useOnScreen } from "../hooks/useOnScreen";
import { skills } from "../data/content";

const SkillBar = ({ name, level, animate }) => (
  <div className="skill-bar">
    <div className="skill-bar-label">
      <span>{name}</span>
      <span>{level}%</span>
    </div>
    <div className="skill-bar-track">
      <div
        className="skill-bar-fill"
        style={{ width: animate ? `${level}%` : "0%" }}
      />
    </div>
  </div>
);

export const SkillsPanel = () => {
  const [listRef, isVisible] = useOnScreen({ threshold: 0.3 });

  return (
    <GlassPanel id="skills" title="My Skills" icon={Code2}>
      <p className="glass-panel-subtitle">
        A snapshot of what I've picked up through self-directed study and
        hands-on project work.
      </p>
      <div className="skill-bar-list" ref={listRef}>
        {skills.map((skill) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            animate={isVisible}
          />
        ))}
      </div>
    </GlassPanel>
  );
};
