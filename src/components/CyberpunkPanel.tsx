import { useEffect, useState } from "react";
import { FlowingEnergy } from "./FlowingEnergy";
import { CircularElements } from "./CircularElements";
import { TechnicalReadouts } from "./TechnicalReadouts";
import { DataStreams } from "./DataStreams";
import { MatrixRain } from "./MatrixRain";
import { WaveEffects } from "./WaveEffects";

export const CyberpunkPanel = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Matrix Rain Effect */}
      <MatrixRain />

      {/* Wave Effects */}
      <WaveEffects />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: 3
        }}
      />

      {/* Corner Elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary animate-cyber-glow" style={{ zIndex: 10 }} />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-primary animate-cyber-glow" style={{ zIndex: 10 }} />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-primary animate-cyber-glow" style={{ zIndex: 10 }} />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary animate-cyber-glow" style={{ zIndex: 10 }} />

      {/* Central Flowing Energy */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 5 }}>
        <FlowingEnergy />
      </div>

      {/* Circular UI Elements */}
      <CircularElements />

      {/* Technical Readouts */}
      <TechnicalReadouts />

      {/* Data Streams */}
      <DataStreams />

      {/* Central Scanline */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-cyber-pulse" style={{ zIndex: 8 }} />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-accent to-transparent animate-cyber-pulse" style={{ zIndex: 8 }} />

      {/* Loading Animation Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-background flex items-center justify-center" style={{ zIndex: 15 }}>
          <div className="text-primary font-mono text-lg animate-cyber-pulse">INITIALIZING SYSTEM...</div>
        </div>
      )}
    </div>
  );
};