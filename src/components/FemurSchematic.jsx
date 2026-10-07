import { motion, AnimatePresence } from "framer-motion";
import fnfImg from "../assets/radiographs/fnf.png";
import basicervicalImg from "../assets/radiographs/basicervical.png";
import itImg from "../assets/radiographs/it.png";
import subtrochImg from "../assets/radiographs/subtroch.png";
import screwFixationImg from "../assets/radiographs/screw-fixation.jpg";
import imnImg from "../assets/radiographs/imn.webp";
import hemiImg from "../assets/radiographs/hemi.jpg";
import { TINT } from "../theme";

// De-identified radiographs, one per fracture pattern or fixation method. To
// swap in different images later: replace the file at
// src/assets/radiographs/<type>.<ext> (or change the import below) —
// callers only pass `type`, so no other component needs to change.
const RADIOGRAPHS = {
  fnf: fnfImg,
  basicervical: basicervicalImg,
  it: itImg,
  subtroch: subtrochImg,
  screw_fixation: screwFixationImg,
  imn: imnImg,
  hemi: hemiImg,
};

// Most radiographs crop fine centered in the 120x180 portrait frame below,
// but a few need a different crop point to keep the implant in frame —
// e.g. hemi's source photo is a wide pelvis X-ray with the implant off to
// one side, which a center crop would cut into.
const CROP_POSITION = {
  hemi: "20% center",
};

export default function FemurSchematic({ type }) {
  const src = RADIOGRAPHS[type];
  const objectPosition = CROP_POSITION[type] || "center";
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
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block" }}
        />
      </AnimatePresence>
    </div>
  );
}
