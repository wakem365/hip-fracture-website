import { motion, AnimatePresence } from "framer-motion";
import fnfImg from "../assets/radiographs/fnf.png";
import basicervicalImg from "../assets/radiographs/basicervical.png";
import itImg from "../assets/radiographs/it.png";
import subtrochImg from "../assets/radiographs/subtroch.png";
import { TINT } from "../theme";

// De-identified radiographs, one per fracture pattern. To swap in different
// images later: replace the file at src/assets/radiographs/<type>.png (or
// change the import below) — callers only pass `type`, so no other
// component needs to change.
const RADIOGRAPHS = {
  fnf: fnfImg,
  basicervical: basicervicalImg,
  it: itImg,
  subtroch: subtrochImg,
};

export default function FemurSchematic({ type }) {
  const src = RADIOGRAPHS[type];
  return (
    <div
      style={{
        width: 120,
        height: 180,
        flexShrink: 0,
        borderRadius: 8,
        overflow: "hidden",
        background: "#000",
        border: `1px solid ${TINT}`,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={type}
          src={src}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </AnimatePresence>
    </div>
  );
}
