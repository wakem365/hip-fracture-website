import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import PhasePage from "./pages/PhasePage";
import LiteraturePage from "./pages/LiteraturePage";
import SurveyWidget from "./components/SurveyWidget";
import { BG, FONT_BODY } from "./theme";

export default function App() {
  const [screen, setScreen] = useState({ page: "home" });

  // Returning from a phase or the literature page lands back on the
  // three-category picker, not a replay of the full-screen landing hero.
  const backToCategories = () => setScreen({ page: "home", skipHero: true });

  return (
    <div style={{ fontFamily: FONT_BODY, background: BG, minHeight: "100vh" }}>
      <AnimatePresence mode="wait">
        {screen.page === "home" && (
          <Home
            key="home"
            skipHero={Boolean(screen.skipHero)}
            onSelectPhase={(phaseId) => setScreen({ page: "phase", phaseId })}
            onLiterature={() => setScreen({ page: "literature" })}
          />
        )}
        {screen.page === "phase" && (
          <PhasePage key={`phase-${screen.phaseId}`} phaseId={screen.phaseId} onBack={backToCategories} />
        )}
        {screen.page === "literature" && <LiteraturePage key="literature" onBack={backToCategories} />}
      </AnimatePresence>
      <SurveyWidget />
    </div>
  );
}
