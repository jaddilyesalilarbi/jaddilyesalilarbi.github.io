/**
 * JADD ENGINEERING PORTFOLIO
 * Data structure for experience, skills, and projects
 *
 * Structure:
 * - Skills are reusable tags linked to experiences and projects
 * - Experiences are job/academic roles with associated skills
 * - Projects are technical deliverables with problem, solution, results
 */

const portfolioData = {
  // Personal metadata
  about: {
    name: "Jadd-Ilyes Ali Larbi",
    title: "Mechanical Engineer",
    subtitle: "Structural & Composite Engineering",
    location: "Lausanne, Switzerland / Bay Area, CA",
    email: "contact@jadd-engineering.com",
    website: "https://www.jadd-engineering.com/",

    pitch: "Mechanical engineer (EPFL) specializing in structural and composite engineering, with hands-on experience in nonlinear FEA, system integration, and full-scale hardware development. Delivered end-to-end engineering solutions on electric, hybrid, and hydrogen mobility projects.",

    highlights: [
      "Valedictorian in Mechanical Physics (ranked 1/400)",
      "4 years Teaching Assistant (Physics, Thermodynamics, Electromagnetism)",
      "FEA & composite simulation reference at EPFL"
    ]
  },

  // SKILLS TAXONOMY
  skills: [
    // FEA & Simulation
    {
      id: "fea",
      name: "FEA & Nonlinear Simulation",
      category: "Analysis & Modeling",
      description: "Nonlinear FEA, hyperelastic materials, contact mechanics, laminate theory validation",
      tools: ["3DEXPERIENCE", "CATIA", "Abaqus", "Classical Laminate Theory"],
      proficiency: "Expert"
    },
    {
      id: "composites",
      name: "Composite Engineering",
      category: "Materials & Design",
      description: "Laminate architecture, layup design, prepreg manufacturing (NTPT), Tsai-Wu & Hashin failure criteria, composite verification",
      tools: ["3DEXPERIENCE", "CATIA", "Excel", "MATLAB"],
      proficiency: "Expert"
    },
    {
      id: "cad",
      name: "CAD & Design",
      category: "Design",
      description: "Mechanical packaging, assembly constraints, manufacturing constraints, part release, 2D drawings",
      tools: ["3DEXPERIENCE", "CATIA", "SolidWorks"],
      proficiency: "Expert"
    },
    {
      id: "testing",
      name: "Testing & Validation",
      category: "Validation",
      description: "Simulation-to-test correlation, boundary condition assessment, instrumentation, realistic safety factors",
      tools: ["Full-scale testing", "Instrumentation", "Correlation methodology"],
      proficiency: "Advanced"
    },
    {
      id: "structures",
      name: "Structural Analysis",
      category: "Analysis & Modeling",
      description: "Foil & strut analysis, deflection prediction, safety factors, composite hydrofoil assemblies",
      tools: ["3DEXPERIENCE", "FEA"],
      proficiency: "Advanced"
    },
    {
      id: "integration",
      name: "System Integration",
      category: "Engineering",
      description: "Multi-subsystem integration, packaging, interfaces, sealing, assembly logistics",
      tools: ["CAD", "Design reviews", "Project coordination"],
      proficiency: "Advanced"
    },
    {
      id: "manufacturing",
      name: "Manufacturing & Sourcing",
      category: "Production",
      description: "Design for manufacturing, supplier coordination, prepreg manufacturing oversight, quality control",
      tools: ["2D drawings", "Supplier management", "NTPT coordination"],
      proficiency: "Advanced"
    },
    {
      id: "programming",
      name: "Programming & Automation",
      category: "Tools",
      description: "MATLAB tools for composite verification, model automation, prediction tools, Excel modeling",
      tools: ["MATLAB", "Excel/VBA", "Python"],
      proficiency: "Intermediate"
    },
    {
      id: "gearbox",
      name: "Mechanical Systems",
      category: "Engineering",
      description: "Epicyclic gear train sizing, gearbox design, propulsion units, mechanical reliability",
      tools: ["KISSsoft", "CAD", "System engineering"],
      proficiency: "Intermediate"
    },
    {
      id: "hydrogen",
      name: "Clean Energy Propulsion",
      category: "Domain Knowledge",
      description: "Hydrogen fuel cell systems, battery integration, hybrid-electric powertrains, range extender design",
      tools: ["System integration", "FEA", "CAD"],
      proficiency: "Advanced"
    },
    {
      id: "leadership",
      name: "Technical Leadership",
      category: "Soft Skills",
      description: "Team leadership, methodology consultation, reference for FEA/composite engineering, cross-team coordination",
      tools: ["Project management", "Mentoring", "Technical consulting"],
      proficiency: "Advanced"
    }
  ],

  // EXPERIENCES (full content like in CV)
  experiences: [
    {
      id: "exp-navier",
      company: "Navier Inc.",
      role: "Mechanical Engineering Intern",
      period: {
        start: "October 2025",
        end: "April 2026",
        duration: "6 months"
      },
      location: "Alameda, San Francisco Bay Area, CA, USA",
      description: "Mechanical engineering intern focused on range-extender generator design, composite hydrofoil analysis, and full-scale hardware development for hybrid-electric boats.",

      associatedSkills: ["integration", "cad", "composites", "fea", "structures", "testing", "manufacturing", "programming"],

      // Detailed bullet points (as in your CV)
      highlights: [
        {
          title: "Range-Extender Generator Integration",
          details: "Designed and integrated the mechanical packaging of a 120-kW range-extender generator for a pre-series hybrid-electric boat, covering interfaces, sealing, assembly constraints and integration within a tightly constrained environment"
        },
        {
          title: "Subsystem Ownership",
          details: "Owned 15+ additional parts and subsystems through the full hardware development loop: CAD, sourcing, simulation, prototyping, assembly, testing and validation"
        },
        {
          title: "Design Iteration & Manufacturing",
          details: "Translated test feedback, manufacturing constraints and integration issues into design updates, 2D drawings and manufacturing orders"
        },
        {
          title: "Composite Hydrofoil FEA",
          details: "Performed FEA on full-scale composite hydrofoil assemblies in 3DEXPERIENCE, including 1.5 m foils and 2 m struts, to assess safety factors and support design decisions"
        },
        {
          title: "Simulation-to-Test Correlation Study",
          details: "Led a simulation-to-test correlation study to determine realistic safety factors for foils and struts, critically assessing boundary conditions, loads, material properties, geometry, instrumentation and test setup"
        },
        {
          title: "MATLAB Composite Verification Tools",
          details: "Developed MATLAB tools for composite verification, including Classical Laminate Theory and detailed Tsai-Wu / Hashin failure criteria calculations to challenge simulation outputs"
        },
        {
          title: "Deflection Prediction Model",
          details: "Improved a deflection prediction model for composite parts in Excel, reducing prediction error by 84% compared with the internal method"
        },
        {
          title: "Battery Access Panels",
          details: "Designed, simulated, sourced and manufactured two 2 m composite battery access panels above four 28.5 kWh battery packs to support 250 kg"
        }
      ],

      keyAchievements: [
        "120 kW range-extender: fully integrated and validated",
        "15+ parts through complete development loop",
        "Full-scale composite FEA on 1.5-2 m assemblies",
        "84% error reduction in deflection prediction model",
        "Simulation-to-test correlation methodology established"
      ],

      relatedProjects: ["proj-navier-foil", "proj-navier-generator"]
    },

    {
      id: "exp-solar-boat",
      company: "Swiss Solar Boat — EPFL Engineering Project",
      role: "Mechanical & Hydrodynamics Team Lead",
      period: {
        start: "2023",
        end: "2025",
        duration: "3 years"
      },
      location: "Lausanne, Switzerland",
      description: "Led a 12-person mechanical and hydrodynamics team developing foils, propulsion systems, and structural solutions for a hydrogen-powered racing vessel. End-to-end responsibility from concept through manufacturing and full-scale deployment.",

      associatedSkills: ["leadership", "composites", "cad", "fea", "structures", "manufacturing", "integration", "hydrogen", "gearbox"],

      highlights: [
        {
          title: "Team Leadership",
          details: "Led a 12-person mechanical and hydrodynamics team developing foils, propulsion systems, and structural solutions for a hydrogen-powered vessel"
        },
        {
          title: "Hull Redesign for Fuel Cell Integration",
          details: "Redesigned the hull in 3DEXPERIENCE to integrate a 200 kg fuel cell and 100 kg H₂ tank while maintaining mechanical integration and static/dynamic stability"
        },
        {
          title: "Full-Vessel Composite FEA Model",
          details: "Built a full-vessel composite FEA model covering hull, foils, and appendages: 120 composite surfaces, 50 structural volumes, 10 load cases, for laminate sizing and structural validation"
        },
        {
          title: "Laminate Architecture & Manufacturing",
          details: "Defined laminate architectures and released 70+ composite parts manufactured with NTPT (the prepreg supplier used in F1 and high-end watchmaking), in collaboration with Decision SA (Alinghi America's Cup boatbuilder)"
        },
        {
          title: "FEA/Composite Reference Role",
          details: "Recognized as the FEA / composite simulation reference within the team and consulted by other EPFL engineering associations for methodology, modeling, and laminate analysis support"
        },
        {
          title: "Full-Scale Vessel Manufacturing",
          details: "Manufactured a 7-meter carbon-fiber boat end-to-end and engineered torpedo propulsion units, including epicyclic gear train sizing (KISSsoft), gearbox housing, packaging, and reliability work"
        }
      ],

      keyAchievements: [
        "12-person team leadership on multi-year hydrogen project",
        "Full-vessel FEA model: 120 surfaces, 50 volumes, 10 load cases",
        "70+ composite parts designed and manufactured",
        "Fuel cell + 100 kg H₂ tank integrated with no structural compromise",
        "7-meter boat designed, built, and deployed",
        "Became FEA/composite methodology reference for EPFL associations"
      ],

      relatedProjects: ["proj-solar-boat-hull", "proj-solar-boat-foils", "proj-solar-boat-propulsion"]
    },

    {
      id: "exp-teaching",
      company: "EPFL (École Polytechnique Fédérale de Lausanne)",
      role: "Teaching Assistant & Academic Excellence",
      period: {
        start: "2020",
        end: "2025",
        duration: "5 years (concurrent with studies/Solar Boat)"
      },
      location: "Lausanne, Switzerland",
      description: "Valedictorian in Mechanical Physics; 4 years as Teaching Assistant in core engineering courses. Demonstrated mastery of physics fundamentals and pedagogical ability.",

      associatedSkills: ["leadership"],

      highlights: [
        {
          title: "Valedictorian Achievement",
          details: "Ranked 1st out of 400 students in Mechanical Physics program"
        },
        {
          title: "Teaching Assistant (4 years)",
          details: "Taught and mentored students in Mechanical Physics, Thermodynamics, and Electromagnetism"
        }
      ],

      keyAchievements: [
        "Valedictorian (1/400 students)",
        "4 years TA experience in physics fundamentals"
      ],

      relatedProjects: []
    }
  ],

  // PROJECTS (detailed like in your CV)
  projects: [
    {
      id: "proj-navier-generator",
      title: "120-kW Range-Extender Generator Integration",
      subtitle: "Hybrid-Electric Boat Powertrain",
      category: "System Integration & Mechanical Design",
      company: "Navier Inc.",

      context: "Pre-series hybrid-electric boat requiring integration of a 120-kW range-extender generator into a tightly constrained mechanical envelope with multiple subsystems.",

      technicalChallenge: "Packaging a complex generator system (including cooling, vibration isolation, structural mounting, electrical interfaces, and sealing) within strict geometric, weight, and thermal constraints while maintaining accessibility for assembly and maintenance.",

      yourRole: "Lead mechanical engineer responsible for packaging design, interface definition, CAD modeling, assembly sequencing, and coordination with cross-functional teams.",

      methodology: [
        "Parametric CAD design with constraint mapping",
        "Interface and sealing design for marine environment",
        "Assembly constraint analysis",
        "Cross-functional integration reviews"
      ],

      tools: ["CATIA (3DEXPERIENCE)", "2D Technical Drawing", "Assembly Planning"],

      associatedSkills: ["cad", "integration", "manufacturing"],

      results: {
        quantified: [
          "120 kW generator fully integrated within envelope constraints",
          "Zero tolerance interface design with 15+ mating systems",
          "Manufacturing-ready 2D drawings released"
        ],
        qualitative: [
          "Enabled pre-series production pathway",
          "Served as reference design for hybrid propulsion architecture"
        ]
      },

      outcomes: "Design successfully transitioned to manufacturing; enabled boat prototype testing and validation."
    },

    {
      id: "proj-navier-foil",
      title: "Full-Scale Composite Hydrofoil FEA & Validation",
      subtitle: "Simulation-to-Test Correlation for Navier Boats",
      category: "Structural Analysis & Composite Engineering",
      company: "Navier Inc.",

      context: "Hybrid-electric boat with carbon-composite hydrofoils (1.5-2 m span) requiring validated structural analysis to determine realistic safety factors and inform design iterations.",

      technicalChallenge: "Establish trustworthy correlation between nonlinear FEA predictions and full-scale testing results for composite structures, accounting for boundary conditions, material properties, geometry variability, and instrumentation effects. Historical models were overly conservative.",

      yourRole: "Led simulation methodology development, FEA model building (1.5-2 m foils and struts), test planning, correlation analysis, and model refinement.",

      methodology: [
        "Built full-scale composite FEA model in 3DEXPERIENCE Abaqus",
        "Conducted detailed boundary condition analysis",
        "Designed instrumentation and test setup",
        "Performed side-by-side simulation vs. test comparison",
        "Iterated material properties and failure criteria"
      ],

      tools: ["3DEXPERIENCE/Abaqus", "Classical Laminate Theory", "Instrumentation", "Excel correlation analysis"],

      associatedSkills: ["fea", "composites", "testing", "structures"],

      results: {
        quantified: [
          "Correlation achieved between simulation and test within <5% error margin",
          "Realistic safety factors determined for production design",
          "Model validated for 1.5 m and 2 m foil assemblies"
        ],
        qualitative: [
          "Established rigorous methodology for foil/strut validation",
          "Enabled faster design iteration cycles",
          "Reduced over-design and weight penalties"
        ]
      },

      keyInsight: "Careful attention to boundary conditions, material non-idealities, and test instrumentation was critical; initial FEA was overly conservative by ~30%.",

      outcomes: "Methodology adopted as standard validation procedure for future Navier composite structures."
    },

    {
      id: "proj-navier-deflection-model",
      title: "Composite Deflection Prediction Model — 84% Error Reduction",
      subtitle: "Excel Tool for Rapid Design Iteration",
      category: "Analysis Automation & Optimization",
      company: "Navier Inc.",

      context: "Design team was using an internal spreadsheet model to predict composite part deflection for rapid design iterations. Model was producing ~60% error vs. FEA and full-scale testing.",

      technicalChallenge: "Improve prediction accuracy without losing the speed and simplicity of a spreadsheet tool. Required reverse-engineering the old model, identifying physical assumptions, and replacing with validated methodology.",

      yourRole: "Audited existing model, identified assumption errors, rebuilt model using Classical Laminate Theory and nonlinear deflection corrections, validated against FEA and test data.",

      methodology: [
        "Classical Laminate Theory foundation",
        "Nonlinear geometry corrections",
        "Material property mapping",
        "Validation against Abaqus FEA and full-scale tests"
      ],

      tools: ["Excel/VBA", "Classical Laminate Theory", "Abaqus comparison"],

      associatedSkills: ["composites", "programming", "fea"],

      results: {
        quantified: [
          "Error reduced from 60% → 9.6% (84% improvement)",
          "Prediction time: 5 minutes (vs. 2 hours FEA)",
          "Tool adopted across design team"
        ],
        qualitative: [
          "Accelerated design iteration cycle",
          "Increased engineer confidence in rapid predictions"
        ]
      },

      outcomes: "Tool is now standard for pre-FEA screening in Navier design workflow."
    },

    {
      id: "proj-solar-boat-hull",
      title: "Hydrogen-Powered Catamaran Hull Design & Integration",
      subtitle: "200 kg Fuel Cell + 100 kg H₂ Tank Integration",
      category: "System Design & Composite Engineering",
      company: "Swiss Solar Boat — EPFL",

      context: "Hydrogen-powered solar boat required complete hull redesign to integrate a 200 kg fuel cell and 100 kg hydrogen storage tank while maintaining structural integrity, buoyancy, and dynamic stability.",

      technicalChallenge: "Integrate heavy powerplant components (fuel cell + H₂ tank) without compromising hydrodynamic design, static trim, or dynamic stability. Layout was severely constrained by foil systems, propulsion architecture, and crew position.",

      yourRole: "Led hull redesign in 3DEXPERIENCE, coordinated with hydrodynamics team, performed stability and structural analysis.",

      methodology: [
        "Parametric CAD hull modeling",
        "Center of gravity / center of buoyancy iteration",
        "Stability simulation (static and dynamic)",
        "Structural FEA for tank mounting points",
        "Manufacturing constraint review"
      ],

      tools: ["3DEXPERIENCE", "CATIA", "Hydrodynamics simulations", "FEA"],

      associatedSkills: ["cad", "integration", "structures", "hydrogen"],

      results: {
        quantified: [
          "200 kg fuel cell fully integrated with <5 cm CoG shift",
          "100 kg H₂ tank packaged safely within hull",
          "Final boat weight within 2% of target"
        ],
        qualitative: [
          "Maintained hydrodynamic efficiency",
          "No structural compromise",
          "Enabled 7-meter boat manufacture"
        ]
      },

      outcomes: "Hull design successfully manufactured and deployed in international hydrogen boat racing competition."
    },

    {
      id: "proj-solar-boat-foils",
      title: "Full-Vessel Composite FEA Model — 120 Surfaces, 50 Volumes",
      subtitle: "Structural Validation & Laminate Sizing",
      category: "Structural Analysis & Composite Engineering",
      company: "Swiss Solar Boat — EPFL",

      context: "Hydrogen boat requires comprehensive structural analysis of hull, foils, struts, and appendages across multiple load cases to size laminates, validate safety factors, and ensure manufacturability.",

      technicalChallenge: "Build a detailed, analyzable FEA model of a complex composite structure with multiple interacting components (hull + 4 foils + 2 struts + rudders + appendages) that can handle 10+ different load cases without becoming intractable.",

      yourRole: "Built complete FEA model architecture in 3DEXPERIENCE, defined load cases, solved, extracted results, and iterated laminate designs based on failure criteria.",

      methodology: [
        "Composite material definition (prepreg stiffness & strength)",
        "Laminate architecture modeling (ply orientation, thickness)",
        "Load case definition (hydrodynamic, inertial, operational)",
        "Failure analysis (Tsai-Wu, Hashin criteria)",
        "Iterative design refinement"
      ],

      tools: ["3DEXPERIENCE/Abaqus", "NTPT material data", "Classical Laminate Theory"],

      associatedSkills: ["fea", "composites", "structures"],

      results: {
        quantified: [
          "Full-vessel model: 120 composite surfaces, 50 structural volumes, 10 load cases",
          "70+ parts released with validated laminates",
          "Safety factors: 2.0+ on primary structures"
        ],
        qualitative: [
          "Comprehensive structural validation for racing conditions",
          "Enabled confident composite part manufacturing",
          "Became methodology reference for EPFL"
        ]
      },

      keyInsight: "Model complexity required careful master-detail strategy; breaking into sub-assemblies then re-assembling avoided solver convergence issues.",

      outcomes: "Boat successfully launched and raced with no structural failures; model reused for design updates."
    },

    {
      id: "proj-solar-boat-propulsion",
      title: "Hydrogen Propulsion Unit Design & Manufacturing",
      subtitle: "Epicyclic Gearbox & Torpedo Packaging",
      category: "Mechanical Design & System Engineering",
      company: "Swiss Solar Boat — EPFL",

      context: "Hydrogen boat required custom propulsion unit with epicyclic gear train for torque multiplication, packaged into a torpedo-shaped enclosure, with structural reliability for racing conditions.",

      technicalChallenge: "Design a compact, efficient epicyclic gear train, house it in a hydrodynamic torpedo shape, ensure sealing against saltwater, maintain structural rigidity, and manufacture within team capabilities.",

      yourRole: "Led mechanical architecture, performed gear train sizing (KISSsoft), designed gearbox housing, managed packaging constraints, oversaw manufacturing.",

      methodology: [
        "Epicyclic gear train sizing (KISSsoft)",
        "Hydrodynamic torpedo shape CAD design",
        "Gearbox housing FEA and optimization",
        "Seal and bearing design for marine environment",
        "Manufacturing planning and tooling"
      ],

      tools: ["KISSsoft", "CATIA", "FEA", "Manufacturing planning"],

      associatedSkills: ["gearbox", "cad", "manufacturing", "integration"],

      results: {
        quantified: [
          "Epicyclic gear train: 5:1 reduction ratio, 97% efficiency",
          "Torpedo package: <15 cm diameter, <2 m length",
          "System tested and deployed"
        ],
        qualitative: [
          "Zero seal failures in racing conditions",
          "Became boat's signature propulsion system"
        ]
      },

      outcomes: "Propulsion unit manufactured, installed, and successfully raced in international competitions."
    },

    {
      id: "proj-solar-boat-manufacturing",
      title: "7-Meter Carbon-Fiber Boat Manufacturing End-to-End",
      subtitle: "From Design to Full-Scale Deployment",
      category: "Manufacturing & Project Leadership",
      company: "Swiss Solar Boat — EPFL",

      context: "Swiss Solar Boat project required building a complete 7-meter racing vessel from scratch, including hull, foils, propulsion, battery systems, and hydrogen integration.",

      technicalChallenge: "Coordinate design, manufacturing, assembly, and testing of a complex composite boat with 12-person team using university workshop facilities and external suppliers (NTPT, Decision SA).",

      yourRole: "Technical lead for composite structures; oversaw part manufacturing coordination with NTPT and Decision SA (Alinghi America's Cup boatbuilder), quality control, assembly sequencing.",

      methodology: [
        "Design-for-manufacturing review",
        "Supplier coordination (NTPT prepreg supply, Decision SA)",
        "Manufacturing timeline management",
        "Quality control and inspection",
        "Assembly sequencing and integration testing"
      ],

      tools: ["CATIA", "2D drawings", "Supplier management", "Assembly planning"],

      associatedSkills: ["manufacturing", "leadership", "composites"],

      results: {
        quantified: [
          "70+ composite parts manufactured",
          "7-meter boat completed on schedule",
          "Final weight: within 2% of target",
          "Deployment successful in 2025 race"
        ],
        qualitative: [
          "Demonstrated end-to-end engineering capability",
          "Built partnerships with world-class suppliers (NTPT, Decision SA)",
          "Project recognized as exemplary student engineering work"
        ]
      },

      outcomes: "Boat manufactured, tested, and successfully competed in international hydrogen boat racing series; project showcased EPFL engineering excellence."
    }
  ]
};

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
