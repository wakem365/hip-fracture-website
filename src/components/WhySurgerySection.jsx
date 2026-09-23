import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import EvidenceDropdown from "./EvidenceDropdown";
import { INK, GREY, TINT, VIOLET, FONT_MONO, FONT_SERIF } from "../theme";

const POINTS = [
  {
    title: "It's an Unstable Fracture",
    body: "Most hip fractures — displaced femoral neck, intertrochanteric, subtrochanteric — can't bear weight on their own. Without fixation, the fragments keep moving under normal loading: every attempt to stand or shift in bed re-injures the site, so the fracture can't heal and the pain never settles.",
  },
  {
    title: "Immobility Is the Real Danger",
    body: "An unfixed hip fracture leaves a patient essentially bedbound. Prolonged bed rest in an older adult sharply raises the risk of blood clots (DVT/PE), pneumonia, pressure ulcers, rapid muscle loss, and delirium — complications that compound quickly and are harder to reverse the longer they go on.",
  },
  {
    title: "Untreated, It Can Be Life-Threatening",
    body: "Mortality after hip fracture remains substantial even with modern surgical care — and NYU's own population-scale data shows delay and non-operative management raise that risk further. Getting patients safely and promptly to surgery is the single biggest lever the care team has.",
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
    <div ref={sectionRef} style={{ background: TINT, padding: "72px 24px 96px", position: "relative" }}>
      <motion.div style={{ maxWidth: 920, margin: "0 auto", opacity: contentOpacity, y: contentY }}>
        <div style={{ fontFamily: FONT_MONO, fontSize: 12, letterSpacing: "0.14em", color: VIOLET, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>
          The Case for Surgery
        </div>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 600, margin: 0, color: INK, letterSpacing: "-0.01em", lineHeight: 1.15, textWrap: "balance" }}>
          Why Hip Fracture Surgery Can't Wait
        </h2>
        <p style={{ color: GREY, fontSize: 15.5, marginTop: 16, maxWidth: 680, lineHeight: 1.6 }}>
          Skipping surgery isn't a lower-risk alternative — for most hip fractures, it's the more dangerous path. Here's
          why the care team moves toward the operating room, not away from it.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 40 }}>
          {POINTS.map((pt) => (
            <div
              key={pt.title}
              style={{
                background: VIOLET,
                padding: "26px 28px",
              }}
            >
              <div style={{ fontFamily: FONT_SERIF, fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{pt.title}</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.88)", lineHeight: 1.6, margin: 0, maxWidth: 720 }}>{pt.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, maxWidth: 500 }}>
          <EvidenceDropdown item={evidenceItem} />
        </div>
      </motion.div>

      <motion.button
        onClick={onScrollNext}
        aria-label="Scroll to the three stages of care"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          margin: "48px auto 0",
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
    </div>
  );
}
