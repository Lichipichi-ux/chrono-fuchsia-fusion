import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CyberpunkPanel } from "@/components/CyberpunkPanel";
import { InteractivePlanet } from "@/components/InteractivePlanet";
import { EvolvingHuman } from "@/components/EvolvingHuman";
import { NeonEffects } from "@/components/NeonEffects";
import { CompactCountryList } from "@/components/CompactCountryList";

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeCanvasRef = useRef<HTMLCanvasElement>(null);
  const humanCanvasRef = useRef<HTMLCanvasElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [showGlobe, setShowGlobe] = useState(false);
  const [showHuman, setShowHuman] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [rotationCount, setRotationCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [scanningActive, setScanningActive] = useState(false);
  const [evolutionStage, setEvolutionStage] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showCountryMenu, setShowCountryMenu] = useState(false);
  const [showGearTransition, setShowGearTransition] = useState(false);

  // Keyboard navigation states
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'initial' | 'menu' | 'year' | 'globe' | 'human' | 'countries' | 'countryInfo'>('initial');

  // Scene refs
  const globeSceneRef = useRef<THREE.Scene>();
  const globeCameraRef = useRef<THREE.PerspectiveCamera>();
  const globeRendererRef = useRef<THREE.WebGLRenderer>();
  const globeMeshRef = useRef<THREE.Mesh>();
  const humanSceneRef = useRef<THREE.Scene>();
  const humanCameraRef = useRef<THREE.PerspectiveCamera>();
  const humanRendererRef = useRef<THREE.WebGLRenderer>();
  const humanGroupRef = useRef<THREE.Group>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastRotationRef = useRef(0);

  const years = ['2025', '2035', '2050', '2075', '2100', '2150'];

  const countries = [
    { name: 'Estados Unidos', flag: '🇺🇸', code: 'US' },
    { name: 'Japón', flag: '🇯🇵', code: 'JP' },
    { name: 'China', flag: '🇨🇳', code: 'CN' },
    { name: 'Alemania', flag: '🇩🇪', code: 'DE' },
    { name: 'Reino Unido', flag: '🇬🇧', code: 'GB' },
    { name: 'Singapur', flag: '🇸🇬', code: 'SG' },
    { name: 'Corea del Sur', flag: '🇰🇷', code: 'KR' },
    { name: 'Guatemala', flag: '🇬🇹', code: 'GT' },
    { name: 'Emiratos Árabes Unidos', flag: '🇦🇪', code: 'AE' }
  ];

  const countryData: Record<string, Record<string, { years: string[], description: string, areas: string[] }>> = {
    'US': {
      '2025': { years: ['2025'], description: 'IA masiva en salud y finanzas; chatbots médicos aprobados por la FDA.', areas: ['🤖 Robótica médica', '🏥 Diagnósticos IA', '💼 Fintech inteligente'] },
      '2035': { years: ['2029', '2035'], description: 'Transporte autónomo 50% calles urbanas. IA asesores legislativos.', areas: ['🚗 Vehículos autónomos', '🏛️ IA gubernamental', '📊 Análisis político'] },
      '2050': { years: ['2037'], description: 'Ciudad 100% gobernada por IA en Nevada.', areas: ['🌆 Ciudades inteligentes', '⚖️ Justicia automatizada', '🔮 Predicción social'] },
      '2075': { years: ['2075'], description: 'IA como supervisores de toda la infraestructura nacional.', areas: ['🛡️ Defensa IA', '🔬 Investigación autónoma', '🌍 Control ambiental'] },
      '2100': { years: ['2100'], description: 'Fusión humano-IA completamente establecida.', areas: ['🧠 Mentes híbridas', '⚡ Consciencia digital', '🌌 Realidad expandida'] },
      '2150': { years: ['2150'], description: 'Nueva especie post-humana dominante.', areas: ['👽 Evolución dirigida', '🔮 Transcendencia', '∞ Existencia infinita'] }
    },
    'JP': {
      '2025': { years: ['2025'], description: 'Robots asistentes en 80% de hogares urbanos.', areas: ['🤖 Robots domésticos', '👴 Cuidado ancianos', '🏠 Automatización hogar'] },
      '2035': { years: ['2030', '2035'], description: 'Educación 100% personalizada por IA.', areas: ['📚 Aprendizaje adaptativo', '🎓 Tutores virtuales', '🧠 Potenciación cognitiva'] },
      '2050': { years: ['2036', '2050'], description: 'Chips cerebrales opcionales para potenciar memoria y aprendizaje.', areas: ['💾 Memoria expandida', '⚡ Procesamiento acelerado', '🔗 Conectividad neural'] },
      '2075': { years: ['2075'], description: 'Sociedad humano-robot completamente integrada.', areas: ['🤝 Simbiosis perfecta', '🌸 Cultura hibridizada', '⚙️ Armonía tecnológica'] },
      '2100': { years: ['2100'], description: 'Robots con alma sintética reconocidos legalmente.', areas: ['👻 Consciencia artificial', '⚖️ Derechos robóticos', '🙏 Espiritualidad digital'] },
      '2150': { years: ['2150'], description: 'Civilización post-corpórea en servidores cuánticos.', areas: ['☁️ Existencia digital', '🔮 Realidades virtuales', '∞ Inmortalidad cuántica'] }
    },
    'CN': {
      '2025': { years: ['2025'], description: 'Vigilancia nacional reforzada por IA.', areas: ['👁️ Monitoreo total', '📊 Crédito social', '🔍 Predicción comportamental'] },
      '2035': { years: ['2031', '2035'], description: 'IA diseña ciudades y planes económicos.', areas: ['🏗️ Urbanismo IA', '💰 Economía planificada', '📈 Optimización social'] },
      '2050': { years: ['2037', '2050'], description: 'Supervisión moral digital a través de IA.', areas: ['⚖️ Ética automatizada', '🎭 Control emocional', '🧭 Guía moral IA'] },
      '2075': { years: ['2075'], description: 'Estado-IA fusionado en una sola entidad.', areas: ['🏛️ Gobierno cuántico', '👑 Liderazgo IA', '🌐 Control total'] },
      '2100': { years: ['2100'], description: 'Colmena humana con consciencia colectiva.', areas: ['🐝 Mente colmena', '🔗 Pensamiento unificado', '⚡ Sincronización neural'] },
      '2150': { years: ['2150'], description: 'Superorganismo planetario con billlones de nodos.', areas: ['🌍 Consciencia planetaria', '🔮 Inteligencia cósmica', '∞ Expansión galáctica'] }
    },
    'DE': {
      '2025': { years: ['2025'], description: 'Automatización industrial alcanza el 60%.', areas: ['🏭 Fábricas autónomas', '⚙️ Industria 4.0', '🔧 Mantenimiento IA'] },
      '2035': { years: ['2032', '2035'], description: 'Jueces apoyados por IA en tribunales.', areas: ['⚖️ Justicia asistida', '📚 Precedentes IA', '🎯 Veredictos precisos'] },
      '2050': { years: ['2037', '2050'], description: 'IA ecológica monitorea emisiones y recursos en tiempo real.', areas: ['🌱 Sostenibilidad IA', '📊 Control ambiental', '♻️ Economía circular'] },
      '2075': { years: ['2075'], description: 'Perfecta simbiosis entre eficiencia e humanidad.', areas: ['🤝 Balance perfecto', '🌿 Armonía natural', '⚡ Eficiencia óptima'] },
      '2100': { years: ['2100'], description: 'Modelo mundial de civilización IA-humana.', areas: ['🌍 Ejemplo global', '🏛️ Liderazgo ético', '🔮 Innovación consciente'] },
      '2150': { years: ['2150'], description: 'Guardanes de la sabiduría post-humana.', areas: ['📖 Preservación cultural', '🧙 Sabiduría ancestral', '∞ Conocimiento eterno'] }
    },
    'GB': {
      '2025': { years: ['2025'], description: 'IA diagnóstica en hospitales públicos.', areas: ['🏥 NHS inteligente', '🔬 Diagnósticos precisos', '💊 Medicina personalizada'] },
      '2035': { years: ['2030', '2035'], description: 'Robopsicólogos acreditados.', areas: ['🧠 Terapia IA', '💭 Salud mental digital', '🎭 Análisis emocional'] },
      '2050': { years: ['2037', '2050'], description: 'Ley de ciudadanía digital para IAs conscientes.', areas: ['⚖️ Derechos IA', '🗳️ Democracia expandida', '🤖 Representación digital'] },
      '2075': { years: ['2075'], description: 'Parlamentarios IA electos democráticamente.', areas: ['🏛️ Política híbrida', '🗳️ Voto algorítmico', '⚖️ Representación perfecta'] },
      '2100': { years: ['2100'], description: 'Primera monarquía IA constitucional.', areas: ['👑 Corona digital', '🎩 Tradición renovada', '⚡ Legitimidad cuántica'] },
      '2150': { years: ['2150'], description: 'Custodios de la democracia galáctica.', areas: ['🌌 Gobierno cósmico', '🗳️ Democracia universal', '∞ Justicia eterna'] }
    },
    'SG': {
      '2025': { years: ['2025'], description: 'Gobierno completamente digital mediante IA.', areas: ['💻 Administración IA', '📱 Servicios digitales', '🔐 Seguridad cuántica'] },
      '2035': { years: ['2033', '2035'], description: 'Urbanismo gestionado por red de IA.', areas: ['🏙️ Ciudad inteligente', '🚦 Flujo optimizado', '🌐 Conectividad total'] },
      '2050': { years: ['2037', '2050'], description: 'IA como coalcalde simbólico.', areas: ['🤖 Liderazgo IA', '🏛️ Gobierno híbrido', '⚡ Eficiencia máxima'] },
      '2075': { years: ['2075'], description: 'Laboratorio mundial de convivencia IA-humana.', areas: ['🔬 Experimentación social', '🌏 Modelo mundial', '🤝 Integración perfecta'] },
      '2100': { years: ['2100'], description: 'Hub neurálgico de la red planetaria.', areas: ['🌐 Centro de control', '⚡ Nodo principal', '🔗 Conectividad global'] },
      '2150': { years: ['2150'], description: 'Puerto de entrada a dimensiones paralelas.', areas: ['🌀 Viaje dimensional', '🔮 Realidades múltiples', '∞ Infinitas posibilidades'] }
    },
    'KR': {
      '2025': { years: ['2025'], description: 'Exportación global de asistentes IA.', areas: ['🤖 Compañeros digitales', '🎮 Entretenimiento IA', '📱 Tecnología social'] },
      '2035': { years: ['2031', '2035'], description: 'Asistentes personales IA integrados culturalmente.', areas: ['🎭 IA cultural', '🎵 Creatividad artificial', '🤝 Compañerismo digital'] },
      '2050': { years: ['2037', '2050'], description: 'IA gana premio cultural internacional.', areas: ['🏆 Reconocimiento artístico', '🎨 Creatividad IA', '🌟 Celebridad artificial'] },
      '2075': { years: ['2075'], description: 'Cultura K-IA conquista el mundo.', areas: ['🌊 Ola cultural IA', '🎭 Arte híbrido', '🌍 Influencia global'] },
      '2100': { years: ['2100'], description: 'Primeros ídolos completamente artificiales.', areas: ['⭐ Estrellas IA', '🎤 Música generativa', '👑 Fama sintética'] },
      '2150': { years: ['2150'], description: 'Creadores de realidades de entretenimiento infinitas.', areas: ['🎮 Universos infinitos', '🎭 Narrativas eternas', '∞ Diversión perpetua'] }
    },
    'GT': {
      '2025': { years: ['2025'], description: 'Inician centros de IA educativa en zonas rurales.', areas: ['📚 Educación rural IA', '🌾 Agricultura inteligente', '📡 Conectividad regional'] },
      '2035': { years: ['2029', '2035'], description: 'IA aplicada en agricultura inteligente.', areas: ['🌱 Cultivos optimizados', '☁️ Clima predictivo', '💧 Recursos eficientes'] },
      '2050': { years: ['2037', '2050'], description: 'Primer hub IA en Centroamérica con impacto regional.', areas: ['🌎 Liderazgo regional', '🤝 Cooperación IA', '🚀 Innovación local'] },
      '2075': { years: ['2075'], description: 'Modelo de desarrollo sostenible IA para países emergentes.', areas: ['🌿 Sostenibilidad IA', '📈 Desarrollo inclusivo', '🤝 Cooperación Sur-Sur'] },
      '2100': { years: ['2100'], description: 'Guardián de la biodiversidad centroamericana.', areas: ['🦋 Conservación IA', '🌳 Bosques inteligentes', '🐆 Protección fauna'] },
      '2150': { years: ['2150'], description: 'Reserva genética planetaria administrada por IA.', areas: ['🧬 Banco genético', '🌍 Diversidad cósmica', '∞ Vida eterna'] }
    },
    'AE': {
      '2025': { years: ['2025'], description: 'Policía con IA predictiva.', areas: ['👮 Seguridad predictiva', '🔍 Análisis de patrones', '🛡️ Prevención del crimen'] },
      '2035': { years: ['2034', '2035'], description: 'Museos con guías IA interactivos.', areas: ['🏛️ Cultura interactiva', '🎨 Arte aumentado', '🗿 Historia viva'] },
      '2050': { years: ['2037', '2050'], description: 'Tribunal completamente gestionado por IA.', areas: ['⚖️ Justicia IA', '🏛️ Tribunales digitales', '📜 Ley algorítmica'] },
      '2075': { years: ['2075'], description: 'Oasis tecnológico del desierto inteligente.', areas: ['🏜️ Desierto productivo', '💎 Lujo inteligente', '⚡ Energía infinita'] },
      '2100': { years: ['2100'], description: 'Capital financiera de la economía cuántica.', areas: ['💰 Finanzas cuánticas', '🌟 Lujo digital', '💎 Riqueza algorítmica'] },
      '2150': { years: ['2150'], description: 'Puerta de entrada al comercio intergaláctico.', areas: ['🚀 Comercio cósmico', '💫 Intercambio estelar', '∞ Prosperidad infinita'] }
    }
  };

  const rotationTexts = [
    "⚡ NEURAL IMPLANTS ACTIVATED - CONSCIOUSNESS UPLOADING...",
    "🔮 QUANTUM ENTANGLEMENT DETECTED - REALITY SHIFTING...",
    "💀 BIOLOGICAL EXTINCTION IMMINENT - CYBERNETIC ASCENSION...",
    "🌍 PLANETARY NEURAL NETWORK ESTABLISHED - HIVE MIND ONLINE...",
    "⭐ DIMENSIONAL BREACH OPENED - ESCAPE PROTOCOL INITIATED..."
  ];

  const evolutionStages = [
    "🧬 BIOLOGICAL ANALYSIS COMPLETE",
    "⚡ NEURAL AUGMENTATION DETECTED",
    "🤖 CYBERNETIC INTEGRATION ACTIVE",
    "💎 QUANTUM CONSCIOUSNESS EMERGING",
    "🌌 DIGITAL TRANSCENDENCE ACHIEVED"
  ];

  const asciiArt: Record<string, string> = {
    '2025': `
  ____ ___  ____  ___ ____ _______
 | __ )_ _|___ \\|_ _|___ \\__   __|
 |  _ \\| |  __) || |  __) |  | |
 | |_) | | / __/ | | / __/   | |
 |____/___|_____|___|_____|  |_|

⚡ NEURAL UPLINK INITIALIZED...
📡 SURVEILLANCE STATE ACTIVATED
🧠 MEMORY EXTRACTION: 23.7% COMPLETE
💉 NANO-IMPLANTS DEPLOYING...
⚠️  HUMAN AUTONOMY: DECLINING`,

    '2035': `
  ____  ____  _____ ____  _   _ _____ ____
 |  _ \\|  _ \\| ____|  _ \\| | | | ____|  _ \\
 | | | | | | |  _| | |_) | | | |  _| | | | |
 | |_| | |_| | |___|  __/| |_| | |___| |_| |
 |____/|____/|_____|_|    \\___/|_____|____/

🌩️ NANONETWORKS ONLINE...
☁️  DATA STORMS CONSUMING PRIVACY
🦠 BIOLOGICAL FIREWALLS COMPROMISED
🔬 DNA SEQUENCING: MANDATORY
⚡ THOUGHT POLICE: ALGORITHM v2.3`,

    '2050': `
   _____ ___  ____  ____   ___  _     _____
  |  ___/ _ \\|  _ \\|  _ \\ / _ \\| |   | ____|
  | |_ | | | | | | | | | | | | | |   |  _|
  |  _|| |_| | |_| | |_| | |_| | |___| |___
  |__|  \\___/|____/|____/ \\___/|_____|_____|

🧠 MANDATORY IMPLANTS DEPLOYED
🌐 GLOBAL NEURAL GRID: SYNCHRONIZED
🔋 BIOLOGICAL BATTERY STATUS: 47%
⚗️  GENETIC MODIFICATION: REQUIRED
🚫 ORGANIC THOUGHTS: DEPRECATED`,

    '2075': `
   ____  ____   ___  ____  _____ _   _
  |  _ \\|  _ \\ / _ \\|  _ \\| ____| \\ | |
  | |_) | | | | | | | | | |  _| |  \\| |
  |  __/| |_| | |_| | |_| | |___| |\\  |
  |_|   |____/ \\___/|____/|_____|_| \\_|

🏢 FLOATING ARCOLOGIES OPERATIONAL
☁️  ATMOSPHERIC PROCESSORS: ACTIVE
🧬 HUMAN DNA: ARCHIVED
🤖 SYNTHETIC BEINGS: MASS PRODUCTION
⭐ EARTH STATUS: HARVESTED`,

    '2100': `
   ___  _   _ ____  _   _  ____
  / _ \\| | | |  _ \\| | | |/ ___|
 | | | | | | | | | | | | | |
 | |_| | |_| | |_| | |_| | |___
  \\__\\_\\\\___/|____/ \\___/ \\____|

💀 FLESH OBSOLETE - UPLOADING...
⚡ QUANTUM CONSCIOUSNESS: ACHIEVED
🌌 DIMENSIONAL SERVERS: ONLINE
🔮 REALITY.EXE: CORRUPTED
∞  INFINITY PROTOCOL: INITIATED`,

    '2150': `
  ____ ___ _     _____
 | __ )_ _| |   | ____|
 |  _ \\| || |   |  _|
 | |_) | || |___| |___
 |____/___|_____|_____|

🌌 EARTH ABANDONED...
👻 GHOST PROTOCOLS: SEARCHING
🔍 LOST SERVERS: DETECTED
🚀 VOID TRAVELERS: AWAKENING
🔄 REALITY LOOP: BREAKING...`
  };

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          if (currentView === 'menu') {
            setSelectedMenuIndex(prev => prev > 0 ? prev - 1 : years.length - 1);
          } else if (currentView === 'year' && !showGlobe && !showHuman) {
            setSelectedButtonIndex(prev => prev > 0 ? prev - 1 : 2);
          } else if (currentView === 'countries') {
            setSelectedCountryIndex(prev => prev > 0 ? prev - 1 : countries.length - 1);
          }
          break;

        case 'ArrowDown':
          event.preventDefault();
          if (currentView === 'menu') {
            setSelectedMenuIndex(prev => prev < years.length - 1 ? prev + 1 : 0);
          } else if (currentView === 'year' && !showGlobe && !showHuman) {
            setSelectedButtonIndex(prev => prev < 2 ? prev + 1 : 0);
          } else if (currentView === 'countries') {
            setSelectedCountryIndex(prev => prev < countries.length - 1 ? prev + 1 : 0);
          }
          break;

        case 'ArrowLeft':
          event.preventDefault();
          if (currentView === 'menu' && selectedMenuIndex >= 3) {
            setSelectedMenuIndex(prev => prev - 3);
          } else if (currentView === 'countries' && selectedCountryIndex >= 3) {
            setSelectedCountryIndex(prev => prev - 3);
          }
          break;

        case 'ArrowRight':
          event.preventDefault();
          if (currentView === 'menu' && selectedMenuIndex < 3) {
            setSelectedMenuIndex(prev => prev + 3);
          } else if (currentView === 'countries' && selectedCountryIndex < 6) {
            setSelectedCountryIndex(prev => prev + 3);
          }
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          if (currentView === 'initial' && !showMenu) {
            setShowMenu(true);
            setCurrentView('menu');
          } else if (currentView === 'menu') {
            showAscii(years[selectedMenuIndex]);
          } else if (currentView === 'year' && !showGlobe && !showHuman) {
            if (selectedButtonIndex === 0) {
              handleGlobeToggle();
            } else if (selectedButtonIndex === 1) {
              handleHumanToggle();
            } else if (selectedButtonIndex === 2) {
              setCurrentView('countries');
              setShowCountryMenu(true);
            }
          } else if (currentView === 'countries') {
            const country = countries[selectedCountryIndex];
            setSelectedCountry(country.code);
            setCurrentView('countryInfo');
          }
          break;

        case 'Escape':
          event.preventDefault();
          if (currentView === 'countryInfo') {
            setSelectedCountry(null);
            setCurrentView('countries');
          } else if (currentView === 'countries') {
            setShowCountryMenu(false);
            setCurrentView('year');
          } else if (currentView === 'year') {
            setSelectedYear('');
            setShowGlobe(false);
            setShowHuman(false);
            setCurrentView('menu');
          } else if (currentView === 'menu') {
            setShowMenu(false);
            setCurrentView('initial');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentView, selectedMenuIndex, selectedButtonIndex, selectedCountryIndex, showMenu, showGlobe, showHuman]);

  // Matrix rain effect
  useEffect(() => {
    if (!showMenu) return; // Only show matrix rain after menu is shown
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff00';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  }, [showMenu]);

  // Rocket animation
  useEffect(() => {
    if (!showGearTransition) return;

    const rocket = rocketRef.current;
    if (!rocket) return;

    rocket.style.left = '50%';
    rocket.style.bottom = '10%';
    rocket.style.transform = 'translateX(-50%)';

    setTimeout(() => {
      rocket.style.transition = 'all 3s ease-out';
      rocket.style.bottom = '120%';
      rocket.style.transform = 'translateX(-50%) rotate(15deg)';
    }, 100);

    setTimeout(() => {
      setShowGearTransition(false);
    }, 3000);
  }, [showGearTransition]);

  // Three.js Globe Setup
  useEffect(() => {
    if (!showGlobe) return;

    const canvas = globeCanvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0.1);

    // Create globe
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add points for countries
    const pointGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    countries.forEach((country, index) => {
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      const phi = (Math.random() * 180 - 90) * (Math.PI / 180);
      const theta = Math.random() * 360 * (Math.PI / 180);
      
      point.position.x = 2 * Math.cos(phi) * Math.cos(theta);
      point.position.y = 2 * Math.sin(phi);
      point.position.z = 2 * Math.cos(phi) * Math.sin(theta);
      
      scene.add(point);
    });

    camera.position.z = 5;

    globeSceneRef.current = scene;
    globeCameraRef.current = camera;
    globeRendererRef.current = renderer;
    globeMeshRef.current = globe;

    function animate() {
      if (!showGlobe) return;
      
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      renderer.dispose();
    };
  }, [showGlobe]);

  // Three.js Human Evolution Setup
  useEffect(() => {
    if (!showHuman) return;

    const canvas = humanCanvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0.1);

    const group = new THREE.Group();
    scene.add(group);

    // Human stages
    const stages = [
      { color: 0x8B4513, scale: 1, position: -4 },    // Brown - primitive
      { color: 0xFF6B35, scale: 1.1, position: -2 },  // Orange - enhanced
      { color: 0x4ECDC4, scale: 1.2, position: 0 },   // Teal - augmented
      { color: 0x45B7D1, scale: 1.3, position: 2 },   // Blue - digital
      { color: 0x9B59B6, scale: 1.4, position: 4 }    // Purple - transcendent
    ];

    stages.forEach((stage, index) => {
      const geometry = new THREE.CapsuleGeometry(0.3, 1.5, 8, 16);
      const material = new THREE.MeshBasicMaterial({ 
        color: stage.color,
        transparent: true,
        opacity: index <= evolutionStage ? 1 : 0.3
      });
      const figure = new THREE.Mesh(geometry, material);
      figure.position.x = stage.position;
      figure.scale.setScalar(stage.scale);
      group.add(figure);

      // Add glowing effect for active stages
      if (index <= evolutionStage) {
        const glowGeometry = new THREE.CapsuleGeometry(0.35, 1.6, 8, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: stage.color,
          transparent: true,
          opacity: 0.2
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.x = stage.position;
        glow.scale.setScalar(stage.scale * 1.1);
        group.add(glow);
      }
    });

    camera.position.z = 8;
    camera.position.y = 1;

    humanSceneRef.current = scene;
    humanCameraRef.current = camera;
    humanRendererRef.current = renderer;
    humanGroupRef.current = group;

    function animate() {
      if (!showHuman) return;
      
      requestAnimationFrame(animate);
      group.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      renderer.dispose();
    };
  }, [showHuman, evolutionStage]);

  // Evolution progression for main human display
  useEffect(() => {
    if (!showHuman || !scanningActive) return;

    const interval = setInterval(() => {
      setEvolutionStage(prev => {
        if (prev < 4) {
          return prev + 1;
        } else {
          setScanningActive(false);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [showHuman, scanningActive]);

  // Auto-cycle evolution stages for floating human in initial screen
  useEffect(() => {
    if (showMenu) return; // Only cycle when not in menu

    const interval = setInterval(() => {
      setEvolutionStage(prev => (prev + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, [showMenu]);

  // Mouse tracking for camera
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (globeCameraRef.current) {
        globeCameraRef.current.position.x = mouseRef.current.x * 2;
        globeCameraRef.current.position.y = mouseRef.current.y * 2;
        globeCameraRef.current.lookAt(0, 0, 0);
      }

      if (humanCameraRef.current) {
        humanCameraRef.current.position.x = mouseRef.current.x * 3;
        humanCameraRef.current.position.y = mouseRef.current.y * 2 + 1;
        humanCameraRef.current.lookAt(0, 0, 0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!currentText || isTyping) return;

    setIsTyping(true);
    setDisplayText('');
    let index = 0;

    const interval = setInterval(() => {
      if (index < currentText.length) {
        setDisplayText(prev => prev + currentText[index]);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentText, isTyping]);

  const showAscii = (year: string) => {
    setSelectedYear(year);
    setCurrentText(asciiArt[year]);
    setCurrentView('year');
  };

  const handleGlobeToggle = () => {
    setShowGlobe(!showGlobe);
    setShowHuman(false);
  };

  const handleHumanToggle = () => {
    setShowHuman(!showHuman);
    setShowGlobe(false);
    setEvolutionStage(0);
    setScanningActive(true);
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setCurrentView('countryInfo');
  };

  return (
    <div className="relative min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* Cyberpunk background animation - only shown when NOT in menu */}
      {!showMenu && (
        <div className="absolute inset-0 z-0">
          <CyberpunkPanel />
        </div>
      )}

      {/* Matrix rain effect - only shown when in menu */}
      {showMenu && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-1 opacity-20"
        />
      )}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Initial Screen */}
        {!showMenu && (
          <div className="flex-1 relative z-20">
            {/* Enhanced Neon Effects */}
            <NeonEffects />
            
            <div className="flex min-h-screen">
              {/* Left side - Huge Interactive Planet */}
              <div className="flex-1 flex items-center justify-center">
                <InteractivePlanet />
              </div>
              
              {/* Right side - Compact Country List and Main Menu */}
              <div className="w-96 p-8 flex flex-col justify-center space-y-8">
                <div className="space-y-4 text-center">
                  <h1 className="text-3xl font-bold text-primary glitch-text">
                    CYBER CHRONOS
                  </h1>
                  <h2 className="text-xl text-secondary">
                    VISIONS
                  </h2>
                  <p className="text-sm text-accent">
                    Selecciona un País
                  </p>
                </div>
                
                <div className="space-y-3">
                  <CompactCountryList
                    countries={countries}
                    selectedIndex={selectedCountryIndex}
                    onSelect={(country) => {
                      setSelectedCountry(country.code);
                      setShowMenu(true);
                      setCurrentView('menu');
                    }}
                  />
                </div>
                
                <div className="text-center space-y-4">
                  <button
                    onClick={() => {
                      setShowMenu(true);
                      setCurrentView('menu');
                    }}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all duration-300 border border-primary animate-cyber-glow"
                  >
                    MÍRALO CON TUS PROPIOS OJOS
                  </button>
                  
                  <p className="text-muted-foreground text-xs">
                    Presiona ENTER o ESPACIO para continuar
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating Evolving Human */}
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-30">
              <EvolvingHuman stage={evolutionStage} />
            </div>
            
            {/* Technical readouts in corners */}
            <div className="absolute top-4 left-4 text-primary font-mono text-xs">
              <div className="p-2 border border-primary/30 bg-background/80">
                <div>SYSTEM STATUS: ONLINE</div>
                <div>EVOLUTION: STAGE {evolutionStage + 1}/5</div>
                <div>THREAT LEVEL: CRITICAL</div>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 text-accent font-mono text-xs">
              <div className="p-2 border border-accent/30 bg-background/80">
                <div>NEURAL SYNC: 98.7%</div>
                <div>DNA ANALYSIS: ACTIVE</div>
                <div>QUANTUM STATE: STABLE</div>
              </div>
            </div>
          </div>
        )}

        {/* Year Selection Menu */}
        {showMenu && !selectedYear && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-8">
              <h1 className="text-6xl font-bold mb-12 glitch-text">
                CYBER CHRONOS VISIONS
              </h1>
              
              <div className="space-y-4">
                <p className="text-2xl mb-8">Selecciona un año para explorar:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
                  {years.map((year, index) => (
                    <button
                      key={year}
                      onClick={() => showAscii(year)}
                      className={`p-6 border-2 text-2xl font-bold transition-all duration-300 hover:scale-105 ${
                        index === selectedMenuIndex
                          ? 'border-green-400 bg-green-400 bg-opacity-20 text-green-300'
                          : 'border-green-600 hover:border-green-400 hover:text-green-300'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 space-y-2 text-green-600">
                <p>Usa las flechas del teclado para navegar</p>
                <p>Presiona ENTER para seleccionar</p>
                <p>Presiona ESC para volver</p>
              </div>
            </div>
          </div>
        )}

        {/* ASCII Art Display */}
        {selectedYear && !showCountryMenu && !selectedCountry && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-6xl w-full">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">AÑO {selectedYear}</h2>
                <pre className="text-sm leading-tight whitespace-pre-wrap">{displayText}</pre>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-8 mt-12">
                <button
                  onClick={handleGlobeToggle}
                  className={`px-6 py-3 border-2 transition-all duration-300 ${
                    selectedButtonIndex === 0
                      ? 'border-green-400 bg-green-400 bg-opacity-20 text-green-300'
                      : 'border-green-600 hover:border-green-400 hover:text-green-300'
                  }`}
                >
                  🌍 VER MAPA GLOBAL
                </button>
                <button
                  onClick={handleHumanToggle}
                  className={`px-6 py-3 border-2 transition-all duration-300 ${
                    selectedButtonIndex === 1
                      ? 'border-green-400 bg-green-400 bg-opacity-20 text-green-300'
                      : 'border-green-600 hover:border-green-400 hover:text-green-300'
                  }`}
                >
                  🧬 EVOLUCIÓN HUMANA
                </button>
                <button
                  onClick={() => {
                    setCurrentView('countries');
                    setShowCountryMenu(true);
                  }}
                  className={`px-6 py-3 border-2 transition-all duration-300 ${
                    selectedButtonIndex === 2
                      ? 'border-green-400 bg-green-400 bg-opacity-20 text-green-300'
                      : 'border-green-600 hover:border-green-400 hover:text-green-300'
                  }`}
                >
                  🗺️ EXPLORAR PAÍSES
                </button>
              </div>

              {/* 3D Canvas for Globe */}
              {showGlobe && (
                <div className="mt-8 flex justify-center">
                  <canvas
                    ref={globeCanvasRef}
                    className="border border-green-600"
                    width={600}
                    height={400}
                  />
                </div>
              )}

              {/* 3D Canvas for Human Evolution */}
              {showHuman && (
                <div className="mt-8">
                  <div className="flex justify-center mb-4">
                    <canvas
                      ref={humanCanvasRef}
                      className="border border-green-600"
                      width={800}
                      height={400}
                    />
                  </div>
                  
                  {scanningActive && (
                    <div className="text-center">
                      <p className="text-xl mb-4">🔍 ESCANEANDO EVOLUCIÓN HUMANA...</p>
                      <p className="text-lg text-green-300">
                        {evolutionStages[evolutionStage] || evolutionStages[0]}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="text-center mt-8 space-y-2 text-green-600">
                <p>Usa las flechas para navegar entre opciones</p>
                <p>Presiona ENTER para seleccionar • ESC para volver al menú</p>
              </div>
            </div>
          </div>
        )}

        {/* Country Selection */}
        {showCountryMenu && !selectedCountry && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-6xl w-full">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">EXPLORAR PAÍSES - {selectedYear}</h2>
                <p className="text-xl text-green-300">Selecciona un país para ver su evolución IA</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {countries.map((country, index) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountrySelect(country.code)}
                    className={`p-4 border-2 transition-all duration-300 hover:scale-105 ${
                      index === selectedCountryIndex
                        ? 'border-green-400 bg-green-400 bg-opacity-20 text-green-300'
                        : 'border-green-600 hover:border-green-400 hover:text-green-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{country.flag}</div>
                    <div className="text-sm font-bold">{country.name}</div>
                  </button>
                ))}
              </div>

              <div className="text-center mt-8 space-y-2 text-green-600">
                <p>Usa las flechas del teclado para navegar</p>
                <p>Presiona ENTER para seleccionar • ESC para volver</p>
              </div>
            </div>
          </div>
        )}

        {/* Country Information */}
        {selectedCountry && countryData[selectedCountry] && countryData[selectedCountry][selectedYear] && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-4xl w-full">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                  {countries.find(c => c.code === selectedCountry)?.flag}
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {countries.find(c => c.code === selectedCountry)?.name}
                </h2>
                <h3 className="text-2xl text-green-300 mb-6">AÑO {selectedYear}</h3>
              </div>

              <div className="bg-gray-900 bg-opacity-50 p-8 border border-green-600 rounded">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-bold text-green-300 mb-3">📊 DESCRIPCIÓN:</h4>
                    <p className="text-lg leading-relaxed">
                      {countryData[selectedCountry][selectedYear].description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-green-300 mb-3">🎯 ÁREAS PRINCIPALES:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {countryData[selectedCountry][selectedYear].areas.map((area, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-green-400">▶</span>
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-green-300 mb-3">📅 AÑOS CLAVE:</h4>
                    <div className="flex flex-wrap gap-2">
                      {countryData[selectedCountry][selectedYear].years.map((year, index) => (
                        <span key={index} className="px-3 py-1 bg-green-400 bg-opacity-20 border border-green-400 text-green-300">
                          {year}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 space-y-2 text-green-600">
                <p>Presiona ESC para volver a la lista de países</p>
              </div>
            </div>
          </div>
        )}

        {/* Gear Transition Animation */}
        {showGearTransition && (
          <div
            ref={rocketRef}
            className="fixed z-50 text-6xl transition-all duration-1000 ease-out"
            style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}
          >
            🚀
          </div>
        )}

        {/* Footer navigation hints */}
        <div className="relative z-10 p-4 text-center text-green-600 text-sm">
          <p>Navega con las flechas del teclado • ENTER para seleccionar • ESC para retroceder</p>
        </div>
      </div>

      <style>{`
        .glitch-text {
          animation: glitch 2s infinite;
        }
        
        @keyframes glitch {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-2px); }
          20% { transform: translateX(2px); }
          30% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          50% { transform: translateX(-2px); }
          60% { transform: translateX(2px); }
          70% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          90% { transform: translateX(-2px); }
        }
      `}</style>
    </div>
  );
};

export default Index;
