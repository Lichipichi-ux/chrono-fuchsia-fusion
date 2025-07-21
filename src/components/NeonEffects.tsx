export const NeonEffects = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating Neon Orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-cyber-float"
          style={{
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 12}%`,
            background: `radial-gradient(circle, hsl(${300 + i * 40}, 100%, 50%) 0%, transparent 70%)`,
            boxShadow: `0 0 ${20 + i * 5}px hsl(${300 + i * 40}, 100%, 50%)`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i}s`
          }}
        />
      ))}

      {/* Scanning Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-cyber-scan" />
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-cyber-scan" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent animate-cyber-scan" style={{ animationDelay: '2s' }} />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-cyber-scan" style={{ animationDelay: '3s' }} />

      {/* Vertical scanning lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent to-transparent animate-cyber-scan-vertical" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-cyber-scan-vertical" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-secondary to-transparent animate-cyber-scan-vertical" style={{ animationDelay: '0.5s' }} />

      {/* Hexagonal decorations */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`hex-${i}`}
          className="absolute animate-cyber-pulse"
          style={{
            right: `${5 + i * 8}%`,
            bottom: `${10 + i * 15}%`,
            animationDelay: `${i * 0.7}s`
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <polygon
              points="15,2 25,8 25,22 15,28 5,22 5,8"
              fill="none"
              stroke="hsl(300, 100%, 50%)"
              strokeWidth="1"
              className="animate-cyber-glow"
            />
            <polygon
              points="15,6 21,10 21,20 15,24 9,20 9,10"
              fill="none"
              stroke="hsl(180, 100%, 50%)"
              strokeWidth="1"
              className="animate-cyber-pulse"
            />
          </svg>
        </div>
      ))}

      {/* Energy Bolts */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`bolt-${i}`}
          className="absolute animate-cyber-bolt"
          style={{
            left: `${15 + i * 25}%`,
            top: `${30 + i * 20}%`,
            animationDelay: `${i * 2}s`
          }}
        >
          <svg width="60" height="20" viewBox="0 0 60 20">
            <path
              d="M5 10 L20 5 L15 10 L25 3 L20 10 L35 7 L30 10 L45 5 L40 10 L55 8"
              fill="none"
              stroke="hsl(260, 100%, 50%)"
              strokeWidth="2"
              className="animate-cyber-glow"
            />
          </svg>
        </div>
      ))}

      {/* Data streams */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`stream-${i}`}
          className="absolute w-1 animate-cyber-stream"
          style={{
            left: `${20 + i * 15}%`,
            height: '100%',
            background: `linear-gradient(to bottom, transparent, hsl(${180 + i * 30}, 100%, 50%), transparent)`,
            animationDelay: `${i * 0.3}s`,
            opacity: 0.6
          }}
        />
      ))}

      {/* Corner decorations */}
      <div className="absolute top-8 left-8">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path
            d="M5 5 L15 5 M5 5 L5 15 M35 5 L25 5 M35 5 L35 15 M5 35 L15 35 M5 35 L5 25 M35 35 L25 35 M35 35 L35 25"
            stroke="hsl(300, 100%, 50%)"
            strokeWidth="2"
            className="animate-cyber-pulse"
          />
        </svg>
      </div>

      <div className="absolute top-8 right-8">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path
            d="M5 5 L15 5 M5 5 L5 15 M35 5 L25 5 M35 5 L35 15 M5 35 L15 35 M5 35 L5 25 M35 35 L25 35 M35 35 L35 25"
            stroke="hsl(180, 100%, 50%)"
            strokeWidth="2"
            className="animate-cyber-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      <div className="absolute bottom-8 left-8">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path
            d="M5 5 L15 5 M5 5 L5 15 M35 5 L25 5 M35 5 L35 15 M5 35 L15 35 M5 35 L5 25 M35 35 L25 35 M35 35 L35 25"
            stroke="hsl(260, 100%, 50%)"
            strokeWidth="2"
            className="animate-cyber-pulse"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>

      <div className="absolute bottom-8 right-8">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path
            d="M5 5 L15 5 M5 5 L5 15 M35 5 L25 5 M35 5 L35 15 M5 35 L15 35 M5 35 L5 25 M35 35 L25 35 M35 35 L35 25"
            stroke="hsl(300, 100%, 50%)"
            strokeWidth="2"
            className="animate-cyber-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </svg>
      </div>
    </div>
  );
};