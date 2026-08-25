import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { PHASES } from "../data/steps";
import { CITATIONS } from "../data/citations";
import { GREY, INK, TINT, ULTRA_VIOLET, VIOLET, FONT_MONO, FONT_SERIF } from "../theme";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Home({ onSelectPhase, onLiterature }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ maxWidth: 920, margin: "0 auto", padding: "56px 24px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.14em", color: VIOLET, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}
      >
        NYU Orthopedic Trauma · Patient Care Pathway
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        style={{ fontFamily: FONT_SERIF, fontSize: 44, fontWeight: 600, margin: 0, color: INK, letterSpacing: "-0.01em", lineHeight: 1.1 }}
      >
        Hip Fracture, Step by Step
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        style={{ color: GREY, fontSize: 16, marginTop: 14, maxWidth: 560, lineHeight: 1.55 }}
      >
        What happens, when it happens, and why — for patients, families, and the team taking
        care of you. Choose a stage of care to see the timeline.
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginTop: 44 }}
      >
        {PHASES.map((p) => {
          const Icon = p.icon;
          return (
            <motion.button
              key={p.id}
              variants={item}
              onClick={() => onSelectPhase(p.id)}
              whileHover={{ y: -4, borderColor: VIOLET }}
              whileTap={{ scale: 0.98 }}
              style={{
                textAlign: "left",
                border: `1px solid ${TINT}`,
                borderRadius: 16,
                background: "#fff",
                padding: "28px 22px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                minHeight: 190,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${VIOLET}, ${ULTRA_VIOLET})` }} />
              <div>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: TINT, color: VIOLET, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon size={20} />
                </div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 21, color: INK, fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: 12, fontFamily: FONT_MONO, color: VIOLET, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>
                  {p.blurb}
                </div>
                <p style={{ fontSize: 13.5, color: GREY, marginTop: 10, lineHeight: 1.5 }}>{p.desc}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: VIOLET, marginTop: 16 }}>
                View timeline <ArrowRight size={14} />
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.button
        variants={item}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.3 }}
        onClick={onLiterature}
        whileHover={{ borderColor: VIOLET }}
        whileTap={{ scale: 0.99 }}
        style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18, padding: "16px 20px", width: "100%", border: `1px dashed ${TINT}`, borderRadius: 14, background: "#fff", cursor: "pointer", textAlign: "left" }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 9, background: TINT, color: VIOLET, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <BookOpen size={17} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: INK }}>The Literature, Over Time</div>
          <div style={{ fontSize: 12.5, color: GREY, marginTop: 2 }}>
            {Object.keys(CITATIONS).length} citations, 2002–2026 — how NYU's hip fracture research has evolved.
          </div>
        </div>
        <ArrowRight size={16} color={VIOLET} />
      </motion.button>
    </motion.div>
  );
}
