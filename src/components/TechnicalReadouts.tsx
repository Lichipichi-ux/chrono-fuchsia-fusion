export const TechnicalReadouts = () => {
  const generateRandomData = () => {
    return {
      temperature: (Math.random() * 40 + 20).toFixed(1),
      pressure: (Math.random() * 1000 + 500).toFixed(0),
      voltage: (Math.random() * 50 + 100).toFixed(2),
      frequency: (Math.random() * 100 + 400).toFixed(1)
    };
  };

  return (
    <>
      {/* Top Data Readouts */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-8">
          <div className="text-center">
            <div className="text-xs text-muted-foreground font-mono">TEMP</div>
            <div className="text-lg text-primary font-mono animate-cyber-pulse">
              {generateRandomData().temperature}°C
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground font-mono">FREQ</div>
            <div className="text-lg text-accent font-mono animate-cyber-pulse">
              {generateRandomData().frequency}Hz
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground font-mono">VOLT</div>
            <div className="text-lg text-secondary font-mono animate-cyber-pulse">
              {generateRandomData().voltage}V
            </div>
          </div>
        </div>
      </div>

      {/* Left Side Technical Panel */}
      <div className="absolute top-1/4 left-4">
        <div className="bg-card/20 border border-cyber-grid p-4 rounded-lg backdrop-blur-sm">
          <div className="text-xs text-muted-foreground font-mono mb-2">SYSTEM STATUS</div>
          <div className="space-y-2">
            {['ONLINE', 'STABLE', 'ACTIVE', 'NOMINAL'].map((status, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-cyber-pulse" />
                <span className="text-xs text-foreground font-mono">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side Performance Metrics */}
      <div className="absolute top-1/3 right-4">
        <div className="bg-card/20 border border-cyber-grid p-4 rounded-lg backdrop-blur-sm">
          <div className="text-xs text-muted-foreground font-mono mb-2">PERFORMANCE</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground font-mono">CPU</span>
              <span className="text-xs text-primary font-mono animate-cyber-pulse">67%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground font-mono">MEM</span>
              <span className="text-xs text-accent font-mono animate-cyber-pulse">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-foreground font-mono">NET</span>
              <span className="text-xs text-secondary font-mono animate-cyber-pulse">89%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-12">
          <div className="text-center">
            <div className="text-xs text-muted-foreground font-mono">CONNECTION</div>
            <div className="text-sm text-primary font-mono animate-cyber-glow">SECURE</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground font-mono">LATENCY</div>
            <div className="text-sm text-accent font-mono animate-cyber-glow">12ms</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground font-mono">BANDWIDTH</div>
            <div className="text-sm text-secondary font-mono animate-cyber-glow">1.2GB/s</div>
          </div>
        </div>
      </div>
    </>
  );
};