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
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-mono text-primary animate-cyber-glow mb-2">
          🌍 EL MUNDO EN {selectedYear}
        </h2>
        <p className="text-accent font-mono">Selecciona un país para explorar</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-4xl">
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
            
            <HoverCardContent className="w-80 p-6 bg-card/90 backdrop-blur-md border-primary/50">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{country.flag}</span>
                  <h3 className="text-lg font-mono text-primary">{country.name} - {selectedYear}</h3>
                </div>
                
                {/* Placeholder for image */}
                <div className="w-full h-32 bg-muted/20 border border-accent/30 rounded-lg flex items-center justify-center">
                  <span className="text-muted font-mono text-sm">
                    [IMAGEN - {country.name} {selectedYear}]
                  </span>
                </div>
                
                {/* Lorem ipsum content */}
                <div className="text-sm text-foreground space-y-2">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                    laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-primary font-mono text-xs">
                    Datos contextuales para {country.name} en el año {selectedYear}
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