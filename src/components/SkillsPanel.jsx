import { Code2 } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { skillGroups } from "../data/content";

export const SkillsPanel = () => {
  return (
    <GlassPanel id="skills" title="My Skills" icon={Code2}>
      <p className="glass-panel-subtitle">
        The tools and technologies I use across my projects and coursework.
      </p>
      <div className="skill-groups">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul className="skill-chips">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};
