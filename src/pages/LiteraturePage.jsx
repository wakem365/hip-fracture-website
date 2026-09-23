import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { CITATIONS } from "../data/citations";
import { HISTORIC_CITATIONS } from "../data/historicCitations";
import LiteratureLanding from "../components/LiteratureLanding";
import YearTimeline from "../components/YearTimeline";
import { VIOLET, FONT_SERIF } from "../theme";

const COLLECTIONS = {
  historic: { citations: HISTORIC_CITATIONS, label: "Historic NYU Literature" },
  current: { citations: CITATIONS, label: "Current Guidance & Research" },
};

// [minYear, maxYear, count] for a collection, or null if it's empty — lets
// the landing cards show an accurate range instead of a hardcoded one that
// would drift out of sync as entries are added (e.g. a few pre-2002 papers
// already live in CITATIONS because they're cited by a pathway step).
function yearRange(citations) {
  const years = Object.values(citations).map((c) => c.year);
  if (years.length === 0) return null;
  return [Math.min(...years), Math.max(...years), years.length];
}

export default function LiteraturePage({ onBack }) {
  const [collectionId, setCollectionId] = useState(null); // null = landing

  const collection = collectionId ? COLLECTIONS[collectionId] : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ maxWidth: collection ? 900 : 780, margin: "0 auto", padding: "40px 24px" }}
    >
      <motion.button
        onClick={() => (collection ? setCollectionId(null) : onBack())}
        whileHover={{ x: -3 }}
        style={{ display: "flex", alignItems: "center", gap: 4, border: "none", background: "none", color: VIOLET, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 20, padding: 0 }}
      >
        <ChevronLeft size={15} /> {collection ? "Both collections" : "All stages"}
      </motion.button>

      <AnimatePresence mode="wait">
        {!collection ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <LiteratureLanding
              historicYears={yearRange(HISTORIC_CITATIONS)}
              currentYears={yearRange(CITATIONS)}
              onSelect={setCollectionId}
            />
          </motion.div>
        ) : (
          <motion.div key={collectionId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: 26, fontWeight: 600, margin: "0 0 24px 0" }}>{collection.label}</h1>
            <YearTimeline citations={collection.citations} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
