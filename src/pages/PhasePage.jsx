import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PHASES, STEPS } from "../data/steps";
import TimelineRow from "../components/TimelineRow";
import DetailCard from "../components/DetailCard";
import { GREY, INK, TINT, VIOLET, FONT_MONO, FONT_SERIF } from "../theme";

export default function PhasePage({ phaseId, onBack }) {
  const [majorIndex, setMajorIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  const phase = PHASES.find((p) => p.id === phaseId);
  const steps = STEPS[phaseId];
  const major = steps[majorIndex];
  const hasSubs = Boolean(major.subSteps);
  const detailItem = hasSubs ? major.subSteps[subIndex] : major;

  const selectMajor = (i) => {
    setMajorIndex(i);
    setSubIndex(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px" }}
    >
      <motion.button
        onClick={onBack}
        whileHover={{ x: -3 }}
        style={{ display: "flex", alignItems: "center", gap: 4, border: "none", background: "none", color: VIOLET, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20, padding: 0 }}
      >
        <ChevronLeft size={15} /> All stages
      </motion.button>

      <div style={{ fontSize: 12, fontFamily: FONT_MONO, color: VIOLET, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
        {phase.blurb}
      </div>
      <h1 style={{ fontFamily: FONT_SERIF, fontSize: 30, fontWeight: 600, margin: "0 0 28px 0", color: INK }}>{phase.label}</h1>

      <div style={{ background: "#fff", border: `1px solid ${TINT}`, borderRadius: 14, padding: "26px 22px" }}>
        <TimelineRow items={steps} activeIndex={majorIndex} onSelect={selectMajor} size="lg" />

        <AnimatePresence initial={false}>
          {hasSubs && (
            <motion.div
              key={major.title}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ marginTop: 26, paddingTop: 20, borderTop: `1px dashed ${TINT}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
                  {major.title} — breakdown
                </div>
                <TimelineRow items={major.subSteps} activeIndex={subIndex} onSelect={setSubIndex} size="sm" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DetailCard item={detailItem} />

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          {majorIndex < steps.length - 1 && (
            <motion.button
              onClick={() => selectMajor(majorIndex + 1)}
              whileHover={{ x: 3 }}
              style={{ display: "flex", alignItems: "center", gap: 4, border: "none", background: "none", color: VIOLET, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Next: {steps[majorIndex + 1].title} <ChevronRight size={15} />
            </motion.button>
          )}
        </div>
      </div>

      <p style={{ fontSize: 12, color: GREY, marginTop: 18, lineHeight: 1.5 }}>
        Prototype only — steps, explanations, and diagrams are placeholders to demonstrate the concept. Citations
        shown are real, verified papers, but a couple of evidence tags still say "not yet identified" — flag those
        and I'll search further, or send the paper you have in mind.
      </p>
    </motion.div>
  );
}
