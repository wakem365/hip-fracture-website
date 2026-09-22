import { motion } from "framer-motion";
import { AlertCircle, ExternalLink } from "lucide-react";
import { AMBER, GREY, INK, TINT, ULTRA_VIOLET, FONT_SERIF } from "../theme";

export default function CitationCard({ citation, accentColor }) {
  const c = citation;
  return (
    <motion.div
      whileHover={{ borderColor: accentColor }}
      style={{ background: "#fff", border: `1px solid ${TINT}`, borderRadius: 12, padding: "16px 18px" }}
    >
      <div style={{ fontSize: 15, fontWeight: 600, color: INK, fontFamily: FONT_SERIF, marginBottom: 4 }}>{c.title}</div>
      <div style={{ fontSize: 12.5, color: GREY, marginBottom: 8 }}>
        {c.authors} · {c.journal}
      </div>
      {c.note && <p style={{ fontSize: 13.5, color: INK, lineHeight: 1.5, margin: "0 0 8px 0" }}>{c.note}</p>}
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
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: AMBER, marginLeft: c.doi || c.pmid ? 10 : 0 }}>
          <AlertCircle size={12} /> year/journal estimated — verify
        </div>
      )}
    </motion.div>
  );
}
