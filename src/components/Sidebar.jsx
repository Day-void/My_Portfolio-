import { Home, Code2, FolderGit2, GraduationCap, Mail } from "lucide-react";
import { useActiveSection } from "../hooks/useActiveSection";

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "projects", icon: FolderGit2, label: "Projects" },
  { id: "resume", icon: GraduationCap, label: "Resume" },
  { id: "contact", icon: Mail, label: "Contact" },
];

const sectionIds = navItems.map((item) => item.id);

export const Sidebar = () => {
  const activeId = useActiveSection(sectionIds);

  return (
    <nav className="sidebar">
      <ul className="sidebar-list">
        {navItems.map(({ id, icon: Icon, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`sidebar-link ${activeId === id ? "sidebar-link--active" : ""}`}
              aria-label={label}
              title={label}
            >
              <Icon size={20} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
