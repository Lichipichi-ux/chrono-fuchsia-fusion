import { useState, useEffect } from 'react';
import { EvolvingHuman } from './EvolvingHuman';

interface HumanEvolutionProps {
  selectedYear: number;
}

export const HumanEvolution = ({ selectedYear }: HumanEvolutionProps) => {
  const [currentStage, setCurrentStage] = useState(0);

  // Auto-cycle through evolution stages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % 5);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const stageDescriptions = [
    {
      title: "BIOLÓGICO",
      description: "La forma humana en su estado natural, sin modificaciones tecnológicas."
    },
    {
      title: "AUMENTO NEURAL",
      description: "Primeras implantaciones cerebrales que mejoran la capacidad cognitiva."
    },
    {
      title: "INTEGRACIÓN CIBERNÉTICA",
      description: "Extremidades y órganos reemplazados por equivalentes mecánicos avanzados."
    },
    {
      title: "CONCIENCIA CUÁNTICA",
      description: "La mente trasciende las limitaciones físicas mediante computación cuántica."
    },
    {
      title: "TRASCENDENCIA DIGITAL",
      description: "Existencia puramente digital, libre de las restricciones corporales."
    }
  ];

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-mono text-primary animate-cyber-glow mb-2">
          🧬 EVOLUCIÓN HUMANA - {selectedYear}
        </h2>
        <p className="text-accent font-mono">
          Observa cómo la humanidad trasciende sus límites biológicos
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Evolving Human Display */}
        <div className="relative">
          <div className="absolute -inset-4 border border-primary/30 rounded-lg animate-cyber-pulse" />
          <div className="relative bg-card/20 backdrop-blur-sm rounded-lg p-4 border border-accent/50">
            <EvolvingHuman stage={currentStage} />
          </div>
        </div>

        {/* DNA Animation and Description */}
        <div className="flex flex-col items-center space-y-6 max-w-md">
          {/* DNA Strand Animation */}
          <div className="relative w-32 h-48 flex items-center justify-center">
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{
                    left: `${50 + 30 * Math.cos((i / 20) * Math.PI * 4)}%`,
                    top: `${(i / 20) * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`right-${i}`}
                  className="absolute w-2 h-2 bg-accent rounded-full animate-pulse"
                  style={{
                    left: `${50 - 30 * Math.cos((i / 20) * Math.PI * 4)}%`,
                    top: `${(i / 20) * 100}%`,
                    animationDelay: `${i * 0.1 + 0.5}s`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
            
            {/* Connecting lines */}
            <div className="absolute inset-0">
              {Array.from({ length: 19 }).map((_, i) => (
                <div
                  key={`line-${i}`}
                  className="absolute w-px h-4 bg-gradient-to-b from-primary to-accent opacity-60"
                  style={{
                    left: '50%',
                    top: `${((i + 0.5) / 20) * 100}%`,
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Stage Description */}
          <div className="text-center space-y-4 p-6 bg-card/10 backdrop-blur-sm rounded-lg border border-primary/30">
            <h3 className="text-xl font-mono text-primary animate-cyber-glow">
              ETAPA {currentStage + 1}: {stageDescriptions[currentStage].title}
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {stageDescriptions[currentStage].description}
            </p>
            
            {/* Stage Progress Indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                    i === currentStage 
                      ? 'bg-primary border-primary shadow-lg shadow-primary/50' 
                      : i < currentStage 
                        ? 'bg-accent border-accent' 
                        : 'border-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Personality & Behavioral Changes */}
          <div className="w-full space-y-3">
            <h4 className="text-lg font-mono text-accent text-center">
              CAMBIOS PROYECTADOS - {selectedYear}
            </h4>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex justify-between p-2 bg-card/5 rounded border border-accent/20">
                <span className="text-muted">Capacidad cognitiva:</span>
                <span className="text-primary font-mono">+{(currentStage + 1) * 25}%</span>
              </div>
              <div className="flex justify-between p-2 bg-card/5 rounded border border-accent/20">
                <span className="text-muted">Longevidad:</span>
                <span className="text-primary font-mono">+{(currentStage + 1) * 40} años</span>
              </div>
              <div className="flex justify-between p-2 bg-card/5 rounded border border-accent/20">
                <span className="text-muted">Conectividad social:</span>
                <span className="text-primary font-mono">{currentStage < 3 ? 'Mejorada' : 'Trascendida'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Note */}
      <div className="mt-8 p-4 bg-card/5 rounded-lg border border-accent/20 max-w-2xl">
        <p className="text-xs text-muted font-mono text-center">
          NOTA TÉCNICA: Para reemplazar la animación de evolución humana, 
          elimina o comenta el componente &lt;EvolvingHuman /&gt; en línea 34 
          y pega tu arte ASCII 3D en el div contenedor con clase "relative bg-card/20 backdrop-blur-sm".
          La animación de ADN permanecerá activa.
        </p>
      </div>
    </div>
  );
};