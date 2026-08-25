import { motion } from "framer-motion";
import { AMBER } from "../theme";

// Schematic fracture-line diagram (NOT a real radiograph).
// Swap point for real de-identified radiographs later: replace this
// component's render with an <img> keyed by `type`, or branch on a
// `useSchematic` flag — callers only pass `type`, so no other component
// needs to change.
const LINES = {
  fnf: { y1: 54, y2: 50, dash: "4 3" },
  basicervical: { y1: 70, y2: 60, dash: "0" },
  it: { y1: 88, y2: 82, dash: "4 3" },
  subtroch: { y1: 112, y2: 108, dash: "4 3" },
};

export default function FemurSchematic({ type }) {
  const line = LINES[type];
  return (
    <svg viewBox="0 0 160 240" width="120" height="180" style={{ flexShrink: 0 }}>
      <path
        d="M 95 12 C 110 12 120 24 118 38 C 117 46 110 52 100 55 C 118 60 132 66 134 80 C 136 92 128 100 112 104 C 100 106 90 100 86 92 C 82 100 70 104 66 104 L 70 230 L 100 230 L 104 104 C 108 96 100 66 90 56 C 78 52 70 44 70 34 C 70 20 80 12 95 12 Z"
        fill="#F1EAF7"
        stroke="#C7B3DA"
        strokeWidth="2"
      />
      <motion.line
        x1={40}
        x2={140}
        y1={line.y1}
        y2={line.y1}
        animate={{ y1: line.y1, y2: line.y2 }}
        initial={false}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        stroke={AMBER}
        strokeWidth="3"
        strokeDasharray={line.dash}
      />
      {type === "basicervical" && (
        <line x1={40} y1={line.y1 + 5} x2={140} y2={line.y2 + 5} stroke={AMBER} strokeWidth="2" strokeDasharray="2 3" opacity="0.6" />
      )}
    </svg>
  );
}
