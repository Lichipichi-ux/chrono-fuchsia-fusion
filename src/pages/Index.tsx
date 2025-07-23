import { useState, useEffect } from 'react';
import { CyberpunkPanel } from '@/components/CyberpunkPanel';
import { InteractivePlanet } from '@/components/InteractivePlanet';
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (currentScreen !== 'initial') {
          setCurrentScreen('initial');
          setSelectedYear(null);
        }
      }
      if (e.key === 'Enter' && currentScreen === 'initial') {
        handleStartExperience();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen]);

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
          <div className="min-h-screen flex items-center justify-center">
            {/* Background Planet */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <InteractivePlanet />
            </div>
            
            {/* Centered Main Button */}
            <div className="relative z-20 text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold text-primary animate-cyber-glow">
                  CYBER CHRONOS
                </h1>
                <h2 className="text-3xl text-accent">
                  VISIONS
                </h2>
                <p className="text-muted-foreground text-lg">
                  Explora el futuro de la humanidad
                </p>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleStartExperience}
                  className="
                    px-12 py-6 
                    bg-primary/10 text-primary 
                    border-2 border-primary 
                    font-mono text-2xl font-bold
                    hover:bg-primary/20 hover:scale-105
                    focus:bg-primary/20 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30
                    transition-all duration-300
                    animate-cyber-pulse
                    shadow-lg shadow-primary/30
                    rounded-lg
                  "
                  autoFocus
                >
                  MÍRALO CON TUS PROPIOS OJOS
                </button>
              </div>
              
              <p className="text-muted-foreground text-sm">
                Presiona Enter o haz clic para comenzar
              </p>
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