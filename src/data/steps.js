import { Activity, Scissors, HeartPulse } from "lucide-react";

export const PHASES = [
  { id: "pre", label: "Pre-Operative", icon: Activity, blurb: "From arrival to OR", desc: "What happens before your surgery — the workup, the labs, and the plan." },
  { id: "intra", label: "Intra-Operative", icon: Scissors, blurb: "In the OR", desc: "What the surgical team is doing while you're in the operating room." },
  { id: "post", label: "Post-Operative", icon: HeartPulse, blurb: "Recovery & discharge", desc: "Recovery, pain control, and getting you safely back on your feet." },
];

// Each fracture-type / fixation-method item's `diagram` field is the swap
// point for real radiographs later — see FemurSchematic.jsx.
export const STEPS = {
  pre: [
    {
      title: "History & Physical",
      what: "Provider evaluates the fall, prior mobility, medications, and baseline health.",
      why: "Frailty and comorbidities strongly predict surgical risk and post-op course, so this shapes the whole plan before anything else happens.",
      citations: ["sttgma_bundle", "paksima2008"],
    },
    {
      title: "Hip X-ray",
      subSteps: [
        {
          title: "FNF",
          diagram: "fnf",
          what: "Femoral neck fracture — the break is through the neck of the femur, just below the ball of the joint.",
          why: "Fracture line location determines blood supply risk to the femoral head, which is why FNF is often treated differently from fractures lower down.",
          citations: ["ota_compendium"],
        },
        {
          title: "Basicervical (Varus Impacted)",
          diagram: "basicervical",
          what: "A fracture at the base of the neck, near the trochanters, where the fragments have impacted into a varus (angled-in) position.",
          why: "This pattern sits at the boundary between neck and intertrochanteric fractures, so classification affects which fixation approach fits best.",
          citations: ["ota_compendium"],
        },
        {
          title: "IT",
          diagram: "it",
          what: "Intertrochanteric fracture — the break runs between the greater and lesser trochanters, outside the joint capsule.",
          why: "Because this is outside the hip capsule, blood supply to the head is generally preserved, which changes the fixation options available.",
          citations: ["ota_compendium", "kaplan_it_review"],
        },
        {
          title: "Subtroch",
          diagram: "subtroch",
          what: "Subtrochanteric fracture — the break is in the femoral shaft just below the lesser trochanter.",
          why: "High mechanical forces at this level mean fixation has to resist significant bending and rotational stress, which shapes implant choice.",
          citations: ["ota_compendium"],
        },
      ],
    },
    {
      title: "Labs",
      subSteps: [
        {
          title: "H&H",
          what: "Hemoglobin & hematocrit — measures how much blood you have and how oxygen-rich it is.",
          why: "Hip fractures bleed internally at the fracture site, and surgery adds more blood loss — this catches anemia early so it can be corrected before it becomes dangerous.",
          citations: ["hgb2002", "blood_risk_score", "transfusion_timing"],
        },
        {
          title: "BMP",
          what: "Basic metabolic panel — checks kidney function, electrolytes, and blood sugar.",
          why: "Anesthesia and many post-op medications are processed by the kidneys, so this flags anyone who needs dosing adjustments before surgery.",
          citations: ["aaos_cpg_2021"],
        },
        {
          title: "Type & Screen",
          what: "Identifies your blood type and checks for antibodies, in case a transfusion is needed.",
          why: "This isn't ordering blood — it's making sure blood can be matched and ready quickly if surgery ends up needing it.",
          citations: ["blood_risk_score", "transfusion_timing"],
        },
      ],
    },
    {
      title: "Medical Optimization",
      what: "Internal medicine or geriatrics clears the patient, adjusts medications (e.g., blood thinners).",
      why: "Rushing to surgery on an unstable patient is more dangerous than a short, safe delay — but waiting too long raises other risks. NYU's own pathway work found that standardizing (rather than reflexively ordering) preop workups like echocardiograms got patients to surgery faster without sacrificing safety.",
      citations: ["echo_pathway", "delay_to_surgery"],
    },
  ],
  intra: [
    {
      title: "Anesthesia",
      subSteps: [
        {
          title: "Spinal",
          what: "Numbing medication placed near the spine; you're awake or lightly sedated, numb from the waist down.",
          why: "The largest trial to date found spinal anesthesia was not superior to general anesthesia for survival or walking recovery — so the choice mostly comes down to your specific health factors and preference.",
          citations: ["regain_trial"],
        },
        {
          title: "General",
          what: "You're fully asleep for the procedure, breathing managed by the anesthesia team.",
          why: "Sometimes needed when spinal anesthesia isn't safe or possible — the largest head-to-head trial found no significant outcome difference from spinal anesthesia.",
          citations: ["regain_trial"],
        },
        {
          title: "MAC / STILA",
          what: "Monitored Anesthesia Care with Soft Tissue Infiltration of Local Anesthesia — sedation plus numbing medicine injected directly into the surgical site by the surgeon, avoiding spinal or general anesthesia entirely.",
          why: "Developed and studied at NYU as an option for medically frail patients who may not tolerate spinal positioning or general anesthesia well — associated with lower rates of postoperative confusion.",
          citations: ["macstila_technique", "macstila_guide", "macstila_outcomes"],
        },
        {
          title: "LOH Block",
          what: "Lateral femoral cutaneous and Over-the-Hip block — a regional anesthetic (sedation + injection only, no spinal or general) targeting the lateral femoral cutaneous nerve, femoral nerve articular branches, and accessory obturator nerve.",
          why: "Developed and named at NYU Langone Orthopedic Hospital as a way to fix a hip fracture under regional block and sedation alone — avoiding spinal or general anesthesia entirely in appropriately selected patients.",
          citations: ["loh_block"],
        },
        {
          title: "Nerve Block",
          what: "Numbing medication injected near the nerves supplying the hip, placed intra-operatively as an add-on to spinal, general, or MAC-STILA.",
          why: "Targets pain at the source before you wake up, which lowers opioid needs afterward and helps you participate in therapy sooner.",
          citations: ["aaos_cpg_2021"],
        },
      ],
    },
    {
      title: "Fixation Method",
      subSteps: [
        {
          title: "CRPP",
          what: "Closed reduction, percutaneous pinning — the fracture is aligned without opening the site, then held with pins/screws through small incisions.",
          why: "Used for stable, minimally displaced fractures (often femoral neck) where the least invasive option can still hold the reduction.",
          evidence: "Fixation-method literature — NYU-specific citation not yet identified",
        },
        {
          title: "Sliding Hip Screw",
          what: "A screw through the neck into the head, attached to a plate on the shaft that allows controlled sliding as the fracture settles.",
          why: "A workhorse option for stable intertrochanteric fractures, allowing controlled compression at the fracture site as it heals.",
          citations: ["kaplan_it_review"],
        },
        {
          title: "IMN",
          what: "Intramedullary nail — a rod placed down the center of the bone, secured with screws.",
          why: "Chosen for unstable intertrochanteric or subtrochanteric patterns where it gives better mechanical support than a plate-based option.",
          citations: ["kaplan_it_review"],
        },
        {
          title: "Hemi / THA",
          what: "The fractured ball of the hip joint is replaced with an implant (hemiarthroplasty), or the socket is replaced too (total hip arthroplasty).",
          why: "Used when the fracture disrupts the bone's own blood supply. NYU's award-winning protocol work showed that standardizing the hemi-vs-THA decision improved mortality and length of stay.",
          citations: ["charnley_award", "health_trial"],
        },
      ],
    },
    {
      title: "Next-Day Surgery",
      what: "Team tracks time from admission to surgical start, aiming for surgery the next day once medically ready.",
      why: "The largest trial on surgical timing found accelerated surgery (avg. ~6h) reduced delirium, UTIs, and pain versus the ~24h standard — NYU's pathway work has separately shown standardized preop workups get patients to the OR faster without added risk.",
      citations: ["hip_attack", "echo_pathway", "delay_to_surgery"],
    },
  ],
  post: [
    {
      title: "Pain Control",
      subSteps: [
        {
          title: "Scheduled Acetaminophen",
          what: "Regular (not just as-needed) dosing of a baseline pain reliever.",
          why: "Steady baseline control reduces how much opioid medication is needed on top of it.",
          citations: ["aaos_cpg_2021"],
        },
        {
          title: "Limited Opioids",
          what: "Opioid medication used sparingly, for breakthrough pain only.",
          why: "Opioids raise the risk of delirium and falls in older patients — the nerve block placed intra-operatively and, where used, MAC-STILA both aim to reduce how much opioid is needed here in the first place.",
          citations: ["macstila_outcomes", "aaos_cpg_2021"],
        },
      ],
    },
    {
      title: "Early Mobilization",
      what: "Physical therapy gets the patient standing or walking, often the day after surgery.",
      why: "Moving early lowers the risk of blood clots, pneumonia, and muscle loss — the biggest post-op threats aren't the incision, they're staying still. NYU's own data found failure to walk on postoperative day 1 was independently linked to more complications and higher mortality.",
      citations: ["ambulation_pod1"],
    },
    {
      title: "VTE Prophylaxis",
      what: "Blood thinner (or mechanical device) started to prevent clots.",
      why: "Surgery and immobility both raise clot risk sharply, so this starts almost immediately unless bleeding risk says otherwise.",
      citations: ["aaos_cpg_2021"],
    },
    {
      title: "Discharge Planning",
      subSteps: [
        {
          title: "Home (No Services)",
          tag: "Target — best outcomes",
          what: "Discharge directly home without additional home-care services, typically with a walker or cane and outpatient follow-up.",
          why: "This is the goal disposition when it's safely achievable. NYU's own data — and a hospital-wide 'HOME IS BEST' staff education campaign built on it — show patients discharged home have fewer complications (UTIs, kidney injury, VTE) than those discharged elsewhere.",
          citations: ["discharge_sttgma", "home_discharge_program"],
        },
        {
          title: "Home with Services",
          what: "Discharge home with visiting nurse and/or physical therapy coming to you.",
          why: "Bridges the gap for patients who need more support than family alone can provide — NYU value-of-care research found home health services outperformed skilled nursing facilities on outcome-per-dollar for this exact comparison.",
          citations: ["snf_value"],
        },
        {
          title: "Rehab Facility",
          what: "Short-term stay at a rehab facility for intensive physical therapy before going home.",
          why: "Reserved for patients who need more recovery time than home-based care can offer — the aim is still to get back home as soon as it's safe, since NYU's data linked skilled nursing stays to lower care 'value' than home health services when either was medically appropriate.",
          citations: ["snf_value"],
        },
      ],
    },
  ],
};
