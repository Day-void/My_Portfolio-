import { BinaryWaveBackground } from "./components/BinaryWaveBackground";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { SkillsPanel } from "./components/SkillsPanel";
import { ProjectsPanel } from "./components/ProjectsPanel";
import { ResumePanel } from "./components/ResumePanel";
import { ContactPanel } from "./components/ContactPanel";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <BinaryWaveBackground />
      <Sidebar />
      <main id="main" className="app-content">
        <Hero />
        <SkillsPanel />
        <ProjectsPanel />
        <ResumePanel />
        <ContactPanel />
        <Footer />
      </main>
    </div>
  );
}

export default App;
