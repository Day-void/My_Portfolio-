import { BinaryWaveBackground } from "./components/BinaryWaveBackground";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { SkillsPanel } from "./components/SkillsPanel";
import { ProjectsPanel } from "./components/ProjectsPanel";
import { ResumePanel } from "./components/ResumePanel";
import { ContactPanel } from "./components/ContactPanel";
import "./App.css";

function App() {
  return (
    <div className="app">
      <BinaryWaveBackground />
      <Sidebar />
      <main className="app-content">
        <Hero />
        <SkillsPanel />
        <ProjectsPanel />
        <ResumePanel />
        <ContactPanel />
      </main>
    </div>
  );
}

export default App;
