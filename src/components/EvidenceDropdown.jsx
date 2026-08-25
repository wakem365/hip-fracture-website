import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FlaskConical } from "lucide-react";
import CiteChip from "./CiteChip";
import { AMBER, GREY, INK, TINT, ULTRA_VIOLET } from "../theme";

export default function EvidenceDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const citeIds = item.citations || [];
  const hasCitations = citeIds.length > 0;

  return (
    <div>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ borderColor: hasCitations ? ULTRA_VIOLET : AMBER }}
        whileTap={{ scale: 0.985 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          border: `1px solid ${hasCitations ? TINT : "#F0D9CC"}`,
          borderRadius: 8,
          padding: "9px 12px",
          background: hasCitations ? "#fff" : "#FBF0E9",
          cursor: "pointer",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600, color: hasCitations ? INK : AMBER }}>
          <FlaskConical size={14} color={hasCitations ? ULTRA_VIOLET : AMBER} />
          {hasCitations ? `Evidence — ${citeIds.length} source${citeIds.length > 1 ? "s" : ""}` : "Evidence — not yet identified"}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ display: "flex" }}
        >
          <ChevronDown size={15} color={GREY} />
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ marginTop: 2 }}>
              {hasCitations ? (
                citeIds.map((id) => <CiteChip key={id} id={id} />)
              ) : (
                <div style={{ fontSize: 12.5, color: AMBER, padding: "8px 4px" }}>{item.evidence}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
