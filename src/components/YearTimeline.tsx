import { useState, useEffect } from 'react';

interface YearTimelineProps {
  onYearSelect: (year: number) => void;
}

export const YearTimeline = ({ onYearSelect }: YearTimelineProps) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const years = [2020, 2025, 2030, 2035, 2040, 2045, 2050];

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    onYearSelect(year);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedIndex(prev => Math.min(years.length - 1, prev + 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleYearClick(years[focusedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, years]);

  return (
    <div className="flex flex-col items-center space-y-8 overflow-x-hidden max-w-full">
      <h2 className="text-3xl font-mono text-primary animate-cyber-glow">
        SELECCIONA UN AÑO
      </h2>
      
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 max-w-full">
        {years.map((year, index) => (
          <button
            key={year}
            onClick={() => handleYearClick(year)}
            className={`
              relative px-8 py-4 font-mono text-xl border-2 rounded-lg
              transition-all duration-300 hover:scale-110 focus:scale-110 focus:outline-none
              ${selectedYear === year 
                ? 'border-primary bg-primary/20 text-primary shadow-lg shadow-primary/50' 
                : focusedIndex === index
                  ? 'border-primary bg-primary/10 text-primary shadow-md shadow-primary/30 ring-2 ring-primary/50'
                  : 'border-accent text-accent hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/30'
              }
              before:absolute before:inset-0 before:rounded-lg before:opacity-0
              hover:before:opacity-100 before:animate-cyber-pulse before:border before:border-primary
            `}
            autoFocus={index === 0}
          >
            {year}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </button>
        ))}
      </div>
      
      <p className="text-muted-foreground text-sm font-mono">
        ← → para navegar • Enter para seleccionar • ESC para salir
      </p>
    </div>
  );
};