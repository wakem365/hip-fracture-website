import { motion } from "framer-motion";
import { AlertCircle, ExternalLink } from "lucide-react";
import { CITATIONS } from "../data/citations";
import { AMBER, GREY, INK, TEAL, TINT, ULTRA_VIOLET, FONT_MONO } from "../theme";

export default function CiteChip({ id }) {
  const c = CITATIONS[id];
  if (!c) return null;
  const badgeColor = c.type === "trial" ? "#3C5A8A" : c.type === "program" ? AMBER : c.type === "guideline" ? TEAL : ULTRA_VIOLET;
  const badgeLabel = c.type === "trial" ? "Landmark trial" : c.type === "program" ? "NYU program" : c.type === "guideline" ? "Society guideline" : "NYU / Egol–Konda";
  const link = c.doi ? `https://doi.org/${c.doi}` : c.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ border: `1px solid ${TINT}`, borderRadius: 8, padding: "8px 10px", marginTop: 8, background: "#fff" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#fff",
            background: badgeColor,
            padding: "2px 7px",
            borderRadius: 999,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {badgeLabel}
        </span>
        <span style={{ fontSize: 11, color: GREY, fontFamily: FONT_MONO }}>{c.year}</span>
        {c.verify && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, color: AMBER }}>
            <AlertCircle size={11} /> verify before use
          </span>
        )}
      </div>
      <div style={{ fontSize: 12.5, color: INK, fontWeight: 600, lineHeight: 1.35 }}>{c.title}</div>
      <div style={{ fontSize: 11.5, color: GREY, marginTop: 2 }}>
        {c.authors} · {c.journal}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 11, color: ULTRA_VIOLET, display: "inline-flex", alignItems: "center", gap: 3, marginTop: 4, textDecoration: "none" }}
        >
          {c.doi ? `doi.org/${c.doi}` : `pubmed/${c.pmid}`} <ExternalLink size={10} />
        </a>
      )}
    </motion.div>
  );
}
