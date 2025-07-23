import { useState } from 'react';
import { CyberpunkPanel } from '@/components/CyberpunkPanel';
import { InteractivePlanet } from '@/components/InteractivePlanet';
import { EvolvingHuman } from '@/components/EvolvingHuman';
import { CompactCountryList } from '@/components/CompactCountryList';
import { YearTimeline } from '@/components/YearTimeline';
import { ActionDropdown } from '@/components/ActionDropdown';
import { WorldCountries } from '@/components/WorldCountries';
import { HumanEvolution } from '@/components/HumanEvolution';
import { MatrixRain } from '@/components/MatrixRain';
import { NeonEffects } from '@/components/NeonEffects';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'initial' | 'timeline' | 'dropdown' | 'world' | 'evolution'>('initial');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

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

  const handleStartExperience = () => {
    setCurrentScreen('timeline');
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setCurrentScreen('dropdown');
  };

  const handleActionSelect = (action: 'world' | 'evolution' | 'menu') => {
    if (action === 'world') {
      setCurrentScreen('world');
    } else if (action === 'evolution') {
      setCurrentScreen('evolution');
    } else if (action === 'menu') {
      setCurrentScreen('initial');
      setSelectedYear(null);
    }
  };

  const handleCountrySelect = (country: any) => {
    // This will trigger the hover card functionality
    console.log('Selected country:', country);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Effects Based on Current Screen */}
      {currentScreen === 'initial' && (
        <div className="absolute inset-0 z-0">
          <CyberpunkPanel />
          <NeonEffects />
        </div>
      )}

      {currentScreen !== 'initial' && (
        <div className="absolute inset-0 z-0">
          <MatrixRain />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        
        {/* 1. Initial Screen */}
        {currentScreen === 'initial' && (
          <div className="flex min-h-screen">
            {/* Left side - Huge Interactive Planet */}
            <div className="flex-1 flex items-center justify-center">
              <InteractivePlanet />
            </div>
            
            {/* Right side - Compact Country List and Main Menu */}
            <div className="w-96 p-8 flex flex-col justify-center space-y-8">
              <div className="space-y-4 text-center">
                <h1 className="text-4xl font-bold text-primary animate-cyber-glow">
                  CYBER CHRONOS
                </h1>
                <h2 className="text-2xl text-accent">
                  VISIONS
                </h2>
                <p className="text-muted-foreground">
                  Explora el futuro de la humanidad
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-accent font-mono text-sm mb-3">Países disponibles:</p>
                  <CompactCountryList
                    countries={countries}
                    selectedIndex={0}
                    onSelect={handleCountrySelect}
                  />
                </div>
                
                <div className="text-center">
                  <button
                    onClick={handleStartExperience}
                    className="
                      w-full px-8 py-4 
                      bg-primary/10 text-primary 
                      border-2 border-primary 
                      font-mono text-lg font-bold
                      hover:bg-primary/20 hover:scale-105
                      transition-all duration-300
                      animate-cyber-pulse
                      shadow-lg shadow-primary/30
                    "
                  >
                    MÍRALO CON TUS PROPIOS OJOS
                  </button>
                  
                  <p className="text-muted-foreground text-xs mt-2">
                    Inicia la experiencia temporal
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating Evolving Human */}
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 z-30">
              <EvolvingHuman stage={0} />
            </div>
          </div>
        )}

        {/* 2. Timeline Screen */}
        {currentScreen === 'timeline' && (
          <div className="min-h-screen flex items-center justify-center p-8">
            <div className="text-center">
              <YearTimeline onYearSelect={handleYearSelect} />
            </div>
          </div>
        )}

        {/* 3. Dropdown Menu Screen */}
        {currentScreen === 'dropdown' && selectedYear && (
          <div className="min-h-screen flex items-center justify-center p-8">
            <div className="text-center space-y-8">
              <h2 className="text-4xl font-mono text-primary animate-cyber-glow">
                AÑO {selectedYear} SELECCIONADO
              </h2>
              <ActionDropdown onAction={handleActionSelect} />
            </div>
          </div>
        )}

        {/* 4. World Countries Screen */}
        {currentScreen === 'world' && selectedYear && (
          <div className="min-h-screen flex items-center justify-center p-8">
            <WorldCountries selectedYear={selectedYear} />
          </div>
        )}

        {/* 5. Human Evolution Screen */}
        {currentScreen === 'evolution' && selectedYear && (
          <div className="min-h-screen flex items-center justify-center p-8">
            <HumanEvolution selectedYear={selectedYear} />
          </div>
        )}

      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="px-4 py-2 bg-card/80 backdrop-blur-sm border border-accent/30 rounded-lg">
          <p className="text-muted-foreground text-xs font-mono text-center">
            {currentScreen === 'initial' && 'Haz clic en el botón para comenzar'}
            {currentScreen === 'timeline' && 'Selecciona un año para explorar'}
            {currentScreen === 'dropdown' && 'Elige qué quieres explorar'}
            {currentScreen === 'world' && 'Pasa el mouse sobre un país para ver detalles'}
            {currentScreen === 'evolution' && 'Observa la evolución humana en el tiempo'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;