export const FlowingEnergy = () => {
  return (
    <div className="relative w-96 h-96">
      {/* Main Energy Flow */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="energyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(300, 100%, 50%)" stopOpacity="0.8">
              <animate attributeName="stop-color"
                values="hsl(300, 100%, 50%);hsl(260, 100%, 50%);hsl(300, 100%, 50%)"
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="hsl(260, 100%, 50%)" stopOpacity="1">
              <animate attributeName="stop-color"
                values="hsl(260, 100%, 50%);hsl(180, 100%, 50%);hsl(260, 100%, 50%)"
                dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0.6">
              <animate attributeName="stop-color"
                values="hsl(180, 100%, 50%);hsl(300, 100%, 50%);hsl(180, 100%, 50%)"
                dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          <linearGradient id="energyGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(300, 100%, 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(260, 100%, 50%)" stopOpacity="0.9" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Primary Energy Flow */}
        <path
          d="M50 200 Q200 50 350 200 Q200 350 50 200"
          fill="url(#energyGradient1)"
          filter="url(#glow)"
          className="animate-cyber-pulse"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 200 200;360 200 200"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>

        {/* Secondary Flow */}
        <path
          d="M200 50 Q350 200 200 350 Q50 200 200 50"
          fill="url(#energyGradient2)"
          filter="url(#glow)"
          className="animate-cyber-pulse"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="360 200 200;0 200 200"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>

        {/* Energy Particles */}
        {[...Array(8)].map((_, i) => (
          <circle
            key={i}
            r="2"
            fill="hsl(300, 100%, 50%)"
            className="animate-cyber-glow"
          >
            <animateMotion
              dur={`${4 + i}s`}
              repeatCount="indefinite"
            >
              <path d={`M${50 + i * 40} 200 Q200 ${50 + i * 20} ${350 - i * 40} 200 Q200 ${350 - i * 20} ${50 + i * 40} 200`} />
            </animateMotion>
          </circle>
        ))}
      </svg>
    </div>
  );
};