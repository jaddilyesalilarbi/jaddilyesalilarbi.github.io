// Public V0 content. Keep confidential detail and unverified metrics out of this file.
module.exports = {
  person: {
    name: 'Jadd-Ilyes Ali Larbi',
    title: 'Mechanical Engineer — Structures, Composites & Complex Systems',
    pitch: 'My work covers mechanical design, systems integration, structural simulation, manufacturing and testing.',
    email: 'contact@jadd-engineering.com',
    phone: '+33660908949',
    phoneDisplay: '+33 6 60 90 89 49',
    linkedin: 'https://www.linkedin.com/in/jadd-ilyes-ali-larbi-b9946a1b0/',
    // Add the final file at assets/jadd-ilyes-ali-larbi-cv.pdf, then set this value to that path.
    resume: 'assets/jadd-ilyes-ali-larbi-cv.pdf',
    availability: 'Currently looking for a six-month Master’s thesis opportunity.'
  },
  expertise: [
    { id: 'development', name: 'Mechanical Design', description: 'Mechanical components, assemblies and mounting interfaces.', pageDescription: 'Mechanical parts, assemblies and interfaces designed for real hardware.', detail: 'I take defined requirements through CAD development, interface definition, drawings and design updates informed by manufacturing feedback.', skills: ['CAD & assembly design', 'Mechanical interfaces', 'Equipment packaging', 'Technical drawings', 'Design for manufacturing'], media: { src: 'assets/range-extender-integration-1280.webp', srcset: ['assets/range-extender-integration-640.webp', 'assets/range-extender-integration-1280.webp', 'assets/range-extender-integration-1920.webp'], alt: 'Representative marine range-extender packaging and mechanical integration concept.', width: 1448, height: 1086, fit: 'contain' }, evidence: [{project:'range-extender-integration'},{project:'hydrogen-integration'}] },
    { id: 'integration', name: 'Systems Integration', description: 'Equipment layout, mounting interfaces and assembly access.', pageDescription: 'Packaging equipment and mechanical systems within real space, structural and maintenance constraints.', detail: 'I develop equipment layouts, mounts and interfaces while accounting for mass distribution, routing, installation sequence and maintenance access.', skills: ['Equipment layout', 'Mounting concepts', 'Interface definition', 'Mass distribution', 'Routing & access'], media: { src: 'assets/hydrogen-system-integration-1280.webp', srcset: ['assets/hydrogen-system-integration-640.webp', 'assets/hydrogen-system-integration-1280.webp', 'assets/hydrogen-system-integration-1920.webp'], alt: 'Fuel-cell and hydrogen-system integration layout within the EPFL Solar Boat.', width: 1803, height: 1121, fit: 'contain' }, evidence: [{project:'hydrogen-integration'},{project:'range-extender-integration'}] },
    { id: 'structural', name: 'Structural Simulation / FEA', description: 'Stiffness, stresses and deformation in composite structures.', pageDescription: 'Structural analysis used to understand behaviour and support design decisions.', detail: 'I assess stiffness, deformation, load transfer and structural margins under defined loads, including nonlinear and composite behaviour where required.', skills: ['Linear & nonlinear FEA', 'Composite structures', 'Laminate assessment', 'Load paths', 'Design iteration'], media: { src: 'assets/composite-fea-1280.webp', srcset: ['assets/composite-fea-640.webp', 'assets/composite-fea-1280.webp', 'assets/composite-fea-1920.webp'], alt: 'Composite boat structure with a finite element analysis colour map.', width: 2292, height: 1300, fit: 'contain' }, evidence: [{project:'solar-boat-structural-fea'},{project:'navier-structural-fea'}] },
    { id: 'manufacturing', name: 'Manufacturing & Assembly', description: 'Composite manufacturing and mechanical assembly on boat hardware.', pageDescription: 'Hands-on manufacturing, assembly and maintenance of full-scale hardware.', detail: 'I have produced carbon-composite parts, machined and fitted components, assembled systems and maintained vessel hardware. That experience feeds directly back into my design decisions.', skills: ['Composite production', 'Machining & fitting', 'Mechanical assembly', 'Installation', 'Hardware maintenance'], media: { src: 'assets/solar-boat-1280.webp', srcset: ['assets/solar-boat-640.webp', 'assets/solar-boat-1280.webp', 'assets/solar-boat-1920.webp'], alt: 'EPFL Solar Boat hydrofoil vessel.', width: 1180, height: 610, fit: 'contain' }, evidence: [{experience:'solar-boat',label:'Composite manufacturing and propulsion development — EPFL Solar Boat'},{experience:'navier',label:'Assembly and hardware maintenance — Navier'}] },
    { id: 'validation', name: 'Testing & Instrumentation', description: 'Physical test development, instrumentation and simulation–test comparison.', pageDescription: 'Physical measurements used to understand real behaviour and challenge models.', detail: 'I define structural tests, instrumentation and measurement chains, then compare predicted and measured behaviour to guide the next engineering decision.', skills: ['Structural test setups', 'Strain gauges', 'Load & torque measurement', 'Data acquisition', 'Simulation / test correlation'], media: { src: 'assets/simulation-test-correlation-1280.webp', srcset: ['assets/simulation-test-correlation-640.webp', 'assets/simulation-test-correlation-1280.webp', 'assets/simulation-test-correlation-1920.webp'], alt: 'Representative structural test setup and simulation-to-test correlation diagram.', width: 1672, height: 941, fit: 'contain' }, evidence: [{project:'navier-test-correlation'}] }
  ],
  services: [
    { id: 'design', name: 'Mechanical Design', description: 'Design mechanical parts, assemblies and interfaces from a defined requirement through manufacturing-ready documentation.', examples: ['CAD parts and assemblies', 'Mounting systems and interfaces', 'Packaging and access studies', 'Design updates from manufacturing feedback'], outputs: ['CAD models', 'Assembly layouts', 'Interface definitions', 'Technical drawings', 'Design recommendations'], projects: ['range-extender-integration','hydrogen-integration'] },
    { id: 'integration', name: 'Equipment & Systems Integration', description: 'Integrate equipment within real packaging, structural, mass and maintenance constraints.', examples: ['Equipment layout and mounting concepts', 'Structural and mechanical interfaces', 'Installation and maintenance access', 'Mass distribution and routing'], outputs: ['Integration layouts', 'Mounting concepts', 'Interface definitions', 'CAD studies', 'Integration recommendations'], projects: ['hydrogen-integration', 'range-extender-integration'] },
    { id: 'analysis', name: 'Structural Analysis', description: 'Assess stiffness, deformation and structural response under defined loads, including composite structures.', examples: ['Linear and nonlinear FEA', 'Composite and laminate assessment', 'Stiffness, load paths and critical regions', 'Design iteration from analysis results'], outputs: ['Analysis assumptions', 'Structural models and results', 'Critical-region assessment', 'Design recommendations'], projects: ['solar-boat-structural-fea', 'navier-structural-fea'] },
    { id: 'physical-validation', name: 'Test & Simulation Correlation', description: 'Use physical measurements to check model behaviour, investigate discrepancies and identify the data needed for reliable engineering decisions.', examples: ['Measurement and test definition', 'Instrumentation and test setups', 'Predicted versus measured behaviour', 'Discrepancy and uncertainty analysis'], outputs: ['Test plan', 'Instrumentation definition', 'Model / measurement comparison', 'Uncertainty assessment', 'Recommended next measurements or model updates'], projects: ['navier-test-correlation'] }
  ],
  experience: [
    { id: 'navier', name: 'Navier', role: 'Mechanical Engineering Intern', period: 'October 2025 – April 2026', location: 'Alameda, California', description: 'Mechanical engineering on electric and hybrid-electric hydrofoil boats, spanning composite analysis, physical testing and system integration.', about: ['At Navier, I worked across the hardware-development loop on a pre-series hydrofoil boat.', 'I took 15+ mechanical components and subsystems from requirements and CAD through analysis, sourcing, manufacturing, assembly and testing. My work included range-extender integration, composite components, hydrofoil structural analysis and simulation / test correlation.', 'I also spent significant time building and maintaining the boats directly, working on appendages, propulsion hardware, actuators, motors, mechanical controls, hull and cabin components. Working alongside engineers, technicians and suppliers gave me direct feedback on how design decisions performed in manufacturing and assembly.'] },
    { id: 'solar-boat', name: 'EPFL Solar Boat', role: 'Mechanical & Hydrodynamics Team Lead', aboutRole: 'Mechanical & Hydrodynamics Lead', period: '2023 – 2025', leadPeriod: 'Lead role — 2023–2024', description: 'Mechanical and hydrodynamics team leadership, connecting composite structures, propulsion development, manufacturing and hydrogen integration.', about: ['EPFL Solar Boat was where I first worked across almost the complete mechanical development cycle.', 'I started with propulsion design, composite structural modelling and full-scale carbon manufacturing, then expanded into hydrogen-system integration and technical leadership.', 'As Mechanical & Hydrodynamics Lead, I managed a 12-person technical team. I followed projects, allocated work, made technical decisions, recruited team members and coordinated deadlines and interfaces with other teams.', 'I remained hands-on with the boat throughout, from composite production to maintenance of hydrofoils, propulsion hardware, actuators and cooling systems.'] },
    { id: 'epfl', name: 'EPFL', role: 'Master’s studies in Mechanical Engineering', period: null, education: true, description: 'Mechanical engineering studies at EPFL.' }
  ],
  education: [
    { id: 'epfl-master', degree: 'Master of Science in Mechanical Engineering', school: 'EPFL', period: '2023 – ongoing', detail: 'Coursework complete; Master’s project remaining.' },
    { id: 'epfl-bachelor', degree: 'Bachelor of Science in Mechanical Engineering', school: 'EPFL', period: '2020 – 2023' }
  ],
  additionalExperience: [
    { id: 'teaching', organization: 'EPFL', role: 'Teaching', duration: '4 years', description: 'For four years, I taught mechanics, thermodynamics and electromagnetism through theory, exercise sessions and individual support. I led problem solving and corrections, graded exams and independently taught groups of up to 50 students.' }
  ],
  projects: [
    {
      id: 'solar-boat-structural-fea', title: 'Full-Vessel Composite Structural Analysis', organization: 'EPFL Solar Boat', experience: 'solar-boat', category: 'Composite structures', selected: true,
      summary: 'Full-vessel composite analysis linking laminate design, physical testing and manufacturing.',
      editorial: {
        summary: 'Composite layup optimisation and structural assessment before manufacturing.',
        expertise: ['structural', 'development'],
        tags: ['3DEXPERIENCE', 'Composite FEA', 'Layup optimisation'],
        sections: {
          problem: 'Assess the composite boat structure under its defined load cases and identify the layup changes needed before manufacturing.',
          contribution: 'Built the full-vessel model, optimised composite layups and checked the results against physical bending tests.',
          outcome: 'The resulting design progressed to manufacturing by EPFL Solar Boat and NTPT.'
        },
        details: [
          { id: 'load-transfer', title: 'Load transfer through the structure', text: 'Assessed how the defined loads transfer between the hull, foil wells and appendages within the composite structural model.' },
          { id: 'model-quality', title: 'Convergence and singularity diagnosis', text: 'Investigated mesh convergence and separated local numerical singularities from structural issues relevant to the assessed load cases.' }
        ],
        caseStudy: {
          title: 'Full-Vessel Composite Structural Analysis',
          year: '2024',
          disciplines: ['Composite structures', 'Finite element analysis', 'Physical testing'],
          challenge: [
            'EPFL Solar Boat was moving an approximately 7 m full-scale composite hydrofoil boat from detailed design toward production. I treated the hull, internal structure, floats, foil wells and appendages as one interacting load-carrying system rather than isolated components. At this scale, a local change at an appendage interface could alter how load spread through the internal structure and hull.',
            'The engineering objective was direct: determine where the proposed laminates were sufficient and where stacking or local reinforcement had to change before manufacturing. The model needed to cover operating and exceptional cases while remaining efficient enough to support repeated design iterations.'
          ],
          responsibility: {
            intro: 'I owned the composite modelling and the interpretation needed to turn the results into design iterations.',
            items: [
              'I built and iterated full-vessel composite surface models in 3DEXPERIENCE.',
              'I defined laminate zones and stacking sequences and assessed composite failure.',
              'I investigated strut, rudder and foil-well behaviour with pseudo-strut and pseudo-rudder models.',
              'I checked mesh convergence and investigated numerical singularities.',
              'I compared selected predictions with four-point bending tests and used the findings to iterate layups and reinforcements.'
            ]
          },
          approach: [
            'I represented the structure with composite shells and zones, each with its own laminate definition. The connected full-vessel model preserved the global load path and linked local laminate response to vessel deformation. I varied the modelling detail by area: full-vessel behaviour remained global, while critical interfaces received more focused analysis.',
            'Through the V2 and V3 iterations, I adjusted model fidelity to keep the analyses solvable and useful for design decisions. I used the global model to locate critical interfaces and focused models to answer local questions. The pseudo-strut and pseudo-rudder showed how loads entered the foil wells and transferred through the reinforcement into the surrounding hull structure.'
          ],
          vesselVisual: {
            src: 'assets/solar-boat.png',
            alt: 'EPFL Solar Boat vessel rendering with hull and hydrofoil appendages',
            caption: 'Vessel architecture showing the hull, foil wells and appendages as one interacting structural system.',
            layout: 'wide',
            theme: 'light',
            width: 1178,
            height: 642
          },
          loadCases: {
            items: ['Planing', 'Flight', 'Crash', 'Slamming', 'Immersion'],
            paragraphs: [
              'I assessed planing, flight, crash, slamming and immersion separately because each introduced load through a different part of the vessel. Together, they covered distributed hull response and concentrated loads entering through the appendages instead of collapsing both behaviours into one envelope.',
              'For appendage cases, I followed the path from strut or rudder through the foil wells, local reinforcement and internal structure into the hull. I checked whether deformation and load transfer remained continuous across those interfaces. The simplified studies made this transfer easier to interpret and exposed where the structure, rather than the idealised interface, needed attention.'
            ]
          },
          compositeAssessment: [
            'I assigned and iterated laminate definitions by structural zone. I compared the Tsai-Wu failure index with stiffness, deformation and load transfer before changing a stacking sequence or adding reinforcement. This tied every laminate change to the behaviour of its structural zone and the surrounding vessel.',
            'When a local peak appeared, I checked its position, mesh sensitivity, load path and boundary conditions. I refined the mesh and tracked whether the global response converged or only the local peak continued to rise. Peaks confined to idealised constraints or sharp transitions were treated as numerical singularities. Converged responses along the physical load path drove structural changes.'
          ],
          physicalTesting: {
            intro: 'I compared FEA displacement with two four-point bending configurations to check the modelled stiffness response against physical measurements. Displacement provided a direct comparison of global stiffness for the two documented test setups.',
            comparisons: [
              { name: 'Configuration 1', measured: '20.0 mm', simulated: '18.8 mm', difference: '6.0%' },
              { name: 'Configuration 2', measured: '0.90 mm', simulated: '0.92 mm', difference: '2.2%' }
            ],
            conclusion: 'The close agreement increased confidence in the modelled stiffness for both bending configurations and complemented the convergence and composite-failure checks. The comparison covered these two documented test configurations.'
          },
          manufacturingOutcome: [
            'The simulations identified weak areas requiring laminate or local reinforcement changes. I revised the stacking and structural definitions, then reassessed each affected region under its governing case. The response determined whether I changed the stacking sequence or reinforced the load path. Most cases passed after these iterations.',
            'The resulting design progressed to manufacturing by EPFL Solar Boat and NTPT.'
          ],
          proofs: [
            { title: 'Full-system modelling', text: 'Composite structural analysis at vessel scale rather than isolated components.' },
            { title: 'Engineering judgement', text: 'Convergence and singularity analysis used to distinguish numerical artefacts from physical structural issues.' },
            { title: 'Analysis to hardware', text: 'Simulation drove layup and reinforcement iterations before manufacturing.' }
          ]
        }
      },
      expertise: ['structural'], tags: ['FEA', 'Composites', 'Laminate sizing'], confidential: false, homeOrder: 2,
      media: { src: 'assets/composite-fea-1280.webp', srcset: ['assets/composite-fea-640.webp', 'assets/composite-fea-1280.webp', 'assets/composite-fea-1920.webp'], alt: 'Composite boat structure with a finite element analysis colour map', detailCaption: 'Composite structural model — EPFL Solar Boat.', width: 2292, height: 1300, layout: 'wide', theme: 'light', fit: 'contain' },
      sections: {
        context: 'A composite vessel developed within EPFL Solar Boat, with interacting hull structures and appendages.',
        problem: 'Assess the structural response of the composite assembly and support laminate sizing.',
        constraints: ['Stiffness', 'Strength', 'Mass', 'Manufacturing'],
        approach: 'Connect load cases, material definitions and laminate architecture within a structural model.',
        development: 'Composite FEA modelling and laminate analysis, with results reviewed against the physical structure.',
        physical: null,
        validation: null,
        outcome: 'The revised laminate design progressed to manufacturing by EPFL Solar Boat and NTPT.',
        contribution: 'Built the full-vessel composite model, optimised laminate definitions and compared selected predictions with physical tests.'
      }
    },
    {
      id: 'navier-structural-fea', title: 'Hydrofoil Structural Analysis', organization: 'Navier', experience: 'navier', category: 'Hydrofoil structures', selected: false,
      summary: 'Nonlinear composite analysis of hydrofoil appendages for an increased payload requirement.',
      editorial: {
        summary: 'Nonlinear structural analysis of hydrofoil appendages for increased payload requirements.',
        expertise: ['structural'],
        tags: ['Nonlinear FEA', 'Composites', 'Hydrofoils'],
        sections: {
          problem: 'Assess whether the hydrofoil appendages could accommodate higher payload requirements within the load cases being studied.',
          contribution: 'Performed nonlinear composite analysis of the foil and strut assembly in 3DEXPERIENCE.',
          outcome: 'The analysis supported retaining the existing appendage design for the increased payload requirement.'
        },
        details: [
          { id: 'analysis-scope', title: 'Analysis scope', text: 'Evaluated composite behaviour, stiffness and deformation under the revised load cases while keeping the public description limited to non-confidential assumptions.' },
          { id: 'design-decision', title: 'Supporting a design decision', text: 'Used the nonlinear analysis to assess whether the existing appendage design could be retained for the requirements under study.' }
        ],
        caseStudy: {
          kind: 'hydrofoil',
          title: 'Hydrofoil Structural Analysis',
          year: '2025–2026',
          disciplines: ['Nonlinear FEA', 'Composite structures', 'Design assessment'],
          question: [
            'Navier needed to determine whether the existing hydrofoil appendages could support an increased payload requirement. I assessed the design with nonlinear structural analysis and used the results to decide whether the appendages needed to change.',
            'The assembly combines foils approximately 1.5 m wide with struts approximately 2 m long. I analysed the foil, strut and interfaces together because deformation and load transfer depend on the complete assembly.'
          ],
          responsibility: {
            intro: 'I prepared and ran the structural assessment and translated the simulation results into a design recommendation.',
            items: [
              'I prepared the structural models in 3DEXPERIENCE.',
              'I ran nonlinear analyses for the revised loads.',
              'I assessed stiffness, deformation and composite behaviour.',
              'I checked safety margins using the defined loads, laminate properties and boundary conditions.',
              'I interpreted the results at foil–strut assembly level and made the retain-or-redesign recommendation.'
            ]
          },
          nonlinearAnalysis: [
            'I used nonlinear analysis to capture the deformed response of the long, slender appendages. The model tracked how foil and strut deformation changed the load path through their connections.',
            'I compared displacement, stiffness and composite criteria across the assembly. I reviewed laminate behaviour with the global deformation to identify both local material limits and excessive flexibility.'
          ],
          modelScope: [
            { title: 'Geometry', text: 'I retained the structural form and interfaces that controlled assembly stiffness.' },
            { title: 'Composite definition', text: 'I used laminate properties and orientation to assess stiffness and structural margins.' },
            { title: 'Load introduction', text: 'I traced each load through the foil, strut and connections.' },
            { title: 'Boundary conditions', text: 'I matched the constraints to the physical support of the assembly.' }
          ],
          assemblyInterpretation: [
            'I followed deformation and load transfer from the foil through the strut and mechanical interfaces. I then compared local composite margins with the stiffness of the connected assembly. This showed whether the existing components still worked together under the revised requirement.',
            'I checked the result against changes in geometry, load application, laminate properties and boundary conditions before making the design recommendation.'
          ],
          decision: [
            'The analysis supported retaining the existing appendage design for the increased payload requirement.'
          ]
        }
      },
      expertise: ['structural'], tags: ['FEA', 'Foils & struts', 'Composite mechanics'], confidential: true,
      media: { src: 'assets/hydrofoil-structural-analysis-1280.webp', srcset: ['assets/hydrofoil-structural-analysis-640.webp', 'assets/hydrofoil-structural-analysis-1280.webp', 'assets/hydrofoil-structural-analysis-1920.webp'], alt: 'Representative hydrofoil strut and foil geometry used to illustrate the structural analysis.', detailCaption: 'Representative geometry — project details modified for confidentiality.', representative: true, width: 941, height: 1672, layout: 'portrait', theme: 'light', fit: 'contain' },
      sections: {
        context: 'Composite hydrofoil components operating as part of an electric boat.',
        problem: 'Understand deformation and structural margins under the relevant loading conditions.',
        constraints: ['Stiffness', 'Strength', 'Interfaces', 'Marine environment'],
        approach: 'Review the structural model through its load assumptions, material properties and boundary conditions.',
        development: 'FEA of composite hydrofoil assemblies, supported by composite mechanics calculations.',
        physical: null,
        validation: 'The relationship between predictions and physical measurements is explored in the separate simulation / test correlation case study.',
        outcome: 'The analysis supported retaining the existing appendage design for the increased payload requirement.',
        contribution: 'Performed nonlinear composite analysis of the foil and strut assembly in 3DEXPERIENCE.'
      }
    },
    {
      id: 'hydrogen-integration', title: 'Hydrogen System Integration', organization: 'EPFL Solar Boat', experience: 'solar-boat', category: 'Systems integration', selected: true,
      summary: 'Fuel-cell and hydrogen-storage integration within a composite hydrofoil vessel.',
      editorial: {
        summary: 'Fuel-cell integration combining equipment layout, composite supports and stability assessment.',
        expertise: ['integration', 'development', 'structural'],
        tags: ['Equipment layout', 'Composite supports', 'Stability'],
        sections: {
          problem: 'Integrate a fuel cell and hydrogen-storage system into a composite boat while accounting for structural loads, mass distribution, available space and maintenance access.',
          contribution: 'Developed the equipment layout, composite supports and stability assessment while preserving routing, ventilation and access.',
          outcome: 'The integration design and support structures progressed to manufacturing following the structural and stability assessments.'
        },
        details: [
          { id: 'layout-tradeoffs', title: 'Layout and support trade-offs', text: 'Developed the equipment layout together with its supports, access requirements, routing constraints and effect on mass distribution.' },
          { id: 'stability-workflow', title: 'Stability-analysis workflow', text: 'Developed a MATLAB stability-analysis tool and compared its results with the CAD model without exposing confidential system data.' }
        ],
        caseStudy: {
          kind: 'hydrogen',
          title: 'Hydrogen Energy System Integration',
          year: '2024–2025',
          disciplines: ['Systems integration', 'Mechanical design', 'Structural assessment'],
          challenge: [
            'EPFL Solar Boat needed to integrate a hydrogen energy subsystem into an existing composite vessel. I had to place and support the major equipment without compromising structure, stability, access or the surrounding systems.',
            'Component position affected the centre of gravity and hydrofoil loads. Orientation affected mounting interfaces, cable routing, ventilation and maintenance access. I developed the layout, supports and stability assessment together.'
          ],
          responsibility: {
            intro: 'I developed the mechanical integration concept and carried the layout through structural and stability assessment.',
            items: [
              'I developed component layouts and defined the mechanical interfaces with the composite vessel.',
              'I designed the support structures and sized the composite supports in 3DEXPERIENCE.',
              'I assessed mass distribution, centre of gravity and static and dynamic stability.',
              'I developed a MATLAB stability tool and compared its results with the CAD model.',
              'I incorporated cable routing, ventilation and maintenance access into the layout iterations.'
            ]
          },
          constraints: [
            { title: 'Vessel balance', text: 'I compared mass distribution, centre of gravity and the resulting foil loads for each layout.' },
            { title: 'Structural interfaces', text: 'I designed supports that transferred concentrated equipment loads into the composite structure.' },
            { title: 'Installation envelope', text: 'The equipment, supports and routing had to fit an achievable assembly sequence.' },
            { title: 'Service & safety', text: 'The layout preserved maintenance access, ventilation and separation from adjacent systems.' }
          ],
          layoutSupports: [
            'I compared candidate positions in CAD against the surrounding bulkheads, access paths and routing space. I iterated the component layout to improve mass distribution, structural support and maintenance access. I developed the supports at the same time so every proposed position had a practical installation and load path.',
            'I defined the mounting interfaces and connected each support to the surrounding composite structure. I sized the supports for crash, turning and slamming loads as well as static weight.'
          ],
          stability: {
            paragraphs: [
              'I assessed how each layout shifted the longitudinal centre of gravity and changed vessel equilibrium. Moving the major equipment rearward improved mass distribution and reduced the load on the main foil.',
              'I developed a MATLAB stability tool using component mass properties and longitudinal positions. It calculated vessel equilibrium for each proposed arrangement. I compared the results with the CAD model, then returned them to the layout and support design.'
            ],
            steps: ['Update component positions and mass properties', 'Solve the vessel equilibrium in MATLAB', 'Compare the result with the CAD model', 'Return the findings to the layout and support design']
          },
          supportSizing: [
            'I modelled the support concepts in 3DEXPERIENCE and assessed stiffness, load transfer and combined-stress behaviour. I used Tsai-Wu for the composite supports and identified the areas that required reinforcement.',
            'The analysis revealed local buckling in one area. I reinforced the support, updated the interface and reassessed the design before release.'
          ],
          tradeoffs: [
            { title: 'Placement ↔ stability', text: 'I compared each component position against centre of gravity and foil loading.' },
            { title: 'Support ↔ access', text: 'I preserved installation clearance and maintenance access around the load path.' },
            { title: 'Routing ↔ structure', text: 'I routed cables and ventilation around the structural interfaces.' },
            { title: 'CAD ↔ MATLAB', text: 'CAD defined the geometry; MATLAB accelerated stability comparisons.' }
          ],
          outcome: [
            'The final layout met the structural and stability requirements while preserving routing, ventilation and maintenance access.',
            'The final integration design and support structures progressed to manufacturing.'
          ]
        }
      },
      expertise: ['integration', 'development'], tags: ['Packaging', 'Mechanical interfaces', 'CAD'], confidential: true, homeOrder: 1,
      media: { src: 'assets/hydrogen-system-integration-1280.webp', srcset: ['assets/hydrogen-system-integration-640.webp', 'assets/hydrogen-system-integration-1280.webp', 'assets/hydrogen-system-integration-1920.webp'], alt: 'Fuel-cell and hydrogen-system integration layout within the EPFL Solar Boat.', detailCaption: 'Fuel-cell and hydrogen-system integration layout — EPFL Solar Boat.', approvedPublic: true, width: 1803, height: 1121, layout: 'wide', theme: 'light', fit: 'contain' },
      sections: {
        context: 'Hydrogen propulsion components integrated into the EPFL Solar Boat platform.',
        problem: 'Integrate a fuel-cell and hydrogen-storage system while managing structure, mass distribution and access.',
        constraints: ['Packaging', 'Mass distribution', 'Structural interfaces', 'Assembly access'],
        approach: 'Study the component layout together with the hull geometry and mechanical interfaces.',
        development: 'CAD integration and structural interface development for the hydrogen system.',
        physical: null,
        validation: null,
        outcome: 'The integration design and support structures progressed to manufacturing.',
        contribution: 'Developed the equipment layout, composite supports and stability assessment.'
      }
    },
    {
      id: 'navier-test-correlation', title: 'Simulation / Test Correlation', organization: 'Navier', experience: 'navier', category: 'Testing & instrumentation', selected: true,
      summary: 'Simulation / test correlation used to improve deflection prediction and define the remaining data needs.',
      editorial: {
        summary: 'Improved deflection predictions and identified the data gaps preventing a reliable safety-factor estimate.',
        expertise: ['validation', 'structural'],
        tags: ['Physical measurements', 'Deflection', 'Uncertainty'],
        sections: {
          problem: 'Compare predicted and measured structural behaviour, and determine whether the available evidence justified a precise structural safety factor.',
          contribution: 'Compared predicted and measured deflection, improved the prediction method and traced the remaining uncertainty to model and test inputs.',
          outcome: 'Improved the deflection prediction and identified the data gaps preventing a reliable safety-factor estimate.'
        },
        details: [
          { id: 'discrepancies', title: 'Investigating prediction discrepancies', text: 'Compared predicted and measured deflection, then examined material properties, geometry, applied loads, boundary conditions and the measurement setup as possible sources of discrepancy.' },
          { id: 'evidence-limits', title: 'Limits of the available evidence', text: 'Separated improved agreement in deflection from the stronger claim of a precise safety factor. The available inputs and measurements did not support that second claim.' },
          { id: 'next-information', title: 'Information needed next', text: 'Identified which model inputs and measurements required better characterisation before a more reliable structural assessment could be made.' }
        ],
        caseStudy: {
          kind: 'correlation',
          title: 'Simulation / Test Correlation',
          year: '2025–2026',
          disciplines: ['Physical testing', 'Structural modelling', 'Uncertainty analysis'],
          question: [
            'The predicted hydrofoil deflection and physical measurements showed a large discrepancy. I investigated the calculation, model inputs and test conditions.',
            'I improved the deflection prediction and identified the data gaps preventing a reliable safety-factor estimate.'
          ],
          responsibility: {
            intro: 'I led the correlation study from the initial discrepancy to the revised prediction and data-gap assessment.',
            items: [
              'I reconstructed the calculation chain behind the deflection prediction.',
              'I improved the internal physics-based deflection-prediction method.',
              'I investigated uncertainty in geometry, material properties, loads, boundary conditions and measurements.',
              'I identified the inputs and measurements that needed better characterisation.'
            ]
          },
          method: [
            'I reconstructed the calculation chain from the physical inputs to the predicted displacement. I reviewed the geometry, stiffness model, load application and supports instead of correcting the final number empirically. Each change remained tied to a physical input.',
            'I compared the revised prediction with the measurements and traced the remaining differences to uncertain inputs. The updated method substantially improved agreement with the measured deflection.'
          ],
          workflow: ['Define the measured quantity and comparison case', 'Trace the model inputs that control deflection', 'Revise the physics-based prediction method', 'Compare again and quantify the remaining uncertainty'],
          uncertainties: [
            { title: 'Geometry', text: 'Differences between the physical appendage and model geometry changed stiffness and displacement.' },
            { title: 'Laminate & materials', text: 'Laminate definitions and material properties required better characterisation.' },
            { title: 'Applied loads', text: 'Force magnitude, position and load introduction affected both test and model response.' },
            { title: 'Boundary conditions', text: 'Fixture and support stiffness had to match the model constraints.' },
            { title: 'Measurements', text: 'Sensor accuracy, position and reference affected the comparison.' }
          ],
          testing: [
            'Navier’s wider test programme used physical load and deflection measurements, strain gauges, load cells, DAQ, waterproof sensor housings and purpose-built hardware. This correlation study used the measurements relevant to the deflection comparison.',
            'I compared the measured quantity, applied load and physical support conditions with the model. The fixture, geometry and load path required better characterisation before calculating a precise safety factor.'
          ],
          conclusions: [
            { title: 'What improved', text: 'The revised method substantially improved agreement between the deflection prediction and physical measurements.' },
            { title: 'What remained unresolved', text: 'The available measurements were insufficient to determine a precise structural safety factor.' }
          ],
          conclusionContext: [
            'The remaining uncertainty came from geometry, material properties, loads, boundary conditions and measurements. I defined what needed better characterisation before calculating a safety factor.'
          ],
          nextEvidence: {
            intro: 'A precise safety-factor estimate requires better definition of:',
            items: [
              'as-built geometry and laminate definitions for the tested structure;',
              'material properties representative of the manufactured composite;',
              'applied force magnitude, position and load introduction;',
              'fixture stiffness and physical boundary conditions;',
              'measurement accuracy, sensor position and repeatability.'
            ]
          }
        }
      },
      expertise: ['validation', 'structural'], tags: ['Physical testing', 'Instrumentation', 'Model correlation'], confidential: true, homeOrder: 3,
      media: { src: 'assets/simulation-test-correlation-1280.webp', srcset: ['assets/simulation-test-correlation-640.webp', 'assets/simulation-test-correlation-1280.webp', 'assets/simulation-test-correlation-1920.webp'], alt: 'Representative structural test setup and simulation-to-test correlation diagram.', detailCaption: 'Representative test-correlation workflow — project details recreated for confidentiality.', representative: true, width: 1672, height: 941, layout: 'wide', theme: 'light', fit: 'contain' },
      details: [
        { id: 'assumptions', title: 'Modelling assumptions', text: 'Assessed boundary conditions, loads, material properties and geometry in the simulation-to-test comparison. These assumptions were examined alongside the physical test setup.', items: ['Boundary conditions and applied loads', 'Material properties and composite behaviour', 'Geometry represented in the model'] },
        { id: 'test-setup', title: 'Test setup & instrumentation', text: 'Worked on physical test development and assessed the instrumentation and setup used for the comparison. The assessment considered how the experimental arrangement relates to the constraints represented in the model.' },
        { id: 'comparison', title: 'Simulation–test comparison', text: 'Compared structural predictions with measured behaviour and investigated discrepancies by examining model assumptions and the experimental setup. Composite verification tools supported the review of simulation outputs.' }
      ],
      sections: {
        context: 'Simulation and physical testing of composite hydrofoil structures at Navier.',
        problem: 'Determine how model predictions relate to measured behaviour and investigate discrepancies.',
        constraints: ['Boundary conditions', 'Material properties', 'Instrumentation', 'Test setup'],
        approach: 'Examine the model and experiment together: loads, geometry, fixtures and measurement assumptions.',
        development: 'Simulation review and comparison with physical measurements, supported by composite verification tools.',
        physical: 'Physical test development and instrumentation form the experimental side of the study.',
        validation: 'Compared simulation outputs and measurements, then examined which assumptions could explain differences.',
        outcome: 'The prediction improved; the measurements remained insufficient for a precise safety-factor estimate.',
        contribution: 'Compared predicted and measured deflection, improved the prediction method and identified the remaining data gaps.'
      }
    },
    {
      id: 'range-extender-integration', title: 'Range Extender Integration', organization: 'Navier', experience: 'navier', category: 'Mechanical design', selected: false,
      summary: 'Mechanical packaging and interface design for a marine range-extender system.',
      editorial: {
        summary: 'Mechanical integration of a marine generator system, with components released for manufacturing.',
        expertise: ['development', 'integration', 'manufacturing'],
        tags: ['Mechanical design', 'Technical drawings', 'Supplier follow-up'],
        sections: {
          problem: 'Integrate a range-extender generator into a constrained marine environment, accounting for packaging, mechanical interfaces, assembly and environmental exposure.',
          contribution: 'Designed the mounting hardware and interfaces, released drawings and updated the design from supplier and assembly feedback.',
          outcome: 'Released integration components for manufacturing to support assembly of the range-extender system.'
        },
        details: [
          { id: 'interface-tradeoffs', title: 'Interfaces and packaging', text: 'Developed mechanical interfaces and packaging solutions around the available envelope, assembly sequence and environmental exposure.' },
          { id: 'manufacturing-feedback', title: 'From drawings to manufacturing feedback', text: 'Prepared manufacturing documentation, followed suppliers and incorporated manufacturing and integration feedback into design updates.' }
        ],
        caseStudy: {
          kind: 'range-extender',
          title: 'Range Extender Integration',
          year: '2025–2026',
          disciplines: ['Mechanical design', 'Systems integration', 'Manufacturing release'],
          challenge: [
            'Navier needed to integrate a generator-based range extender into a constrained hydrofoil-boat architecture.',
            'The system had to fit within the available volume while maintaining structural interfaces, assembly access and protection from the marine environment.'
          ],
          whatIDid: [
            'Developed packaging layouts and mechanical interfaces.',
            'Designed mounting and integration components in CAD.',
            'Defined environmental-protection and sealing concepts.',
            'Produced 2D drawings and manufacturing documentation.',
            'Coordinated sourcing and supplier follow-up.',
            'Incorporated manufacturing and assembly feedback into design updates.'
          ],
          constraints: [
            { title: 'Packaging', text: 'Fit the system within the available vessel envelope.' },
            { title: 'Interfaces', text: 'Connect the generator package to the surrounding structure through defined mounting points and load paths.' },
            { title: 'Assembly & access', text: 'Maintain installation, service and maintenance access.' },
            { title: 'Marine exposure', text: 'Account for splash, humidity and salt through protection and sealing concepts.' }
          ],
          outcome: [
            'Released the integration components for manufacturing and supported their assembly into the range-extender system.'
          ]
        }
      },
      expertise: ['integration', 'development'], tags: ['System architecture', 'Packaging', 'Assembly'], confidential: true,
      media: { src: 'assets/range-extender-integration-1280.webp', srcset: ['assets/range-extender-integration-640.webp', 'assets/range-extender-integration-1280.webp', 'assets/range-extender-integration-1920.webp'], alt: 'Representative marine range-extender packaging and mechanical integration concept.', detailCaption: 'Representative integration concept — project details modified for confidentiality.', representative: true, width: 1448, height: 1086, layout: 'wide', theme: 'light', fit: 'contain' },
      sections: {
        context: 'Range-extender integration within a hybrid-electric boat programme at Navier.',
        problem: 'Fit the generator and its mechanical interfaces into the available vessel envelope.',
        constraints: ['Packaging', 'Interfaces', 'Sealing', 'Assembly access', 'Marine environment'],
        approach: 'Consider the installation as a system of mechanical interfaces and assembly constraints.',
        development: 'Mechanical packaging, CAD development and interface definition.',
        physical: 'Assembly requirements and manufacturing constraints inform the integration work.',
        validation: null,
        outcome: 'The integration components were released for manufacturing and supported through assembly.',
        contribution: 'Designed the mounting hardware and interfaces, released drawings and updated the design from assembly feedback.'
      }
    }
  ]
};
