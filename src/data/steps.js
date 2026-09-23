import { Activity, Scissors, HeartPulse } from "lucide-react";

export const PHASES = [
  { id: "pre", label: "Before Surgery", icon: Activity, blurb: "From arrival to the operating room", desc: "What happens before your surgery — the exams, the tests, and the plan for your care." },
  { id: "intra", label: "During Surgery", icon: Scissors, blurb: "In the operating room", desc: "What your surgical team is doing while you're in the operating room." },
  { id: "post", label: "After Surgery", icon: HeartPulse, blurb: "Recovery & going home", desc: "Recovery, pain control, and getting you safely back on your feet." },
];

// Each fracture-type / fixation-method item's `diagram` field is the swap
// point for real radiographs later — see FemurSchematic.jsx.
export const STEPS = {
  pre: [
    {
      title: "Health History & Exam",
      what: "Your care team asks about how you fell, how well you could walk and move before, what medicines you take, and your overall health.",
      why: "How strong and healthy you were before the fracture has a big effect on how surgery goes and how you recover — so this information shapes your entire care plan from the very start.",
      citations: ["sttgma_bundle", "paksima2008", "penrod2008", "meltzerbruhn2022", "mercer2025"],
    },
    {
      title: "Hip X-ray",
      subSteps: [
        {
          title: "Femoral Neck Fracture (FNF)",
          diagram: "fnf",
          what: "A break in the neck of the thighbone (femur), just below the ball of the hip joint.",
          why: "Where the break happens affects the blood supply to the ball of the hip — that's why this type of break is often treated differently from a break lower down the bone.",
          citations: ["ota_compendium"],
        },
        {
          title: "Basicervical Fracture",
          diagram: "basicervical",
          what: "A break at the base of the neck of the thighbone, close to where it meets the wider part of the bone. The broken pieces are often pushed together at an angle.",
          why: "This break sits right between two other common types of hip fracture, so your surgeon looks closely at it to decide which repair method will hold it best.",
          citations: ["ota_compendium"],
        },
        {
          title: "Intertrochanteric Fracture (IT)",
          diagram: "it",
          what: "A break in the upper thighbone, below the ball-and-socket joint itself, in the area where large muscles attach to the bone.",
          why: "Because this break is outside the hip joint, the blood supply to the ball of the hip usually isn't affected — that gives your surgeon more options for how to fix it.",
          citations: ["ota_compendium", "kaplan_it_review"],
        },
        {
          title: "Subtrochanteric Fracture",
          diagram: "subtroch",
          what: "A break in the thighbone a few inches below the hip joint, in a part of the bone that carries a lot of everyday force.",
          why: "Because this part of the bone takes so much stress, the repair has to be strong enough to hold up against the bending and twisting of everyday movement.",
          citations: ["ota_compendium"],
        },
      ],
    },
    {
      title: "Blood Tests",
      subSteps: [
        {
          title: "Blood Count (H&H)",
          what: "A blood test that checks how much blood you have and how well it's carrying oxygen.",
          why: "A hip fracture causes some internal bleeding, and surgery causes a bit more — this test catches low blood counts early, before they become a bigger problem.",
          citations: ["hgb2002", "blood_risk_score", "transfusion_timing", "konda2023_2", "lutz2025", "konda2025"],
        },
        {
          title: "Blood Chemistry (BMP)",
          what: "A blood test that checks how well your kidneys are working, along with your blood sugar and salt levels.",
          why: "Anesthesia and many of the medicines you'll get after surgery are processed by your kidneys, so this test helps your team pick the right doses for you.",
          citations: ["aaos_cpg_2021"],
        },
        {
          title: "Blood Type Test",
          what: "Finds out your blood type and checks for anything that could make a blood transfusion more complicated.",
          why: "This doesn't mean you're getting a transfusion — it just makes sure matching blood can be found and ready quickly if your surgery ends up needing one.",
          citations: ["blood_risk_score", "transfusion_timing"],
        },
      ],
    },
    {
      title: "Getting You Ready for Surgery",
      what: "A specialist in internal medicine or geriatrics checks you over and adjusts your medicines — for example, blood thinners — so you're as safe as possible going into surgery.",
      why: "Rushing an unstable patient into surgery can be more dangerous than a short, safe delay — but waiting too long has its own risks too. Streamlining this step, instead of automatically ordering extra tests for every patient, gets people to surgery faster without cutting corners on safety.",
      citations: [
        "echo_pathway",
        "delay_to_surgery",
        "lott2018",
        "lott2019_3",
        "susarla2006",
        "merrell2023_2",
        "ganta2024",
        "esper2024_2",
        "goldstein2025",
      ],
    },
  ],
  intra: [
    {
      title: "Anesthesia",
      subSteps: [
        {
          title: "Spinal",
          what: "Numbing medicine is placed near your spine. You're awake or lightly sedated, and numb from the waist down.",
          why: "The largest study on this found that spinal anesthesia wasn't better or worse than general anesthesia for survival or for how well patients could walk afterward — so the choice mostly comes down to your health and what you prefer.",
          citations: ["regain_trial", "reider2024", "herbosa2025"],
        },
        {
          title: "General",
          what: "You're fully asleep for the surgery, and the anesthesia team manages your breathing for you.",
          why: "This is sometimes needed when spinal anesthesia isn't safe or possible for you. The largest study comparing the two found no real difference in outcomes.",
          citations: ["regain_trial", "reider2024"],
        },
        {
          title: "MAC-STILA",
          what: "Light sedation plus numbing medicine injected directly into the surgery site by the surgeon — no spinal or general anesthesia needed at all.",
          why: "This approach was developed and studied at NYU for patients who are too frail for spinal positioning or general anesthesia. It's linked to less confusion after surgery.",
          citations: ["macstila_technique", "macstila_guide", "macstila_outcomes"],
        },
        {
          title: "LOH Block",
          what: "A numbing injection that targets specific nerves around the hip, combined with light sedation — again, no spinal or general anesthesia.",
          why: "This technique was developed and named at NYU Langone Orthopedic Hospital as a way to safely fix a hip fracture using only a nerve block and sedation, in patients where that's a good fit.",
          citations: ["loh_block", "herbosa2025"],
        },
        {
          title: "Nerve Block",
          what: "Numbing medicine injected near the nerves around your hip during surgery, given in addition to spinal, general, or MAC-STILA anesthesia.",
          why: "This blocks pain at the source before you wake up, so you need less opioid pain medicine afterward and can get moving in physical therapy sooner.",
          citations: ["aaos_cpg_2021", "ihejirikalomedico2023"],
        },
      ],
    },
    {
      title: "How Your Hip Will Be Fixed",
      subSteps: [
        {
          title: "Pins (CRPP)",
          what: "Your surgeon lines up the broken bone without opening up the hip, then holds it in place with pins or screws put in through small cuts in the skin.",
          why: "This option is used for breaks that are stable and only slightly out of place — usually breaks in the neck of the thighbone — where this less invasive repair can still hold the bone securely.",
          evidence: "Fixation-method literature — NYU-specific citation not yet identified",
        },
        {
          title: "Sliding Hip Screw",
          what: "A large screw is placed through the neck into the ball of the hip, attached to a metal plate on the side of the bone. The screw can slide a bit as the bone heals and settles into place.",
          why: "This is a reliable, well-tested option for stable breaks between the trochanters, letting the two ends of the bone compress together as they heal.",
          citations: ["kaplan_it_review", "bong2004"],
        },
        {
          title: "Rod in the Bone (IMN)",
          what: "A metal rod is placed down the center of the thighbone and held in place with screws.",
          why: "This option is chosen for breaks that are less stable, because the rod gives stronger support than a plate on the outside of the bone.",
          citations: [
            "kaplan_it_review",
            "kubiak2004",
            "bong2004",
            "esper2023_2",
            "fisher2024",
            "konda2024",
            "maseda2024",
            "hammond2026_2",
          ],
        },
        {
          title: "Partial Hip Replacement",
          what: "The broken ball of your hip joint is removed and replaced with a metal implant. Your own hip socket is left in place. This can be \"unipolar\" (one solid implant head) or \"bipolar\" (an inner head that itself rotates inside an outer shell, which wears less on your natural socket).",
          why: "This is used when the break has cut off blood supply to the bone — most often in older patients who don't need as much hip strength for daily life. It's a shorter, less invasive surgery with a lower chance of the joint popping out of place, but it doesn't treat any arthritis that may already be in your hip socket.",
          citations: ["charnley_award", "health_trial", "kugelman2024"],
        },
        {
          title: "Total Hip Replacement (THA)",
          what: "Both the ball and the socket of your hip are replaced with an implant — not just the ball, like in a partial hip replacement. This is used selectively, mainly in patients who were more active before the fracture, or who already had arthritis in that hip.",
          why: "NYU's research found that having a clear, standard way to decide between a partial and a total hip replacement improved patient outcomes and shortened hospital stays. One important thing to know: a hip replacement done after a fracture is not the same operation as a hip replacement done for arthritis on a planned schedule. This surgery happens urgently, on a bone that just broke rather than one that gradually wore down, often in patients who are more medically frail — and it comes with different precautions than a planned arthritis replacement.",
          citations: [
            "charnley_award",
            "health_trial",
            "frihagen2022",
            "axelrod2020",
            "egol2005",
            "campbell2020",
            "solasz2023",
            "solasz2023_2",
            "hammond2026",
            "schultz2021",
          ],
        },
      ],
    },
    {
      title: "Getting to Surgery Quickly",
      what: "Your care team tracks the time from when you arrive to when your surgery starts, aiming to operate the next day once you're medically ready.",
      why: "The largest study on surgery timing found that faster surgery — about 6 hours on average — led to less confusion, fewer urinary infections, and less pain than waiting closer to 24 hours. NYU's own research has also shown that streamlining pre-surgery testing gets patients to the operating room faster without adding risk.",
      citations: [
        "hip_attack",
        "echo_pathway",
        "delay_to_surgery",
        "ryan2015",
        "assefa2023",
        "egol2018",
        "merrell2024_2",
        "ganta2025",
        "hammond2025_3",
        "schultz2025",
      ],
    },
  ],
  post: [
    {
      title: "Pain Control",
      subSteps: [
        {
          title: "Regular Tylenol",
          what: "A baseline pain medicine (acetaminophen) given on a regular schedule, not just when you ask for it.",
          why: "Keeping a steady level of pain relief in your system means you need less opioid medicine on top of it.",
          citations: ["aaos_cpg_2021"],
        },
        {
          title: "Opioids Used Sparingly",
          what: "Stronger pain medicine (opioids) is used only for pain that breaks through your regular pain control.",
          why: "Opioids raise the risk of confusion and falls in older adults. The numbing injections given during surgery are meant to lower how much opioid medicine you need in the first place.",
          citations: ["macstila_outcomes", "aaos_cpg_2021", "ihejirikalomedico2023"],
        },
      ],
    },
    {
      title: "Getting Up and Moving Early",
      what: "Physical therapy helps you stand or walk, often starting the day after surgery.",
      why: "Moving early lowers your risk of blood clots, pneumonia, and muscle loss — staying still is often more dangerous than the surgery itself. NYU's own data found that patients who didn't walk on the first day after surgery had more complications and a higher risk of death.",
      citations: ["ambulation_pod1", "egol1997", "konda2021", "esper2024"],
    },
    {
      title: "Preventing Blood Clots",
      what: "A blood thinner (medicine, or sometimes a device wrapped around your legs) is started to help prevent blood clots.",
      why: "Surgery and lying still both raise your risk of blood clots, so this starts almost right away unless your risk of bleeding says otherwise.",
      citations: ["aaos_cpg_2021", "jeong2007", "macdonald2020"],
    },
    {
      title: "Avoiding Common Problems",
      subSteps: [
        {
          title: "Urinary Tract Infection (UTI)",
          what: "A bladder infection — one of the most common problems after hip fracture surgery.",
          why: "A tube (catheter) is often placed in your bladder for surgery and can introduce bacteria, and lying still makes it harder to fully empty your bladder. The single best way to prevent this is removing the catheter as early as possible — usually within a day — and getting you up to use the bathroom on your own rather than leaving it in \"just in case.\"",
          citations: ["aaos_cpg_2021"],
        },
        {
          title: "Pneumonia",
          what: "A lung infection that can happen from shallow breathing and a weak cough while lying in bed, sometimes made worse by trouble swallowing after anesthesia or sedating pain medicine.",
          why: "Sitting you upright, encouraging deep breaths (with a device called an incentive spirometer), and getting you out of bed as early as possible keeps your lungs clear — this is one of the main reasons getting up on the first day after surgery matters so much.",
          citations: ["ambulation_pod1", "aaos_cpg_2021"],
        },
        {
          title: "Confusion (Delirium)",
          what: "A sudden state of confusion or disorientation that's common in older adults after hip fracture surgery — brought on by the stress of surgery and anesthesia, pain, poor sleep, and certain medicines, especially opioids and other sedating drugs.",
          why: "Your care team limits sedating medicines where possible, controls pain without relying too heavily on opioids, and helps keep you oriented with clocks, family visits, and a quieter night. The type of anesthesia matters too — NYU's own data found that MAC-STILA was linked to less confusion after surgery than general anesthesia.",
          citations: ["macstila_outcomes", "aaos_cpg_2021"],
        },
        {
          title: "Bedsores (Pressure Injuries)",
          what: "Skin breakdown over bony areas — like your heels, tailbone, and hips — that happens from staying in one position too long, especially if it's hard for you to reposition yourself.",
          why: "Changing position often and using pressure-relieving mattresses both help, but the best protection is the same thing that helps prevent pneumonia and blood clots: getting out of bed and moving as early as it's safe to do so.",
          citations: ["ambulation_pod1"],
        },
      ],
    },
    {
      title: "Planning Your Discharge",
      subSteps: [
        {
          title: "Home (No Services)",
          tag: "Target — best outcomes",
          what: "You go straight home without extra home-care services, usually using a walker or cane, with follow-up appointments scheduled afterward.",
          why: "This is the goal whenever it's safely possible. NYU's own data — and a hospital-wide \"Home Is Best\" program built from it — show that patients who go straight home have fewer complications, like urinary infections, kidney problems, and blood clots, than patients discharged elsewhere.",
          citations: [
            "discharge_sttgma",
            "home_discharge_program",
            "pettit2025_2",
            "esper2025",
            "merrell2025",
            "pettit2025_3",
          ],
        },
        {
          title: "Home with Services",
          what: "You go home, but a visiting nurse and/or physical therapist comes to you.",
          why: "This option bridges the gap for patients who need more support than family alone can give. NYU's research found that home health services led to better outcomes for the cost than a stay at a skilled nursing facility, for patients who could safely choose either one.",
          citations: ["snf_value"],
        },
        {
          title: "Rehab Facility",
          what: "A short stay at a rehab facility for more intensive physical therapy before you go home.",
          why: "This is reserved for patients who need more recovery time than home-based care can offer. The goal is still to get you home as soon as it's safe — NYU's research found that, when either option was medically appropriate, a stay at a skilled nursing facility provided less value than getting home health services instead.",
          citations: ["snf_value"],
        },
      ],
    },
  ],
};
