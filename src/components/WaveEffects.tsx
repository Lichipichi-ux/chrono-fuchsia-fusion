export const WaveEffects = () => {
  return (
    <>
      {/* Sine Wave Overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Top Wave */}
        <svg className="absolute top-0 w-full h-32" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q250,0 500,50 T1000,50 V0 H0 Z"
            fill="url(#waveGradient1)"
            opacity="0.3"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="-200 0;200 0;-200 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(300, 100%, 50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(300, 100%, 50%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(300, 100%, 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Bottom Wave */}
        <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q250,100 500,50 T1000,50 V100 H0 Z"
            fill="url(#waveGradient2)"
            opacity="0.3"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="200 0;-200 0;200 0"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Left Side Wave */}
        <svg className="absolute left-0 w-32 h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
          <path
            d="M50,0 Q0,250 50,500 T50,1000 H0 V0 Z"
            fill="url(#waveGradient3)"
            opacity="0.2"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 -200;0 200;0 -200"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(260, 100%, 50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(260, 100%, 50%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(260, 100%, 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Right Side Wave */}
        <svg className="absolute right-0 w-32 h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
          <path
            d="M50,0 Q100,250 50,500 T50,1000 H100 V0 Z"
            fill="url(#waveGradient4)"
            opacity="0.2"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 200;0 -200;0 200"
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
          <defs>
            <linearGradient id="waveGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Diagonal Energy Pulses */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-cyber-flow opacity-60"
            style={{
              height: '140%',
              left: `${i * 16.66}%`,
              top: '-20%',
              transform: 'rotate(45deg)',
              animationDelay: `${i * 0.8}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </>
  );
};