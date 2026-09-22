import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import CitationCard from "./CitationCard";
import { AMBER, GREY, INK, TEAL, TINT, VIOLET, FONT_MONO, FONT_SERIF } from "../theme";

const dotColor = (t) => (t === "trial" ? "#3C5A8A" : t === "program" ? AMBER : t === "guideline" ? TEAL : VIOLET);

// A persistent left-hand rail of years; clicking one zooms/fades the right
// pane into that year's publications. A back button in the detail pane
// returns to the unselected "pick a year" overview — the rail itself never
// goes away, so year-to-year browsing stays a single click.
export default function YearTimeline({ citations }) {
  const [selectedYear, setSelectedYear] = useState(null);

  const byYear = useMemo(() => {
    const map = new Map();
    for (const c of Object.values(citations)) {
      if (!map.has(c.year)) map.set(c.year, []);
      map.get(c.year).push(c);
    }
    return map;
  }, [citations]);

  const years = useMemo(() => [...byYear.keys()].sort((a, b) => a - b), [byYear]);
  const total = Object.keys(citations).length;

  if (total === 0) {
    return (
      <div style={{ padding: "40px 24px", textAlign: "center", color: GREY, fontSize: 14 }}>
        No entries here yet.
      </div>
    );
  }

  const activeEntries = selectedYear != null ? (byYear.get(selectedYear) || []).slice().sort((a, b) => a.title.localeCompare(b.title)) : [];

  return (
    <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
      <style>{`
        .year-rail { display: flex; flex-direction: column; align-items: flex-start; flex-shrink: 0; width: 84px; position: sticky; top: 24px; }
        @media (max-width: 700px) {
          .year-rail { position: static; flex-direction: row; flex-wrap: wrap; width: auto; gap: 6px 10px; }
          .year-rail-line { display: none; }
        }
      `}</style>

      <div className="year-rail" style={{ position: "relative" }}>
        <div className="year-rail-line" style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 2, background: TINT }} />
        {years.map((y) => {
          const active = y === selectedYear;
          const count = byYear.get(y).length;
          return (
            <motion.button
              key={y}
              onClick={() => setSelectedYear(y)}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "5px 0",
                marginLeft: 0,
                textAlign: "left",
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: active ? VIOLET : "#fff",
                  border: `2px solid ${active ? VIOLET : "#D6CBE0"}`,
                  flexShrink: 0,
                  transition: "all 0.15s ease",
                }}
              />
              <span
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: active ? 14 : 12.5,
                  fontWeight: active ? 700 : 500,
                  color: active ? VIOLET : GREY,
                  transition: "all 0.15s ease",
                }}
              >
                {y}
                <span style={{ fontSize: 9.5, opacity: 0.65, marginLeft: 4 }}>({count})</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <AnimatePresence mode="wait">
          {selectedYear == null ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                border: `1px dashed ${TINT}`,
                borderRadius: 14,
                padding: "48px 24px",
                textAlign: "center",
                color: GREY,
              }}
            >
              <div style={{ fontFamily: FONT_SERIF, fontSize: 19, color: INK, fontWeight: 600, marginBottom: 8 }}>
                Pick a year to explore
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, margin: "0 auto", maxWidth: 360 }}>
                {total} publications across {years.length} years ({years[0]}–{years[years.length - 1]}). Click a year on
                the left to see what was published then.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <motion.button
                onClick={() => setSelectedYear(null)}
                whileHover={{ x: -3 }}
                style={{ display: "flex", alignItems: "center", gap: 4, border: "none", background: "none", color: VIOLET, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 16, padding: 0 }}
              >
                <ChevronLeft size={15} /> Back to timeline
              </motion.button>

              <div style={{ fontFamily: FONT_SERIF, fontSize: 26, fontWeight: 600, color: INK, marginBottom: 4 }}>{selectedYear}</div>
              <div style={{ fontSize: 12.5, color: GREY, marginBottom: 20 }}>
                {activeEntries.length} publication{activeEntries.length === 1 ? "" : "s"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {activeEntries.map((c, i) => (
                  <CitationCard key={c.title + i} citation={c} accentColor={dotColor(c.type)} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
