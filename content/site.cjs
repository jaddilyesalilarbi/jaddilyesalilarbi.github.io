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
  resumePage: {
    title: 'Resume',
    headline: 'Mechanical engineering across the hardware-development loop.',
    intro: 'Mechanical engineer working across design, systems integration, structural analysis, manufacturing and testing. Experience on full-scale electric, hybrid and hydrogen marine hardware at Navier and EPFL Solar Boat, from CAD and FEA through manufacturing, assembly, instrumentation and validation.',
    instruction: 'Select a skill to highlight where I applied it.',
    skills: [
      { id: 'mechanical-design', name: 'Mechanical Design', description: 'Mechanical parts, packaging, interfaces and production-ready hardware.' },
      { id: 'systems-integration', name: 'Systems Integration', description: 'Equipment layout, interfaces, routing, access and vehicle-level constraints.' },
      { id: 'structural-fea', name: 'Structural Simulation / FEA', description: 'Nonlinear and composite analysis used to size, challenge and validate hardware.' },
      { id: 'manufacturing-assembly', name: 'Manufacturing & Assembly', description: 'Composite production, machining, assembly and production support.' },
      { id: 'testing-instrumentation', name: 'Testing & Instrumentation', description: 'Physical testing, sensors, DAQ and simulation-to-test correlation.' },
      { id: 'leadership-teaching', name: 'Leadership & Teaching', description: 'Technical leadership, engineering coordination and teaching responsibility.' }
    ],
    experiences: [
      {
        id: 'resume-navier',
        organization: 'Navier',
        role: 'Mechanical Engineering Intern',
        period: 'Oct 2025 – Apr 2026',
        location: 'Alameda, California, USA',
        summary: 'Mechanical engineering on pre-series hydrofoil boats, spanning subsystem design, integration, composite structures, production support, testing and validation.',
        missions: [
          { id: 'navier-hardware-ownership', text: 'Owned 15+ mechanical parts and subsystems through CAD, sourcing, analysis, manufacturing, assembly, testing and design iteration.', tags: ['mechanical-design', 'systems-integration', 'manufacturing-assembly', 'testing-instrumentation'], visibility: 'summary' },
          { id: 'navier-range-extender-integration', text: 'Designed and integrated key mechanical elements of a marine range-extender system, from packaging and interfaces through manufacturing release.', tags: ['mechanical-design', 'systems-integration'], visibility: 'summary' },
          { id: 'navier-hydrofoil-fea', text: 'Performed nonlinear structural analyses on full-scale composite hydrofoil assemblies, including ~1.5 m foils and ~2 m struts.', tags: ['structural-fea'], visibility: 'summary' },
          { id: 'navier-sim-test-correlation', text: 'Led simulation-to-test correlation work to investigate discrepancies across geometry, materials, loads, boundary conditions and measurements.', tags: ['structural-fea', 'testing-instrumentation'], visibility: 'summary' },
          { id: 'navier-composite-access-hardware', text: 'Designed, sourced, manufactured and validated full-scale composite access hardware for technician access aboard the vessel.', tags: ['mechanical-design', 'structural-fea', 'manufacturing-assembly', 'testing-instrumentation'], visibility: 'detail' },
          { id: 'navier-range-extender-packaging', text: 'Developed mounting interfaces and environmental-protection concepts for range-extender hardware in a constrained marine installation.', tags: ['mechanical-design', 'systems-integration'], visibility: 'detail' },
          { id: 'navier-deflection-model', text: 'Refined a physics-based composite deflection model to improve prediction agreement with physical measurements.', tags: ['structural-fea', 'testing-instrumentation'], visibility: 'detail' },
          { id: 'navier-composite-verification', text: 'Built independent laminate-verification calculations using Classical Laminate Theory and composite failure criteria to challenge FEA results.', tags: ['structural-fea'], visibility: 'detail' },
          { id: 'navier-drawings-sourcing', text: 'Translated manufacturing, test and assembly feedback into design updates, 2D drawings and supplier-ready documentation.', tags: ['mechanical-design', 'systems-integration', 'manufacturing-assembly'], visibility: 'detail' },
          { id: 'navier-test-bench', text: 'Built and supported instrumented mechanical test setups using load measurement, torque sensing and data acquisition.', tags: ['testing-instrumentation', 'manufacturing-assembly'], visibility: 'detail' },
          { id: 'navier-strain-gauges', text: 'Implemented strain-gauge-based hydrofoil measurements, including sensor integration and waterproof protection for marine testing.', tags: ['testing-instrumentation', 'systems-integration'], visibility: 'detail' },
          { id: 'navier-production-support', text: 'Supported pre-series production through BOM and kitting work, assembly procedures, workshop improvements and design-for-manufacturing updates.', tags: ['manufacturing-assembly', 'systems-integration'], visibility: 'detail' },
          { id: 'navier-hands-on-assembly', text: 'Performed hands-on fitting, machining and assembly work to resolve design issues directly on pre-series hardware.', tags: ['manufacturing-assembly', 'mechanical-design'], visibility: 'detail' },
          { id: 'navier-field-testing', text: 'Supported prototype and on-water testing, feeding operating and assembly observations back into hardware iterations.', tags: ['testing-instrumentation', 'systems-integration', 'manufacturing-assembly'], visibility: 'detail' }
        ],
        relatedProjects: [
          { id: 'navier-structural-fea', label: 'Hydrofoil Structural Analysis' },
          { id: 'navier-test-correlation', label: 'Simulation / Test Correlation' },
          { id: 'range-extender-integration', label: 'Range Extender Integration' }
        ]
      },
      {
        id: 'resume-solar-boat',
        organization: 'EPFL Solar Boat',
        role: 'Mechanical & Hydrodynamics Lead',
        period: '2023 – 2025',
        location: 'Lausanne, Switzerland',
        summary: 'Engineering and technical leadership spanning propulsion hardware, composite structures, full-scale manufacturing and hydrogen-system integration.',
        missions: [
          { id: 'solar-lead-team', text: 'Led a 12-person Mechanical & Hydrodynamics team developing foils, propulsion systems and structural solutions.', tags: ['leadership-teaching', 'systems-integration'], visibility: 'summary' },
          { id: 'solar-full-vessel-fea', text: 'Built and iterated a full-vessel composite structural model covering the hull, internal structure, foils and appendages.', tags: ['structural-fea'], visibility: 'summary' },
          { id: 'solar-fea-test-validation', text: 'Validated composite FEA against four-point-bending tests, with 6.0% and 2.2% displacement differences in the documented configurations.', tags: ['structural-fea', 'testing-instrumentation'], visibility: 'detail' },
          { id: 'solar-composite-manufacturing', text: 'Manufactured full-scale carbon-fiber structures through lay-up, vacuum bagging, curing, demoulding and bonding.', tags: ['manufacturing-assembly'], visibility: 'summary' },
          { id: 'solar-hydrogen-integration', text: 'Integrated a fuel-cell and hydrogen-storage system while balancing structural, stability, accessibility and safety constraints.', tags: ['mechanical-design', 'systems-integration', 'structural-fea'], visibility: 'summary' },
          { id: 'solar-lead-coordination', text: 'Coordinated technical work across foils, propulsion, structures, hydrodynamics and maintenance, managing interfaces between parallel workstreams.', tags: ['leadership-teaching', 'systems-integration'], visibility: 'detail' },
          { id: 'solar-torpedo-design', text: 'Engineered torpedo propulsion hardware, including gearbox housing, packaging and mechanical integration.', tags: ['mechanical-design', 'systems-integration'], visibility: 'detail' },
          { id: 'solar-kisssoft', text: 'Sized an epicyclic gear train for torpedo propulsion using KISSsoft.', tags: ['mechanical-design'], visibility: 'detail' },
          { id: 'solar-fea-methodology', text: 'Used mesh convergence, model simplification and singularity diagnosis to distinguish numerical artifacts from physical structural limits.', tags: ['structural-fea'], visibility: 'detail' },
          { id: 'solar-laminate-definition', text: 'Defined composite laminate architectures and released 70+ parts for manufacture.', tags: ['structural-fea', 'manufacturing-assembly'], visibility: 'detail' },
          { id: 'solar-hydrogen-supports', text: 'Designed and structurally assessed composite supports for hydrogen-energy hardware under vessel load cases.', tags: ['mechanical-design', 'systems-integration', 'structural-fea'], visibility: 'detail' },
          { id: 'solar-stability-matlab', text: 'Developed a MATLAB stability model to evaluate vessel attitude and support equipment-placement decisions.', tags: ['systems-integration'], visibility: 'detail' },
          { id: 'solar-routing-access', text: 'Integrated cable routing, ventilation and maintenance-access requirements into the mechanical layout.', tags: ['mechanical-design', 'systems-integration'], visibility: 'detail' },
          { id: 'solar-maintenance-hands-on', text: 'Performed hands-on assembly and maintenance work on propulsion and mechanical hardware throughout the boat-development program.', tags: ['manufacturing-assembly', 'systems-integration'], visibility: 'detail' }
        ],
        relatedProjects: [
          { id: 'solar-boat-structural-fea', label: 'Full-Vessel Composite Structural Analysis' },
          { id: 'hydrogen-integration', label: 'Hydrogen Energy System Integration' }
        ]
      },
      {
        id: 'resume-teaching',
        organization: 'Teaching',
        role: 'Teaching — 4 years',
        period: '',
        location: '',
        summary: 'Mechanics · Thermodynamics · Electromagnetism',
        missions: [
          { id: 'teaching-theory', text: 'Taught mechanics, thermodynamics and electromagnetism through theory and exercise sessions.', tags: ['leadership-teaching'], visibility: 'summary' },
          { id: 'teaching-exercises', text: 'Led exercise sessions and live problem corrections, explaining engineering and physics methods step by step.', tags: ['leadership-teaching'], visibility: 'detail' },
          { id: 'teaching-groups', text: 'Independently taught student groups of up to ~50, including live corrections and assessment.', tags: ['leadership-teaching'], visibility: 'summary' },
          { id: 'teaching-exam-grading', text: 'Graded examinations and assessed student work in core physics subjects.', tags: ['leadership-teaching'], visibility: 'detail' }
        ],
        relatedProjects: []
      }
    ],
    education: [
      { degree: 'Master of Science in Mechanical Engineering', school: 'EPFL', period: '2023 – ongoing', detail: 'Coursework completed; Master’s thesis remaining.' },
      { degree: 'Bachelor of Science in Mechanical Engineering', school: 'EPFL', period: '2020 – 2023', detail: 'Completed.' }
    ],
    distinction: 'Ranked 1st out of approximately 400 students in Mechanical Physics.',
    toolset: [
      { name: 'CAD / CAE', items: ['3DEXPERIENCE', 'CATIA', 'SolidWorks'] },
      { name: 'Structural', items: ['Nonlinear FEA', 'Composite structures', 'Classical Laminate Theory', 'Tsai-Wu', 'Hashin', 'Mesh convergence'] },
      { name: 'Testing', items: ['Strain gauges', 'Load cells', 'DAQ', 'Simulation / test correlation'] },
      { name: 'Manufacturing', items: ['Composite lay-up', 'Vacuum bagging', 'Bonding', 'Machining', 'Mechanical assembly'] },
      { name: 'Engineering tools', items: ['MATLAB', 'Excel engineering models', 'KISSsoft', 'Python', 'C'] }
    ]
  },
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
            'EPFL Solar Boat was developing a full-scale composite hydrofoil boat from detailed design through manufacturing.',
            'I was responsible for assessing the structure as a complete system and helping define laminate designs before production.'
          ],
          whatIDid: [
            'Built and maintained a full-vessel composite model covering the hull, internal structure, floats, foil wells and appendages.',
            'Defined laminate zones and stacking sequences.',
            'Assessed planing, flight, crash, slamming and immersion load cases.',
            'Evaluated composite failure using Tsai-Wu criteria.',
            'Checked mesh convergence and investigated local numerical singularities.',
            'Iterated laminate and structural designs with the team before manufacturing.'
          ],
          analysisApproach: [
            'The model was used to evaluate global stiffness, load transfer and composite margins across the complete vessel rather than analysing isolated components independently.',
            'Local reinforcement, laminate definition and structural interfaces were updated as the design evolved.'
          ],
          physicalTesting: {
            intro: 'Four-point bending tests provided a direct comparison between simulation and physical measurements on two documented configurations.',
            comparisons: [
              { name: 'Configuration 1', measured: '20.0 mm', simulated: '18.8 mm', difference: '6.0%' },
              { name: 'Configuration 2', measured: '0.90 mm', simulated: '0.92 mm', difference: '2.2%' }
            ]
          },
          outcome: [
            'The resulting laminate and structural design progressed to manufacturing by EPFL Solar Boat and NTPT.'
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
            'Navier needed to determine whether the existing hydrofoil appendages could support an increased payload requirement.',
            'The assembly combines foils approximately 1.5 m wide with struts approximately 2 m long, so deformation and load transfer had to be assessed at assembly level.'
          ],
          whatIDid: [
            'Prepared and ran nonlinear structural models in 3DEXPERIENCE.',
            'Analysed the foil, strut and mechanical interfaces as a complete assembly.',
            'Evaluated stiffness, deformation and composite response.',
            'Checked sensitivity to geometry, laminate properties, applied loads and boundary conditions.',
            'Interpreted the results to support the retain-or-redesign decision.'
          ],
          analysisApproach: [
            { title: 'Geometry', text: 'Modelled the structural form and interfaces governing assembly stiffness.' },
            { title: 'Composite definition', text: 'Used laminate properties and orientations to assess stiffness and structural response.' },
            { title: 'Load introduction', text: 'Applied loads through the foil, strut and connections.' },
            { title: 'Boundary conditions', text: 'Matched the constraints to the physical support of the assembly.' }
          ],
          outcome: [
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
            'EPFL Solar Boat needed to integrate a hydrogen energy system into an existing composite vessel without compromising structure, stability, installation or maintenance access.',
            'The fuel-cell system, storage, supports and surrounding equipment had to work as a single mechanical integration problem.'
          ],
          whatIDid: [
            'Developed the equipment layout and mechanical integration architecture in 3DEXPERIENCE.',
            'Designed mounting supports and assessed stiffness and load transfer.',
            'Used MATLAB stability calculations to compare component positions and mass distribution.',
            'Integrated routing, ventilation and maintenance-access constraints.',
            'Iterated the layout across CAD, structural analysis, stability and installation requirements.'
          ],
          tradeoffs: [
            { title: 'Packaging ↔ stability', text: 'Component position affected both available space and vessel balance.' },
            { title: 'Support stiffness ↔ access', text: 'Mounting structures had to carry the equipment without blocking installation or maintenance.' },
            { title: 'Routing ↔ structure', text: 'Cables, ventilation and surrounding systems had to coexist with structural interfaces.' }
          ],
          outcome: [
            'The final integration layout and support structures progressed to manufacturing.'
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
            'Simulation and physical measurements showed a large discrepancy in hydrofoil deflection.',
            'The objective was to understand the source of the error, improve the prediction method and determine whether the available data supported a reliable structural safety-factor estimate.'
          ],
          whatIDid: [
            'Reconstructed the calculation chain behind the predicted deflection.',
            'Improved the internal physics-based deflection method.',
            'Compared the revised prediction with physical measurements.',
            'Investigated uncertainty in geometry, material properties, applied loads, boundary conditions and measurements.',
            'Identified the additional inputs required for a reliable safety-factor estimate.'
          ],
          physicalEvidence: [
            'The study combined structural testing with physical load and deflection measurements, strain gauges and data acquisition.',
            'The comparison between predicted and measured behaviour was used to distinguish modelling limitations from uncertainty in the available inputs.'
          ],
          conclusions: [
            { title: 'What improved', text: 'The revised method substantially improved agreement between predicted and measured deflection.' },
            { title: 'What remained unresolved', text: 'The available measurements were insufficient to determine a precise structural safety factor.' }
          ],
          conclusionContext: [
            'The study identified the geometry, material, load, boundary-condition and measurement data that required better characterisation before calculating one.'
          ]
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
