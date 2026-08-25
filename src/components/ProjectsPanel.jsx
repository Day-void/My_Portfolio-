import { FaGithub } from "react-icons/fa";
import { FolderGit2, Activity } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { projects } from "../data/content";

const ProjectCard = ({ title, tech, description, url }) => (
  <div className="project-tile">
    <div className="project-tile-icon">
      <Activity size={26} />
    </div>
    <h3>{title}</h3>
    <span className="project-tile-tag">{tech}</span>
    <p>{description}</p>
    {url ? (
      <a href={url} target="_blank" rel="noreferrer" className="project-tile-link">
        <FaGithub size={16} /> View on GitHub
      </a>
    ) : (
      <span className="project-tile-link project-tile-link--disabled">
        Not yet deployed
      </span>
    )}
  </div>
);

export const ProjectsPanel = () => {
  return (
    <GlassPanel id="projects" title="My Portfolio" icon={FolderGit2}>
      <p className="glass-panel-subtitle">A collection of my recent projects.</p>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </GlassPanel>
  );
};
