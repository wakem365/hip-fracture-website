import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import EvidenceDropdown from "./EvidenceDropdown";
import { INK, GREY, TINT, VIOLET, FONT_MONO, FONT_SERIF } from "../theme";

const POINTS = [
  {
    title: "The Broken Bone Can't Hold Your Weight",
    body: "Most hip fractures leave the bone too broken to hold you up on its own. Without surgery to hold the pieces together, they keep shifting every time you try to stand or even move in bed — so the bone can't heal, and the pain never really goes away.",
  },
  {
    title: "Staying in Bed Is the Real Danger",
    body: "Without surgery, most patients are stuck in bed. For an older adult, lying in bed for a long time sharply raises the risk of blood clots, pneumonia, bedsores, fast muscle loss, and confusion — problems that build on each other quickly and get harder to fix the longer they go on.",
  },
  {
    title: "Left Untreated, It Can Be Life-Threatening",
    body: "Even with today's medical care, a hip fracture is a serious, sometimes life-threatening injury. NYU's own research on a large group of patients shows that waiting too long for surgery — or skipping it altogether — raises that risk even further. Getting patients safely and quickly to surgery is the single biggest thing the care team can do to protect you.",
  },
];

const evidenceItem = {
  citations: [
    "paksima2008",
    "penrod2008",
    "mortality_trends_nys",
    "inpatient_mortality_million",
    "hip_attack",
    "ambulation_pod1",
  ],
};

export default function WhySurgerySection({ onScrollNext }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.4 });

  // Same scroll-linked fade/float treatment as the landing hero, so the
  // content visually "leaves" the same way as you scroll into the next
  // section rather than just cutting off.
  const contentOpacity = useTransform(smooth, [0, 0.7], [1, 0]);
  const contentY = useTransform(smooth, [0, 1], [0, -80]);
  const cueOpacity = useTransform(smooth, [0, 0.25], [1, 0]);

  return (
    <div
      ref={sectionRef}
      className="why-surgery-section"
      style={{
        background: TINT,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "64px 24px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <motion.div style={{ maxWidth: 920, margin: "0 auto", width: "100%", opacity: contentOpacity, y: contentY }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.14em", color: VIOLET, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>
          The Case for Surgery
        </div>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 600, margin: 0, color: INK, letterSpacing: "-0.01em", lineHeight: 1.15, textWrap: "balance" }}>
          Why Hip Fracture Surgery Can't Wait
        </h2>
        <p style={{ color: GREY, fontSize: 15.5, marginTop: 14, maxWidth: 680, lineHeight: 1.55 }}>
          Skipping surgery isn't a lower-risk alternative — for most hip fractures, it's the more dangerous path. Here's
          why the care team moves toward the operating room, not away from it.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 28 }}>
          {POINTS.map((pt) => (
            <div
              key={pt.title}
              style={{
                background: VIOLET,
                padding: "20px 26px",
              }}
            >
              <div style={{ fontFamily: FONT_SERIF, fontSize: 17.5, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{pt.title}</div>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.88)", lineHeight: 1.5, margin: 0, maxWidth: 720 }}>{pt.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, maxWidth: 500 }}>
          <EvidenceDropdown item={evidenceItem} />
        </div>

        <motion.button
          onClick={onScrollNext}
          aria-label="Scroll to the three stages of care"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            margin: "32px auto 0",
            color: VIOLET,
            background: "none",
            border: "none",
            padding: 8,
            cursor: "pointer",
            opacity: cueOpacity,
          }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}
