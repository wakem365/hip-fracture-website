import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { PHASES } from "../data/steps";
import { CITATIONS } from "../data/citations";
import preOpImg from "../assets/hero/pre-op.webp";
import intraOpImg from "../assets/hero/intra-op.png";
import postOpImg from "../assets/hero/post-op.webp";
import LandingHero from "../components/LandingHero";
import { ULTRA_VIOLET, VIOLET, FONT_MONO, FONT_SERIF } from "../theme";

const HERO_IMAGES = {
  pre: preOpImg,
  intra: intraOpImg,
  post: postOpImg,
};

// Each panel's image/overlay/caption reads its "rest" vs "hover" look from
// this shared variant map, driven by the parent button's whileHover — no
// per-child hover state needed.
const imgVariants = {
  rest: { scale: 1, filter: "grayscale(45%) brightness(0.72)" },
  hover: { scale: 1.06, filter: "grayscale(0%) brightness(1)" },
};
const overlayVariants = {
  rest: { opacity: 1 },
  hover: { opacity: 0 },
};
const cueVariants = {
  rest: { opacity: 0, y: 6 },
  hover: { opacity: 1, y: 0 },
};

function HeroPanel({ phase, onSelect }) {
  const Icon = phase.icon;
  return (
    <motion.button
      onClick={() => onSelect(phase.id)}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.99 }}
      animate="rest"
      style={{
        position: "relative",
        overflow: "hidden",
        border: "none",
        padding: 0,
        margin: 0,
        display: "block",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        background: "#000",
        textAlign: "left",
      }}
    >
      <motion.img
        src={HERO_IMAGES[phase.id]}
        alt=""
        variants={imgVariants}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <motion.div
        variants={overlayVariants}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(15,10,20,0.25) 0%, rgba(15,10,20,0.6) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 22,
          left: 22,
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "rgba(255,255,255,0.16)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={19} />
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 26px 30px", color: "#fff" }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.85 }}>
          {phase.blurb}
        </div>
        <div style={{ fontFamily: FONT_SERIF, fontSize: 28, fontWeight: 600, marginTop: 6, lineHeight: 1.1, textWrap: "balance" }}>
          {phase.label}
        </div>
        <motion.div
          variants={cueVariants}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, marginTop: 12 }}
        >
          View timeline <ArrowRight size={14} />
        </motion.div>
      </div>
    </motion.button>
  );
}

export default function Home({ onSelectPhase, onLiterature }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <style>{`
        .hero-grid { display: grid; grid-template-columns: repeat(3, 1fr); height: 64vh; min-height: 420px; }
        @media (max-width: 820px) {
          .hero-grid { grid-template-columns: 1fr; height: auto; }
          .hero-grid > * { height: 46vh; min-height: 320px; }
        }
      `}</style>

      <LandingHero />

      <motion.div
        className="hero-grid"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {PHASES.map((p) => (
          <HeroPanel key={p.id} phase={p} onSelect={onSelectPhase} />
        ))}
      </motion.div>

      <motion.button
        onClick={onLiterature}
        whileHover={{ filter: "brightness(1.08)" }}
        whileTap={{ scale: 0.995 }}
        style={{
          display: "block",
          width: "100%",
          border: "none",
          padding: "26px 24px",
          background: `linear-gradient(90deg, ${VIOLET}, ${ULTRA_VIOLET})`,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, maxWidth: 920, margin: "0 auto" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(255,255,255,0.18)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BookOpen size={19} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15.5, fontWeight: 600, color: "#fff", fontFamily: FONT_SERIF }}>The Literature, Over Time</div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>
              {Object.keys(CITATIONS).length} citations, 2002–2026 — how NYU's hip fracture research has evolved.
            </div>
          </div>
          <ArrowRight size={18} color="#fff" />
        </div>
      </motion.button>
    </motion.div>
  );
}
