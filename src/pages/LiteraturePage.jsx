import { motion } from "framer-motion";
import { AlertCircle, ChevronLeft, ExternalLink } from "lucide-react";
import { CITATIONS } from "../data/citations";
import { AMBER, GREY, INK, TINT, ULTRA_VIOLET, VIOLET, TEAL, FONT_MONO, FONT_SERIF } from "../theme";

// With 100+ entries, a single mount-time stagger across the whole list would
// take several seconds to finish revealing the tail. Instead each entry
// reveals itself as it scrolls into view (once), which scales to any length.
const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function LiteraturePage({ onBack }) {
  const sorted = Object.entries(CITATIONS).sort((a, b) => a[1].year - b[1].year);
  const dotColor = (t) => (t === "trial" ? "#3C5A8A" : t === "program" ? AMBER : t === "guideline" ? TEAL : VIOLET);

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px" }}
    >
      <motion.button
        onClick={onBack}
        whileHover={{ x: -3 }}
        style={{ display: "flex", alignItems: "center", gap: 4, border: "none", background: "none", color: VIOLET, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20, padding: 0 }}
      >
        <ChevronLeft size={15} /> All stages
      </motion.button>

      <div style={{ fontSize: 12, fontFamily: FONT_MONO, color: VIOLET, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
        NYU Hospital for Joint Diseases · NYU Langone Orthopedic Center
      </div>
      <h1 style={{ fontFamily: FONT_SERIF, fontSize: 30, fontWeight: 600, margin: "0 0 10px 0", color: INK }}>The Literature, Over Time</h1>
      <p style={{ fontSize: 14, color: GREY, lineHeight: 1.55, marginBottom: 10, maxWidth: 620 }}>
        Every citation referenced across the pathway, in publication order — from an early NYU study on admission
        hemoglobin to the newest work on MAC-STILA, the LOH block, and value-based discharge planning. NYU/Egol–Konda
        work is shown in violet; landmark external trials in blue; society guidelines (OTA/AO, AAOS) in teal; NYU
        quality-improvement programs in amber.
      </p>
      <p style={{ fontSize: 12.5, color: AMBER, lineHeight: 1.5, marginBottom: 30, maxWidth: 620, display: "flex", gap: 6, alignItems: "flex-start" }}>
        <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
        This is a verified subset, not Egol/Konda's complete bibliography (each has 700–1000+ publications across
        many fracture types beyond hip). Send me a paper you want added and I'll fold it in.
      </p>

      <div style={{ position: "relative", paddingLeft: 26 }}>
        <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 2, background: TINT }} />
        {sorted.map(([id, c]) => (
          <motion.div
            key={id}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            style={{ position: "relative", marginBottom: 26 }}
          >
            <div style={{ position: "absolute", left: -26, top: 4, width: 12, height: 12, borderRadius: "50%", background: dotColor(c.type), border: "2px solid #fff", boxShadow: `0 0 0 2px ${dotColor(c.type)}` }} />
            <div style={{ fontSize: 13, fontFamily: FONT_MONO, color: dotColor(c.type), fontWeight: 700, marginBottom: 4 }}>{c.year}</div>
            <motion.div
              whileHover={{ borderColor: dotColor(c.type) }}
              style={{ background: "#fff", border: `1px solid ${TINT}`, borderRadius: 12, padding: "16px 18px" }}
            >
              <div style={{ fontSize: 15, fontWeight: 600, color: INK, fontFamily: FONT_SERIF, marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontSize: 12.5, color: GREY, marginBottom: 8 }}>
                {c.authors} · {c.journal}
              </div>
              {c.note && (
                <p style={{ fontSize: 13.5, color: INK, lineHeight: 1.5, margin: "0 0 8px 0" }}>{c.note}</p>
              )}
              {c.doi && (
                <a href={`https://doi.org/${c.doi}`} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: ULTRA_VIOLET, display: "inline-flex", alignItems: "center", gap: 3, textDecoration: "none" }}>
                  doi.org/{c.doi} <ExternalLink size={11} />
                </a>
              )}
              {!c.doi && c.pmid && (
                <a href={`https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: ULTRA_VIOLET, display: "inline-flex", alignItems: "center", gap: 3, textDecoration: "none" }}>
                  pubmed/{c.pmid} <ExternalLink size={11} />
                </a>
              )}
              {c.verify && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: AMBER, marginLeft: 10 }}>
                  <AlertCircle size={12} /> journal name inferred — verify
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
