import { motion } from "framer-motion";
import { ArrowRight, Landmark, Microscope } from "lucide-react";
import { GREY, INK, TINT, ULTRA_VIOLET, VIOLET, FONT_MONO, FONT_SERIF } from "../theme";

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function LiteratureLanding({ historicYears, currentYears, onSelect }) {
  const cards = [
    {
      id: "historic",
      icon: Landmark,
      label: "Historic NYU Literature",
      blurb: historicYears ? `${historicYears[0]}–${historicYears[1]}` : "Pre-2002",
      desc: "Earlier NYU Hospital for Joint Diseases publications that laid the groundwork for today's hip fracture protocols.",
      count: historicYears ? historicYears[2] : 0,
    },
    {
      id: "current",
      icon: Microscope,
      label: "Current Guidance & Research",
      blurb: currentYears ? `${currentYears[0]}–${currentYears[1]}` : "",
      desc: "The active, cited evidence base behind every step in this pathway — from admission labs to discharge planning.",
      count: currentYears ? currentYears[2] : 0,
    },
  ];

  return (
    <div>
      <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.14em", color: VIOLET, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>
        NYU Hospital for Joint Diseases · NYU Langone Orthopedic Center
      </div>
      <h1 style={{ fontFamily: FONT_SERIF, fontSize: 30, fontWeight: 600, margin: "0 0 10px 0", color: INK }}>The Literature, Over Time</h1>
      <p style={{ fontSize: 14, color: GREY, lineHeight: 1.55, marginBottom: 36, maxWidth: 620 }}>
        Two collections: the current, cited evidence base behind this pathway, and older NYU publications kept here for
        historical context. Pick one to browse by year.
      </p>

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}
      >
        {cards.map((c) => {
          const Icon = c.icon;
          const disabled = c.count === 0;
          return (
            <motion.button
              key={c.id}
              variants={item}
              onClick={() => !disabled && onSelect(c.id)}
              whileHover={disabled ? {} : { y: -4, borderColor: VIOLET }}
              whileTap={disabled ? {} : { scale: 0.98 }}
              style={{
                textAlign: "left",
                border: `1px solid ${TINT}`,
                borderRadius: 16,
                background: "#fff",
                padding: "26px 22px",
                cursor: disabled ? "default" : "pointer",
                opacity: disabled ? 0.6 : 1,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 180,
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${VIOLET}, ${ULTRA_VIOLET})` }} />
              <div>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: TINT, color: VIOLET, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon size={19} />
                </div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 19, color: INK, fontWeight: 600 }}>{c.label}</div>
                <div style={{ fontSize: 11.5, fontFamily: FONT_MONO, color: VIOLET, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>
                  {c.blurb} · {c.count} citation{c.count === 1 ? "" : "s"}
                </div>
                <p style={{ fontSize: 13, color: GREY, marginTop: 10, lineHeight: 1.5 }}>{c.desc}</p>
              </div>
              {!disabled && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: VIOLET, marginTop: 14 }}>
                  Browse by year <ArrowRight size={14} />
                </div>
              )}
              {disabled && <div style={{ fontSize: 12, color: GREY, marginTop: 14, fontStyle: "italic" }}>Coming soon</div>}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
