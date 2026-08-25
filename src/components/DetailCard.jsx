import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import FemurSchematic from "./FemurSchematic";
import EvidenceDropdown from "./EvidenceDropdown";
import { GREY, INK, TINT, VIOLET, FONT_MONO, FONT_SERIF } from "../theme";

export default function DetailCard({ item }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ marginTop: 22, padding: "20px 20px", background: TINT + "55", borderRadius: 10, borderLeft: `3px solid ${VIOLET}`, display: "flex", gap: 18, flexWrap: "wrap" }}
      >
        {item.diagram && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <FemurSchematic type={item.diagram} />
            <span style={{ fontSize: 10, color: GREY, fontFamily: FONT_MONO, textAlign: "center", maxWidth: 120 }}>
              Schematic only — not an actual radiograph
            </span>
          </div>
        )}

        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontFamily: FONT_SERIF, fontSize: 19, color: INK }}>{item.title}</h3>
            {item.tag && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "#fff", background: VIOLET, padding: "3px 9px", borderRadius: 999 }}>
                <Star size={11} /> {item.tag}
              </span>
            )}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>What happens</div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: INK }}>{item.what}</p>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Why we do it</div>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: INK }}>{item.why}</p>
          </div>

          <EvidenceDropdown item={item} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
