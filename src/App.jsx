import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import PhasePage from "./pages/PhasePage";
import LiteraturePage from "./pages/LiteraturePage";
import { BG, FONT_BODY } from "./theme";

export default function App() {
  const [screen, setScreen] = useState({ page: "home" });

  return (
    <div style={{ fontFamily: FONT_BODY, background: BG, minHeight: "100vh" }}>
      <AnimatePresence mode="wait">
        {screen.page === "home" && (
          <Home
            key="home"
            onSelectPhase={(phaseId) => setScreen({ page: "phase", phaseId })}
            onLiterature={() => setScreen({ page: "literature" })}
          />
        )}
        {screen.page === "phase" && (
          <PhasePage key={`phase-${screen.phaseId}`} phaseId={screen.phaseId} onBack={() => setScreen({ page: "home" })} />
        )}
        {screen.page === "literature" && <LiteraturePage key="literature" onBack={() => setScreen({ page: "home" })} />}
      </AnimatePresence>
    </div>
  );
}
