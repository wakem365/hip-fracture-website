import { motion } from "framer-motion";
import { AlertTriangle, Bed, HeartCrack } from "lucide-react";
import EvidenceDropdown from "./EvidenceDropdown";
import { AMBER, GREY, INK, TINT, VIOLET, FONT_MONO, FONT_SERIF } from "../theme";

const POINTS = [
  {
    icon: AlertTriangle,
    title: "It's an Unstable Fracture",
    body: "Most hip fractures — displaced femoral neck, intertrochanteric, subtrochanteric — can't bear weight on their own. Without fixation, the fragments keep moving under normal loading: every attempt to stand or shift in bed re-injures the site, so the fracture can't heal and the pain never settles.",
  },
  {
    icon: Bed,
    title: "Immobility Is the Real Danger",
    body: "An unfixed hip fracture leaves a patient essentially bedbound. Prolonged bed rest in an older adult sharply raises the risk of blood clots (DVT/PE), pneumonia, pressure ulcers, rapid muscle loss, and delirium — complications that compound quickly and are harder to reverse the longer they go on.",
  },
  {
    icon: HeartCrack,
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

export default function WhySurgerySection() {
  return (
    <div style={{ background: "#fff", padding: "72px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ maxWidth: 920, margin: "0 auto" }}
      >
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginTop: 40 }}>
          {POINTS.map((pt) => {
            const Icon = pt.icon;
            return (
              <div
                key={pt.title}
                style={{
                  background: TINT + "55",
                  borderLeft: `3px solid ${AMBER}`,
                  borderRadius: 10,
                  padding: "22px 20px",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 9, background: "#fff", color: AMBER, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon size={18} />
                </div>
                <div style={{ fontFamily: FONT_SERIF, fontSize: 17.5, fontWeight: 600, color: INK, marginBottom: 8 }}>{pt.title}</div>
                <p style={{ fontSize: 13.5, color: INK, lineHeight: 1.55, margin: 0 }}>{pt.body}</p>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 28, maxWidth: 500 }}>
          <EvidenceDropdown item={evidenceItem} />
        </div>
      </motion.div>
    </div>
  );
}
