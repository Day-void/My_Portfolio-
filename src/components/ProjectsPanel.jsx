import { useState } from "react";
import { FolderGit2, Github, ExternalLink, Layers } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { projects, projectCategories } from "../data/content";

const ALL = "All";

// Every field except `title` and `description` is optional — anything missing is skipped.
const ProjectCard = ({ title, status, stack = [], description, role, note, image, imageAlt, live, repo }) => {
  return (
    <article className="project-tile">
      {image ? (
        <img
          src={image}
          alt={imageAlt || `Screenshot of ${title}`}
          className="project-tile-image"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="project-tile-icon">
          <Layers size={24} aria-hidden="true" />
        </div>
      )}

      <h3>
        {title}
        {status && <span className="project-tile-status">{status}</span>}
      </h3>

      {stack.length > 0 && (
        <ul className="project-tile-stack" aria-label={`${title} technologies`}>
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      )}

      {role && <p className="project-tile-role">{role}</p>}
      <p>{description}</p>

      {(live || repo) && (
        <div className="project-tile-links">
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className="project-tile-link">
              <ExternalLink size={16} aria-hidden="true" /> Live demo
            </a>
          )}
          {repo && (
            <a href={repo} target="_blank" rel="noreferrer" className="project-tile-link">
              <Github size={16} aria-hidden="true" /> Code
            </a>
          )}
        </div>
      )}

      {note && <p className="project-tile-note">{note}</p>}
    </article>
  );
};

export const ProjectsPanel = () => {
  const [activeFilter, setActiveFilter] = useState(ALL);

  // Only offer categories that at least one project actually uses,
  // in the order defined in content.js.
  const filters = projectCategories.filter((category) =>
    projects.some((project) => project.categories?.includes(category))
  );

  // A filter bar with a single option would be pointless, so hide it.
  const showFilters = filters.length >= 2;

  const visibleProjects =
    activeFilter === ALL
      ? projects
      : projects.filter((project) => project.categories?.includes(activeFilter));

  return (
    <GlassPanel id="projects" title="My Projects" icon={FolderGit2}>
      <p className="glass-panel-subtitle">A collection of my recent projects.</p>

      {showFilters && (
        <div className="project-filters" role="group" aria-label="Filter projects by category">
          {[ALL, ...filters].map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-chip ${activeFilter === filter ? "filter-chip--active" : ""}`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Announces the result of a filter change to screen readers */}
      <p className="sr-only" role="status" aria-live="polite">
        Showing {visibleProjects.length} project{visibleProjects.length === 1 ? "" : "s"}
        {activeFilter === ALL ? "" : ` in ${activeFilter}`}
      </p>

      <div className="project-grid">
        {/* key includes the filter so cards replay their entrance animation when it changes */}
        {visibleProjects.map((project) => (
          <ProjectCard key={`${activeFilter}-${project.title}`} {...project} />
        ))}
      </div>
    </GlassPanel>
  );
};
