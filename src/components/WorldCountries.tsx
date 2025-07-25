import { useState, useEffect, useRef } from 'react';

interface Country {
  name: string;
  flag: string;
  code: string;
}

interface WorldCountriesProps {
  selectedYear: number;
}

// Cyberpunk News Wall data structure
const newsByCountryAndYear: Record<string, Record<number, { title: string; image: string; content: string; category: string }>> = {
  DE: {
    2020: {
      title: "🇩🇪 ALEMANIA DIGITAL: Post-Pandemia Tech Surge",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      content: "Alemania implementa masivamente infraestructuras de transición energética y digitalización industrial. Las fábricas inteligentes proliferan mientras el gobierno invierte billones en redes 5G y computación cuántica para recuperarse de la crisis sanitaria global.",
      category: "INNOVACIÓN INDUSTRIAL"
    },
    2025: {
      title: "🇩🇪 GERMANY LEADS: Autonomous Vehicle Revolution",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "Los vehículos eléctricos autónomos dominan las autopistas alemanas. BMW, Mercedes y Volkswagen lanzan flotas completamente automatizadas. Las redes inteligentes distribuyen energía renovable con eficiencia del 97%, estableciendo el estándar mundial.",
      category: "MOVILIDAD FUTURA"
    },
    2030: {
      title: "🇩🇪 GREEN TECH EMPIRE: Carbon-Neutral Achievement",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      content: "Alemania se convierte oficialmente en carbono-neutral, liderando la economía circular global. Tecnologías de captura de carbono y biorreactores urbanos transforman ciudades en pulmones verdes.",
      category: "SOSTENIBILIDAD"
    },
    2035: {
      title: "🇩🇪 POST-CARBON SOCIETY: Manufacturing Revolution",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      content: "La sociedad post-carbono alemana revoluciona la manufactura con impresión 3D molecular y ensamblaje atómico. Los productos se fabrican localmente usando materiales reciclados al 100%.",
      category: "MANUFACTURA AVANZADA"
    },
    2040: {
      title: "🇩🇪 AI INFRASTRUCTURE: Smart Cities Network",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      content: "Berlín, Munich y Hamburgo se integran completamente con IA. Los sistemas urbanos se auto-optimizan en tiempo real: tráfico, energía, residuos y seguridad.",
      category: "CIUDADES INTELIGENTES"
    },
    2045: {
      title: "🇩🇪 BIOTECH PIONEER: Personalized Medicine Era",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      content: "Alemania lidera la medicina personalizada con terapias génicas diseñadas individualmente. Los órganos se cultivan a partir de células madre del paciente.",
      category: "BIOTECNOLOGÍA"
    },
    2050: {
      title: "🇩🇪 GLOBAL SUSTAINABILITY MODEL: Tech Innovation Hub",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      content: "Alemania se establece como el modelo global de sostenibilidad e innovación. Sus ciudades flotantes sobre el Rin generan energía y alimentos de forma autónoma.",
      category: "LIDERAZGO GLOBAL"
    }
  },
  US: {
    2020: { title: "🇺🇸 USA CRISIS RESPONSE: Tech Policy Debates", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Estados Unidos enfrenta debates intensos sobre políticas tecnológicas mientras responde a la crisis sanitaria.", category: "POLÍTICA TECNOLÓGICA" },
    2025: { title: "🇺🇸 BIOTECH BOOM: Renewable Energy Revolution", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Un impulso masivo del gobierno federal hacia biotecnología y energías renovables transforma la economía americana.", category: "REVOLUCIÓN ENERGÉTICA" },
    2030: { title: "🇺🇸 DIGITAL TRANSFORMATION: Commercial Space Era", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833", content: "La transformación digital se completa mientras SpaceX y Blue Origin comercializan el espacio.", category: "ERA ESPACIAL" },
    2035: { title: "🇺🇸 QUANTUM LEADERSHIP: Future Work Revolution", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Estados Unidos domina la computación cuántica con procesadores de 10,000 qubits.", category: "COMPUTACIÓN CUÁNTICA" },
    2040: { title: "🇺🇸 HYBRID SOCIETY: Digital-Physical Fusion", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "La sociedad híbrida físico-digital se establece completamente.", category: "SOCIEDAD HÍBRIDA" },
    2045: { title: "🇺🇸 SPACE COLONIZATION: AI Revolution Peak", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Las primeras colonias permanentes en Marte albergan 100,000 estadounidenses.", category: "COLONIZACIÓN ESPACIAL" },
    2050: { title: "🇺🇸 POST-SCARCITY SOCIETY: Interplanetary Exploration", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Estados Unidos alcanza una sociedad post-escasez con abundancia energética ilimitada.", category: "SOCIEDAD POST-ESCASEZ" }
  },
  JP: {
    2020: { title: "🇯🇵 JAPAN ADAPTS: Medical Robotics Innovation", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Japón innova en robótica médica para adaptarse al envejecimiento poblacional.", category: "ROBÓTICA MÉDICA" },
    2025: { title: "🇯🇵 AI HEALTHCARE: Home Automation Boom", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "La IA se expande masivamente en cuidados de salud y automatización doméstica.", category: "AUTOMATIZACIÓN DOMÉSTICA" },
    2030: { title: "🇯🇵 SMART CITIES: Urban Sustainability Advanced", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Tokio se transforma en la primera megaciudad completamente inteligente y sostenible.", category: "CIUDADES INTELIGENTES" },
    2035: { title: "🇯🇵 BRAIN-COMPUTER INTERFACE: Social Robotics Revolution", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Japón revoluciona las interfaces cerebro-computadora y robótica social.", category: "INTERFACES NEURALES" },
    2040: { title: "🇯🇵 AUTOMATED SOCIETY: Extended Longevity Era", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833", content: "La sociedad japonesa alcanza automatización completa.", category: "SOCIEDAD AUTOMATIZADA" },
    2045: { title: "🇯🇵 VR-PHYSICAL FUSION: Daily Life Revolution", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "La fusión entre realidad virtual y física se completa en la vida cotidiana japonesa.", category: "REALIDADES MÚLTIPLES" },
    2050: { title: "🇯🇵 HUMAN-AI COEXISTENCE: Dimensional Exploration", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Japón se convierte en el modelo mundial de convivencia humano-IA.", category: "COEXISTENCIA AVANZADA" }
  },
  FR: { 2020: { title: "🇫🇷 FRANCE GREEN", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Francia fortalece políticas ambientales.", category: "CULTURA DIGITAL" }, 2025: { title: "🇫🇷 NUCLEAR LEADERSHIP", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Francia lidera energía nuclear avanzada.", category: "ENERGÍA NUCLEAR" }, 2030: { title: "🇫🇷 GASTRONOMIC REVOLUTION", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Revolución gastronómica francesa.", category: "GASTRONOMÍA FUTURA" }, 2035: { title: "🇫🇷 SUSTAINABLE FASHION", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Centro europeo de moda sostenible.", category: "MODA SOSTENIBLE" }, 2040: { title: "🇫🇷 MULTICULTURAL SOCIETY", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833", content: "Sociedad multicultural avanzada.", category: "SOCIEDAD MULTICULTURAL" }, 2045: { title: "🇫🇷 TRADITION-TECH FUSION", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Fusión perfecta tradición-tecnología.", category: "EXPERIENCIAS INMERSIVAS" }, 2050: { title: "🇫🇷 QUALITY OF LIFE", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Referente mundial calidad de vida.", category: "HUMANISMO TECNOLÓGICO" } },
  BR: { 2020: { title: "🇧🇷 BRAZIL DIGITAL", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Brasil digitaliza biodiversidad.", category: "BIODIVERSIDAD DIGITAL" }, 2025: { title: "🇧🇷 SMART AGRICULTURE", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Revolución agricultura inteligente.", category: "AGRICULTURA INTELIGENTE" }, 2030: { title: "🇧🇷 BIOECONOMY LEADERSHIP", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Liderazgo bioeconomía mundial.", category: "BIOECONOMÍA" }, 2035: { title: "🇧🇷 GREEN DEVELOPMENT", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Modelo desarrollo verde.", category: "DESARROLLO VERDE" }, 2040: { title: "🇧🇷 DIGITAL INTEGRATION", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Integración digital sociedad.", category: "INTEGRACIÓN DIGITAL" }, 2045: { title: "🇧🇷 ARTIFICIAL ECOSYSTEMS", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Centro investigación ecosistemas.", category: "ECOSISTEMAS ARTIFICIALES" }, 2050: { title: "🇧🇷 NATURE-TECH FUSION", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833", content: "Fusión naturaleza-tecnología.", category: "FUSIÓN PERFECTA" } },
  CN: { 2020: { title: "🇨🇳 CHINA RECOVERY", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "China acelera recuperación 5G.", category: "RECUPERACIÓN TECNOLÓGICA" }, 2025: { title: "🇨🇳 SMART MANUFACTURING", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Liderazgo manufactura inteligente.", category: "MANUFACTURA INTELIGENTE" }, 2030: { title: "🇨🇳 CASHLESS SOCIETY", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Sociedad sin efectivo.", category: "SOCIEDAD SIN EFECTIVO" }, 2035: { title: "🇨🇳 AI SUPERPOWER", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Superpotencia IA.", category: "SUPERPOTENCIA IA" }, 2040: { title: "🇨🇳 DIGITAL SOCIETY", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Sociedad digital completa.", category: "SOCIEDAD DIGITAL" }, 2045: { title: "🇨🇳 ANCIENT-FUTURE FUSION", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833", content: "Fusión filosofía-tecnología.", category: "FILOSOFÍA TECNOLÓGICA" }, 2050: { title: "🇨🇳 HYBRID CIVILIZATION", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Civilización híbrida.", category: "CIVILIZACIÓN HÍBRIDA" } },
  GB: { 2020: { title: "🇬🇧 UK BREXIT", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Reino Unido fintech.", category: "FINTECH REVOLUTION" }, 2025: { title: "🇬🇧 FINTECH HUB", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Hub mundial fintech.", category: "EDUCACIÓN VIRTUAL" }, 2030: { title: "🇬🇧 MEDICAL RESEARCH", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Liderazgo investigación médica.", category: "INVESTIGACIÓN MÉDICA" }, 2035: { title: "🇬🇧 CULTURAL INNOVATION", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Centro innovación cultural.", category: "INNOVACIÓN CULTURAL" }, 2040: { title: "🇬🇧 POST-WORK SOCIETY", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Sociedad post-trabajo.", category: "SOCIEDAD POST-TRABAJO" }, 2045: { title: "🇬🇧 DIGITAL MONARCHY", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Monarquía digital.", category: "DEMOCRACIA DIGITAL" }, 2050: { title: "🇬🇧 GLOBAL LABORATORY", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833", content: "Laboratorio mundial.", category: "LABORATORIO GLOBAL" } },
  ES: { 2020: { title: "🇪🇸 SPAIN SOLAR", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "España turismo digital.", category: "TURISMO DIGITAL" }, 2025: { title: "🇪🇸 RENEWABLE LEADERSHIP", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Liderazgo renovable.", category: "LIDERAZGO RENOVABLE" }, 2030: { title: "🇪🇸 MEDITERRANEAN AGRICULTURE", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Agricultura mediterránea.", category: "AGRICULTURA MEDITERRÁNEA" }, 2035: { title: "🇪🇸 LONGEVITY CENTER", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Centro longevidad.", category: "MEDICINA PREVENTIVA" }, 2040: { title: "🇪🇸 MULTICULTURAL FUSION", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833", content: "Fusión multicultural.", category: "FUSIÓN MULTICULTURAL" }, 2045: { title: "🇪🇸 WORK-LIFE BALANCE", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Equilibrio vida-trabajo.", category: "EQUILIBRIO VITAL" }, 2050: { title: "🇪🇸 TECH PARADISE", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Paraíso tecnológico.", category: "PARAÍSO TECNOLÓGICO" } },
  AU: { 2020: { title: "🇦🇺 AUSTRALIA CLIMATE", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Gestión crisis climáticas.", category: "GESTIÓN CLIMÁTICA" }, 2025: { title: "🇦🇺 SPACE MINING", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Minería espacial.", category: "MINERÍA ESPACIAL" }, 2030: { title: "🇦🇺 ECOSYSTEM PROTECTION", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Protección ecosistemas.", category: "PROTECCIÓN ECOSISTÉMICA" }, 2035: { title: "🇦🇺 EXTREME SURVIVAL", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Supervivencia extrema.", category: "SUPERVIVENCIA EXTREMA" }, 2040: { title: "🇦🇺 RESILIENT SOCIETY", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Sociedad resiliente.", category: "SOCIEDAD RESILIENTE" }, 2045: { title: "🇦🇺 EXTRATERRESTRIAL RESEARCH", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Investigación extraterrestre.", category: "INVESTIGACIÓN EXTRATERRESTRE" }, 2050: { title: "🇦🇺 CIVILIZATION-NATURE", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833", content: "Coexistencia perfecta.", category: "COEXISTENCIA PERFECTA" } },
  CA: { 2020: { title: "🇨🇦 CANADA INCLUSIVE", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Políticas inclusivas.", category: "POLÍTICAS INCLUSIVAS" }, 2025: { title: "🇨🇦 ETHICAL AI", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "IA ética.", category: "IA ÉTICA" }, 2030: { title: "🇨🇦 MULTICULTURAL DIGITALIZATION", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", content: "Digitalización multicultural.", category: "CIUDADES ÁRTICAS" }, 2035: { title: "🇨🇦 PERSONALIZED MEDICINE", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7", content: "Medicina personalizada.", category: "BIOTECNOLOGÍA DEL FRÍO" }, 2040: { title: "🇨🇦 DIGITAL DEMOCRACY", image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833", content: "Democracia digital.", category: "DEMOCRACIA DIGITAL" }, 2045: { title: "🇨🇦 EXTREME SURVIVAL", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5", content: "Supervivencia extrema.", category: "INVESTIGACIÓN EXTREMA" }, 2050: { title: "🇨🇦 TERRESTRIAL-POLAR", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb", content: "Exploración polar.", category: "EXPLORACIÓN POLAR" } }
};

export const WorldCountries = ({ selectedYear }: WorldCountriesProps) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const countries: Country[] = [
    { name: 'Alemania', flag: '🇩🇪', code: 'DE' },
    { name: 'Estados Unidos', flag: '🇺🇸', code: 'US' },
    { name: 'Japón', flag: '🇯🇵', code: 'JP' },
    { name: 'Francia', flag: '🇫🇷', code: 'FR' },
    { name: 'Brasil', flag: '🇧🇷', code: 'BR' },
    { name: 'China', flag: '🇨🇳', code: 'CN' },
    { name: 'Reino Unido', flag: '🇬🇧', code: 'GB' },
    { name: 'España', flag: '🇪🇸', code: 'ES' },
    { name: 'Australia', flag: '🇦🇺', code: 'AU' },
    { name: 'Canadá', flag: '🇨🇦', code: 'CA' },
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCountryCode) {
        // ESC to close news wall
        if (e.key === 'Escape') {
          setSelectedCountryCode(null);
          return;
        }
        return;
      }

      // Arrow key navigation
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % countries.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + countries.length) % countries.length);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.min(prev + 5, countries.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 5, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        setSelectedCountryCode(countries[focusedIndex].code);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCountryCode, focusedIndex, countries]);

  const handleCountryClick = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
  };

  const selectedNews = selectedCountryCode 
    ? newsByCountryAndYear[selectedCountryCode]?.[selectedYear] 
    : null;

  return (
    <div ref={containerRef} className="flex flex-col items-center space-y-8 overflow-x-hidden max-w-full">
      <div className="text-center">
        <h2 className="text-4xl font-mono text-primary animate-cyber-glow mb-2">
          🌍 EL MUNDO EN {selectedYear}
        </h2>
        <p className="text-accent font-mono">
          {selectedCountryCode ? 'Presiona ESC para volver' : 'Usa las flechas para navegar, Enter para seleccionar'}
        </p>
      </div>

      {/* Country Selection Buttons */}
      {!selectedCountryCode && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-4xl overflow-x-hidden">
          {countries.map((country, index) => (
            <button
              key={country.code}
              onClick={() => handleCountryClick(country.code)}
              className={`
                relative p-4 border-2 rounded-lg font-mono
                bg-card/20 backdrop-blur-sm
                transition-all duration-300 
                before:absolute before:inset-0 before:rounded-lg
                before:animate-cyber-pulse before:border before:border-primary before:opacity-0
                ${index === focusedIndex 
                  ? 'border-primary bg-primary/20 shadow-lg shadow-primary/50 before:opacity-100 scale-105' 
                  : 'border-accent/50 hover:border-primary hover:bg-primary/10 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 hover:before:opacity-100'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-2xl font-bold text-primary">{country.code}</span>
                <span className="text-xs text-foreground">{country.flag}</span>
              </div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
              {index === focusedIndex && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Cyberpunk News Wall */}
      {selectedCountryCode && selectedNews && (
        <div className="w-full max-w-6xl mx-auto p-6 relative">
          {/* Background Matrix effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl" />
          <div className="absolute inset-0 bg-card/90 backdrop-blur-md border border-primary/30 rounded-2xl shadow-2xl shadow-primary/20" />
          
          {/* Content */}
          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-primary/30 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50">
                  <span className="text-xl font-mono text-primary font-bold">{selectedCountryCode}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-mono text-primary font-bold">{selectedNews.title}</h3>
                  <p className="text-sm text-accent font-mono">{selectedNews.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCountryCode(null)}
                className="w-8 h-8 bg-accent/20 hover:bg-accent/40 rounded-lg border border-accent/50 hover:border-accent transition-all duration-300 flex items-center justify-center text-accent hover:text-foreground"
              >
                ✕
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden border border-primary/30 shadow-lg">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb";
                    }}
                  />
                </div>
                
                {/* Tech Details */}
                <div className="bg-card/50 border border-accent/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-accent">SISTEMA DE ANÁLISIS ACTIVO</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">REGIÓN:</span>
                    <span className="text-foreground">{countries.find(c => c.code === selectedCountryCode)?.name}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">PERIODO:</span>
                    <span className="text-foreground">{selectedYear}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">CATEGORÍA:</span>
                    <span className="text-primary">{selectedNews.category}</span>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-4">
                <div className="bg-card/30 border border-primary/20 rounded-lg p-6">
                  <h4 className="text-lg font-mono text-primary mb-4 border-b border-primary/20 pb-2">
                    REPORTE DE SITUACIÓN
                  </h4>
                  <p className="text-foreground leading-relaxed text-sm">
                    {selectedNews.content}
                  </p>
                </div>

                {/* Cyber Status */}
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-primary/10 border border-primary/30 rounded p-2 text-center">
                      <div className="text-xs font-mono text-accent mb-1">STAT {i + 1}</div>
                      <div className="text-primary font-mono font-bold">{(Math.random() * 100).toFixed(0)}%</div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-primary/20 hover:bg-primary/30 border border-primary/50 hover:border-primary rounded-lg p-3 font-mono text-sm text-primary transition-all duration-300">
                    ANALIZAR DATOS
                  </button>
                  <button className="flex-1 bg-accent/20 hover:bg-accent/30 border border-accent/50 hover:border-accent rounded-lg p-3 font-mono text-sm text-accent transition-all duration-300">
                    EXPORTAR INFO
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-primary/20 pt-4 flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>📊 CENTRO DE INTELIGENCIA GLOBAL • {selectedYear}</span>
              <span>🔒 ACCESO AUTORIZADO • CLASIFICACIÓN ALTA</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
