export const CircularElements = () => {
  return (
    <>
      {/* Top Left Circular HUD */}
      <div className="absolute top-16 left-16">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-2 border-primary rounded-full animate-cyber-rotate opacity-60" />
          <div className="absolute inset-2 border border-accent rounded-full animate-cyber-rotate" style={{ animationDirection: 'reverse', animationDuration: '8s' }} />
          <div className="absolute inset-4 border border-secondary rounded-full animate-cyber-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-primary font-mono">XS1 001</span>
          </div>
          {/* Corner Markers */}
          {[0, 90, 180, 270].map((angle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary animate-cyber-pulse"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-66px)`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Top Right Circular Display */}
      <div className="absolute top-16 right-16">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(300, 100%, 50%)"
              strokeWidth="2"
              className="animate-cyber-pulse"
            />
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="hsl(180, 100%, 50%)"
              strokeWidth="1"
              strokeDasharray="5,5"
              className="animate-cyber-rotate"
            />
            {/* Progress Arc */}
            <path
              d="M 50,5 A 45,45 0 0,1 95,50"
              stroke="hsl(300, 100%, 50%)"
              strokeWidth="3"
              fill="none"
              className="animate-cyber-glow"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-accent font-mono">78%</span>
          </div>
        </div>
      </div>

      {/* Bottom Left Status Ring */}
      <div className="absolute bottom-16 left-16">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border border-cyber-grid rounded-full animate-cyber-pulse" />
          <div className="absolute inset-2 border border-accent rounded-full animate-cyber-rotate" style={{ animationDuration: '6s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-cyber-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom Right Data Ring */}
      <div className="absolute bottom-16 right-16">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full" viewBox="0 0 112 112">
            <circle
              cx="56"
              cy="56"
              r="50"
              fill="none"
              stroke="hsl(260, 100%, 50%)"
              strokeWidth="1"
              strokeDasharray="10,5"
              className="animate-cyber-rotate"
              style={{ animationDuration: '15s' }}
            />
            <circle
              cx="56"
              cy="56"
              r="40"
              fill="none"
              stroke="hsl(180, 100%, 50%)"
              strokeWidth="1"
              strokeDasharray="5,10"
              className="animate-cyber-rotate"
              style={{ animationDirection: 'reverse', animationDuration: '20s' }}
            />
            <circle
              cx="56"
              cy="56"
              r="30"
              fill="none"
              stroke="hsl(300, 100%, 50%)"
              strokeWidth="2"
              strokeDasharray="2,3"
              className="animate-cyber-pulse"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-secondary font-mono">SYNC</span>
          </div>
        </div>
      </div>
    </>
  );
};