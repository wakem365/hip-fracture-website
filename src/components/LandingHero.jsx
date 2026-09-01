import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import buildingImg from "../assets/landing/nyu-loh-banners.webp";
import logoImg from "../assets/brand/nyu-langone-orthopedics-logo.png";
import { FONT_MONO, FONT_SERIF } from "../theme";

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// Splits a title into words so each can stagger in on load — reads as more
// deliberate than a single fade for a hero this large.
function StaggeredTitle({ text, style }) {
  const words = text.split(" ");
  return (
    <motion.h1
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.09, delayChildren: 0.35 }}
      style={{ margin: 0, ...style }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={wordVariants} style={{ display: "inline-block", marginRight: "0.28em" }}>
          {w}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function LandingHero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Spring-smoothed scroll progress gives the exit a slight elastic
  // "settle" rather than tracking the scrollbar 1:1.
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.4 });

  const contentOpacity = useTransform(smooth, [0, 0.6], [1, 0]);
  const contentY = useTransform(smooth, [0, 1], [0, -120]);
  const imageScale = useTransform(smooth, [0, 1], [1, 1.18]);
  const overlayOpacity = useTransform(smooth, [0, 1], [0.68, 0.92]);
  const cueOpacity = useTransform(smooth, [0, 0.25], [1, 0]);

  return (
    <div ref={sectionRef} style={{ position: "relative", height: "100vh", overflow: "hidden", background: "#000" }}>
      <motion.img
        src={buildingImg}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 20%",
          scale: imageScale,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(15,8,22,0.55) 0%, rgba(15,8,22,0.5) 45%, rgba(15,8,22,0.88) 100%)",
          opacity: overlayOpacity,
        }}
      />

      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "12px 16px",
            boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
            marginBottom: 30,
          }}
        >
          <img src={logoImg} alt="NYU Langone Orthopedics" style={{ display: "block", height: 68, width: "auto" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            fontFamily: FONT_MONO,
            fontSize: 12.5,
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.85)",
            textTransform: "uppercase",
            marginBottom: 14,
            fontWeight: 600,
          }}
        >
          NYU Orthopedic Trauma · Patient Care Pathway
        </motion.div>

        <StaggeredTitle
          text="Hip Fracture, Step by Step"
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "clamp(38px, 6.5vw, 72px)",
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "-0.01em",
            lineHeight: 1.08,
            textWrap: "balance",
            maxWidth: 900,
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          style={{ color: "rgba(255,255,255,0.88)", fontSize: 17, marginTop: 20, maxWidth: 560, lineHeight: 1.55 }}
        >
          What happens, when it happens, and why — for patients, families, and the team taking
          care of you.
        </motion.p>
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 28,
          transform: "translateX(-50%)",
          zIndex: 1,
          opacity: cueOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          color: "rgba(255,255,255,0.75)",
        }}
      >
        <span style={{ fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </div>
  );
}
