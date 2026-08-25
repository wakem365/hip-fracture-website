import { motion } from "framer-motion";
import { GREY, INK, TINT, VIOLET, FONT_MONO } from "../theme";

export default function TimelineRow({ items, activeIndex, onSelect, size = "lg" }) {
  const big = size === "lg";
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: big ? 15 : 11, left: 15, right: 15, height: 2, background: TINT }} />
      <motion.div
        style={{ position: "absolute", top: big ? 15 : 11, left: 15, height: 2, background: VIOLET, transformOrigin: "left" }}
        initial={false}
        animate={{
          width: items.length > 1 ? `calc(${(activeIndex / (items.length - 1)) * 100}% - 30px)` : 0,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
        {items.map((s, i) => (
          <motion.button
            key={i}
            onClick={() => onSelect(i)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.94 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", flex: 1, minWidth: 0 }}
          >
            <motion.div
              animate={{
                backgroundColor: i === activeIndex ? VIOLET : "#ffffff",
                borderColor: i === activeIndex ? VIOLET : "#D6CBE0",
                color: i === activeIndex ? "#ffffff" : GREY,
                scale: i === activeIndex ? 1.08 : 1,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                width: big ? 30 : 22,
                height: big ? 30 : 22,
                borderRadius: "50%",
                border: "2px solid",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: big ? 12 : 10,
                fontWeight: 700,
                fontFamily: FONT_MONO,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </motion.div>
            <span style={{ fontSize: big ? 11.5 : 10.5, textAlign: "center", color: i === activeIndex ? INK : GREY, fontWeight: i === activeIndex ? 600 : 500, lineHeight: 1.25, maxWidth: big ? 100 : 84 }}>
              {s.title}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
