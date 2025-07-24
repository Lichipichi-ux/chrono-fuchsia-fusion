import { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface Country {
  name: string;
  flag: string;
  code: string;
}

interface WorldCountriesProps {
  selectedYear: number;
}

// Dynamic descriptions for each country-year combination
const definitions: Record<string, Record<number, string>> = {
  DE: {
    2020: "Alemania en 2020: Enfoque en la transición energética y digitalización industrial post-pandemia.",
    2025: "Alemania en 2025: Avances significativos en vehículos eléctricos y redes inteligentes.",
    2030: "Alemania en 2030: Liderazgo mundial en tecnologías verdes y economía circular.",
    2035: "Alemania en 2035: Sociedad post-carbono y revolución en manufactura sostenible.",
    2040: "Alemania en 2040: Integración completa de IA en infraestructura urbana.",
    2045: "Alemania en 2045: Pionera en biotecnología avanzada y medicina personalizada.",
    2050: "Alemania en 2050: Modelo global de sostenibilidad y innovación tecnológica."
  },
  US: {
    2020: "Estados Unidos en 2020: Respuesta a crisis sanitaria y debates sobre políticas tecnológicas.",
    2025: "Estados Unidos en 2025: Impulso masivo a investigación en biotecnología y energías renovables.",
    2030: "Estados Unidos en 2030: Transformación digital completa y exploración espacial comercial.",
    2035: "Estados Unidos en 2035: Liderazgo en computación cuántica y nuevas formas de trabajo.",
    2040: "Estados Unidos en 2040: Sociedad híbrida físico-digital y medicina regenerativa.",
    2045: "Estados Unidos en 2045: Colonización espacial y revolución en inteligencia artificial.",
    2050: "Estados Unidos en 2050: Sociedad post-escasez y exploración interplanetaria."
  },
  JP: {
    2020: "Japón en 2020: Innovación en robótica médica y adaptación al envejecimiento poblacional.",
    2025: "Japón en 2025: Expansión de IA en cuidados de salud y automatización doméstica.",
    2030: "Japón en 2030: Desarrollo de ciudades inteligentes y sostenibilidad urbana avanzada.",
    2035: "Japón en 2035: Revolución en interfaces cerebro-computadora y robótica social.",
    2040: "Japón en 2040: Sociedad completamente automatizada y longevidad extendida.",
    2045: "Japón en 2045: Fusión de realidad virtual y física en la vida cotidiana.",
    2050: "Japón en 2050: Modelo de convivencia humano-IA y exploración de nuevas dimensiones."
  },
  FR: {
    2020: "Francia en 2020: Fortalecimiento de políticas ambientales y digitalización cultural.",
    2025: "Francia en 2025: Liderazgo en energía nuclear avanzada y turismo sostenible.",
    2030: "Francia en 2030: Revolución gastronómica con alimentos sintéticos y agricultura vertical.",
    2035: "Francia en 2035: Centro europeo de innovación en moda sostenible y arte digital.",
    2040: "Francia en 2040: Sociedad multicultural avanzada y preservación digital del patrimonio.",
    2045: "Francia en 2045: Fusión de tradición y tecnología en experiencias inmersivas.",
    2050: "Francia en 2050: Referente mundial en calidad de vida y equilibrio tecnológico."
  },
  BR: {
    2020: "Brasil en 2020: Desafíos ambientales y oportunidades en biodiversidad digital.",
    2025: "Brasil en 2025: Revolución en agricultura inteligente y conservación tecnológica.",
    2030: "Brasil en 2030: Liderazgo en bioeconomía y ciudades sostenibles amazónicas.",
    2035: "Brasil en 2035: Modelo global de desarrollo verde y tecnología biomimética.",
    2040: "Brasil en 2040: Sociedad multicultural digitalmente integrada y biodiversidad protegida.",
    2045: "Brasil en 2045: Centro mundial de investigación en ecosistemas artificiales.",
    2050: "Brasil en 2050: Fusión perfecta entre naturaleza y tecnología avanzada."
  },
  CN: {
    2020: "China en 2020: Recuperación económica y aceleración en tecnología 5G.",
    2025: "China en 2025: Liderazgo mundial en manufactura inteligente y ciudades conectadas.",
    2030: "China en 2030: Sociedad sin efectivo y revolución en transporte autónomo.",
    2035: "China en 2035: Superpotencia en inteligencia artificial y computación cuántica.",
    2040: "China en 2040: Sociedad completamente digitalizada y nueva seda espacial.",
    2045: "China en 2045: Fusión de filosofía ancestral con tecnología de vanguardia.",
    2050: "China en 2050: Civilización híbrida y exploración de nuevas fronteras cósmicas."
  },
  GB: {
    2020: "Reino Unido en 2020: Navegando el Brexit y fortaleciendo servicios financieros digitales.",
    2025: "Reino Unido en 2025: Hub mundial de fintech y revolución en educación virtual.",
    2030: "Reino Unido en 2030: Liderazgo en investigación médica y desarrollo farmacéutico.",
    2035: "Reino Unido en 2035: Centro global de innovación cultural y entretenimiento inmersivo.",
    2040: "Reino Unido en 2040: Sociedad post-trabajo y nuevas formas de creatividad humana.",
    2045: "Reino Unido en 2045: Fusión de tradición monárquica con democracia digital.",
    2050: "Reino Unido en 2050: Laboratorio mundial de experimentos sociales y tecnológicos."
  },
  ES: {
    2020: "España en 2020: Transformación digital del turismo y energía solar masiva.",
    2025: "España en 2025: Liderazgo europeo en energías renovables y turismo sostenible.",
    2030: "España en 2030: Revolución en agricultura mediterránea y ciudades inteligentes.",
    2035: "España en 2035: Centro mundial de longevidad y medicina preventiva.",
    2040: "España en 2040: Sociedad multicultural y fusión de tradiciones digitales.",
    2045: "España en 2045: Modelo de equilibrio vida-trabajo en la era post-laboral.",
    2050: "España en 2050: Paraíso tecnológico y referente en calidad de vida sostenible."
  },
  AU: {
    2020: "Australia en 2020: Gestión de crisis climáticas y desarrollo de energía limpia.",
    2025: "Australia en 2025: Superpotencia en minería espacial y energía renovable.",
    2030: "Australia en 2030: Ecosistema único protegido por tecnología avanzada.",
    2035: "Australia en 2035: Laboratorio mundial de supervivencia en ambientes extremos.",
    2040: "Australia en 2040: Sociedad resiliente y tecnología de adaptación climática.",
    2045: "Australia en 2045: Centro de investigación en vida extraterrestre.",
    2050: "Australia en 2050: Modelo de coexistencia entre civilización y naturaleza salvaje."
  },
  CA: {
    2020: "Canadá en 2020: Fortalecimiento de políticas inclusivas y tecnología limpia.",
    2025: "Canadá en 2025: Liderazgo mundial en inteligencia artificial ética y recursos naturales.",
    2030: "Canadá en 2030: Sociedad multicultural digitalizada y ciudades árticas sostenibles.",
    2035: "Canadá en 2035: Pionero en medicina personalizada y biotecnología del frío.",
    2040: "Canadá en 2040: Modelo de democracia digital y desarrollo territorial inteligente.",
    2045: "Canadá en 2045: Centro mundial de investigación en supervivencia extrema.",
    2050: "Canadá en 2050: Puente entre civilización terrestre y exploración polar avanzada."
  }
};

// Dynamic image placeholders for each country-year combination
const imagePlaceholders: Record<string, Record<number, string>> = {
  DE: {
    2020: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b", // Berlin skyline
    2025: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13", // Wind turbines
    2030: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // Modern architecture
    2035: "https://images.unsplash.com/photo-1518709268805-4e9042af2176", // Solar panels
    2040: "https://images.unsplash.com/photo-1559827260-dc66d52bef19", // Smart city
    2045: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Technology lab
    2050: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"  // Future cityscape
  },
  US: {
    2020: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", // Tech workspace
    2025: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // Code on screen
    2030: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // MacBook coding
    2035: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", // Space exploration
    2040: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // Future tech
    2045: "https://images.unsplash.com/photo-1559827260-dc66d52bef19", // AI visualization
    2050: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"  // Starry night
  },
  JP: {
    2020: "https://images.unsplash.com/photo-1559827260-dc66d52bef19", // Tokyo tech
    2025: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Robotics
    2030: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // Smart city
    2035: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", // Innovation lab
    2040: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // AI interface
    2045: "https://images.unsplash.com/photo-1451187580459-43490279c0fa", // Virtual reality
    2050: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"  // Digital cosmos
  },
  FR: {
    2020: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13", // Sustainable energy
    2025: "https://images.unsplash.com/photo-1518709268805-4e9042af2176", // Green technology
    2030: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // Digital culture
    2035: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b", // Modern Paris
    2040: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // Cultural tech
    2045: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Art meets tech
    2050: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"  // Ethereal future
  },
  BR: {
    2020: "https://images.unsplash.com/photo-1518709268805-4e9042af2176", // Forest conservation
    2025: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13", // Sustainable agriculture
    2030: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", // Bio research
    2035: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // Environmental tech
    2040: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // Green cities
    2045: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Ecosystem tech
    2050: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"  // Nature harmony
  },
  CN: {
    2020: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // 5G technology
    2025: "https://images.unsplash.com/photo-1559827260-dc66d52bef19", // Smart manufacturing
    2030: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // Connected cities
    2035: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Quantum computing
    2040: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", // Digital society
    2045: "https://images.unsplash.com/photo-1451187580459-43490279c0fa", // Future philosophy
    2050: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"  // Cosmic exploration
  },
  GB: {
    2020: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // Fintech development
    2025: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // Digital finance
    2030: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Medical research
    2035: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // Cultural innovation
    2040: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", // Creative tech
    2045: "https://images.unsplash.com/photo-1559827260-dc66d52bef19", // Digital democracy
    2050: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"  // Social experiments
  },
  ES: {
    2020: "https://images.unsplash.com/photo-1518709268805-4e9042af2176", // Solar energy
    2025: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13", // Renewable tourism
    2030: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", // Smart agriculture
    2035: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Longevity research
    2040: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // Cultural fusion
    2045: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // Work-life balance
    2050: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"  // Sustainable paradise
  },
  AU: {
    2020: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13", // Clean energy
    2025: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", // Space mining
    2030: "https://images.unsplash.com/photo-1518709268805-4e9042af2176", // Protected ecosystems
    2035: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Extreme research
    2040: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", // Climate adaptation
    2045: "https://images.unsplash.com/photo-1451187580459-43490279c0fa", // Space research
    2050: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"  // Wild civilization
  },
  CA: {
    2020: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f", // Inclusive tech
    2025: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // Ethical AI
    2030: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", // Arctic cities
    2035: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", // Cold biotech
    2040: "https://images.unsplash.com/photo-1559827260-dc66d52bef19", // Digital democracy
    2045: "https://images.unsplash.com/photo-1518709268805-4e9042af2176", // Extreme survival
    2050: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"  // Polar exploration
  }
};

export const WorldCountries = ({ selectedYear }: WorldCountriesProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

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

  return (
    <div className="flex flex-col items-center space-y-8 overflow-x-hidden max-w-full">
      <div className="text-center">
        <h2 className="text-4xl font-mono text-primary animate-cyber-glow mb-2">
          🌍 EL MUNDO EN {selectedYear}
        </h2>
        <p className="text-accent font-mono">Selecciona un país para explorar</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-4xl overflow-x-hidden">
        {countries.map((country) => (
          <HoverCard key={country.code}>
            <HoverCardTrigger asChild>
              <button
                onClick={() => setSelectedCountry(country)}
                className="
                  relative p-4 border-2 border-accent/50 rounded-lg
                  bg-card/20 backdrop-blur-sm
                  hover:border-primary hover:bg-primary/10
                  transition-all duration-300 hover:scale-105
                  hover:shadow-lg hover:shadow-primary/30
                  before:absolute before:inset-0 before:rounded-lg
                  before:animate-cyber-pulse before:border before:border-primary before:opacity-0
                  hover:before:opacity-100
                "
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-4xl">{country.flag}</span>
                  <span className="font-mono text-sm text-foreground">{country.name}</span>
                </div>
                <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
              </button>
            </HoverCardTrigger>
            
            <HoverCardContent 
              side="bottom" 
              avoidCollisions={true}
              className="z-50 w-80 p-6 bg-card/95 backdrop-blur-md border-primary/50 shadow-2xl shadow-primary/20"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{country.flag}</span>
                  <h3 className="text-lg font-mono text-primary">{country.name} - {selectedYear}</h3>
                </div>
                
                {/* Dynamic image */}
                <div className="w-full h-32 rounded-lg overflow-hidden border border-accent/30">
                  <img
                    src={imagePlaceholders[country.code]?.[selectedYear] ?? "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"}
                    alt={`${country.name} en ${selectedYear}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb";
                    }}
                  />
                </div>
                
                {/* Dynamic description */}
                <div className="text-sm text-foreground space-y-2">
                  <p className="leading-relaxed">
                    {definitions[country.code]?.[selectedYear] ?? `Descripción de ${country.name} en ${selectedYear}: Datos no disponibles para este período específico.`}
                  </p>
                  <p className="text-primary font-mono text-xs border-t border-accent/20 pt-2 mt-3">
                    📊 Datos contextuales • {country.name} • {selectedYear}
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};