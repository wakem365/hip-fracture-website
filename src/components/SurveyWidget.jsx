import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircleQuestion, X } from "lucide-react";
import { GREY, INK, TINT, ULTRA_VIOLET, VIOLET, FONT_MONO, FONT_SERIF } from "../theme";

// ---------------------------------------------------------------------------
// Local-only demo. Responses are saved to localStorage under STORAGE_KEY —
// there is no backend yet. To wire this to REDCap (or any other collector)
// later, swap the body of `submitSurvey()` for a POST to that endpoint;
// nothing else in this component needs to change.
// ---------------------------------------------------------------------------
const STORAGE_KEY = "hipFractureSurveyResponses";
const DISMISSED_KEY = "hipFractureSurveyDismissed";
const AUTO_OPEN_DELAY_MS = 2 * 60 * 1000; // "a couple minutes"

const ROLES = ["Patient", "Family member / caregiver", "Healthcare provider", "Other"];

function submitSurvey(entry) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push({ ...entry, submittedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // localStorage unavailable (private browsing, etc.) — fail silently,
    // this is a demo collector, not the real one.
  }
}

function fieldLabel(children) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
      {children}
    </div>
  );
}

// Shared 0-10 button row, reused for the before/after/helped scale questions.
function ScalePicker({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
      {Array.from({ length: 11 }, (_, n) => n).map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            border: `1.5px solid ${value === n ? VIOLET : TINT}`,
            background: value === n ? VIOLET : "#fff",
            color: value === n ? "#fff" : INK,
            fontSize: 12.5,
            fontFamily: FONT_MONO,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

export default function SurveyWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("form"); // "form" | "thanks"
  const [helped, setHelped] = useState(null); // "Yes" | "No"
  const [scale, setScale] = useState(null); // 0-10, how much it helped
  const [before, setBefore] = useState(null); // 0-10, understanding before
  const [after, setAfter] = useState(null); // 0-10, understanding after
  const [role, setRole] = useState(null);

  useEffect(() => {
    let dismissed = false;
    let completed = false;
    try {
      dismissed = localStorage.getItem(DISMISSED_KEY) === "1";
      completed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]").length > 0;
    } catch {
      // ignore — treat as neither dismissed nor completed
    }
    if (dismissed || completed) return;

    const timer = setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = (persistDismiss) => {
    setOpen(false);
    if (persistDismiss) {
      try {
        localStorage.setItem(DISMISSED_KEY, "1");
      } catch {
        // ignore
      }
    }
    // Reset form state after the close animation so it's fresh next open.
    setTimeout(() => {
      setStep("form");
      setHelped(null);
      setScale(null);
      setBefore(null);
      setAfter(null);
      setRole(null);
    }, 300);
  };

  const canSubmit = helped !== null && scale !== null && before !== null && after !== null && role !== null;

  const handleSubmit = () => {
    if (!canSubmit) return;
    submitSurvey({ helped, scale, before, after, role });
    setStep("thanks");
    setTimeout(() => close(true), 1800);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1 }}
        whileHover={{ y: -2, boxShadow: "0 10px 26px rgba(87,6,140,0.35)" }}
        whileTap={{ scale: 0.97 }}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 18px",
          borderRadius: 999,
          border: "none",
          background: VIOLET,
          color: "#fff",
          fontSize: 13.5,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(87,6,140,0.28)",
        }}
      >
        <MessageCircleQuestion size={17} />
        Did this help? Take our survey
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => close(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(15,8,22,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                background: "#fff",
                borderRadius: 16,
                width: "100%",
                maxWidth: 440,
                padding: "28px 26px",
                position: "relative",
                boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
              }}
            >
              <button
                onClick={() => close(true)}
                aria-label="Close survey"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  border: "none",
                  background: TINT,
                  borderRadius: 8,
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: GREY,
                }}
              >
                <X size={16} />
              </button>

              <AnimatePresence mode="wait">
                {step === "form" ? (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 11, letterSpacing: "0.12em", color: VIOLET, textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>
                      Quick, anonymous feedback
                    </div>
                    <h2 style={{ margin: "0 0 20px 0", fontFamily: FONT_SERIF, fontSize: 21, color: INK, fontWeight: 600, lineHeight: 1.25 }}>
                      Did this help your understanding of hip fracture care?
                    </h2>

                    <div style={{ marginBottom: 20 }}>
                      {fieldLabel("Did this help improve your understanding?")}
                      <div style={{ display: "flex", gap: 10 }}>
                        {["Yes", "No"].map((v) => (
                          <button
                            key={v}
                            onClick={() => setHelped(v)}
                            style={{
                              flex: 1,
                              padding: "10px 0",
                              borderRadius: 9,
                              border: `1.5px solid ${helped === v ? VIOLET : TINT}`,
                              background: helped === v ? VIOLET : "#fff",
                              color: helped === v ? "#fff" : INK,
                              fontSize: 14,
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      {fieldLabel("On a scale of 0–10, how much did it help?")}
                      <ScalePicker value={scale} onChange={setScale} />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      {fieldLabel("How much did you understand hip fractures before using this?")}
                      <ScalePicker value={before} onChange={setBefore} />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      {fieldLabel("How much did you understand hip fractures after using this?")}
                      <ScalePicker value={after} onChange={setAfter} />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      {fieldLabel("Which best describes you?")}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {ROLES.map((r) => (
                          <button
                            key={r}
                            onClick={() => setRole(r)}
                            style={{
                              textAlign: "left",
                              padding: "9px 12px",
                              borderRadius: 8,
                              border: `1.5px solid ${role === r ? VIOLET : TINT}`,
                              background: role === r ? VIOLET + "10" : "#fff",
                              color: role === r ? VIOLET : INK,
                              fontSize: 13.5,
                              fontWeight: role === r ? 600 : 500,
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      onClick={handleSubmit}
                      disabled={!canSubmit}
                      whileHover={canSubmit ? { filter: "brightness(1.08)" } : {}}
                      whileTap={canSubmit ? { scale: 0.98 } : {}}
                      style={{
                        width: "100%",
                        padding: "13px 0",
                        borderRadius: 10,
                        border: "none",
                        background: canSubmit ? `linear-gradient(90deg, ${VIOLET}, ${ULTRA_VIOLET})` : TINT,
                        color: canSubmit ? "#fff" : GREY,
                        fontSize: 14.5,
                        fontWeight: 700,
                        cursor: canSubmit ? "pointer" : "not-allowed",
                      }}
                    >
                      Submit
                    </motion.button>
                    <p style={{ fontSize: 11, color: GREY, marginTop: 12, marginBottom: 0, lineHeight: 1.5 }}>
                      Demo only — responses are stored in your browser, not sent anywhere yet.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ textAlign: "center", padding: "20px 0" }}
                  >
                    <div style={{ fontFamily: FONT_SERIF, fontSize: 20, color: INK, fontWeight: 600, marginBottom: 6 }}>Thank you</div>
                    <p style={{ color: GREY, fontSize: 14, margin: 0 }}>Your feedback helps improve this resource.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
