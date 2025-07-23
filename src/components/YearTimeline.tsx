import { useState } from 'react';

interface YearTimelineProps {
  onYearSelect: (year: number) => void;
}

export const YearTimeline = ({ onYearSelect }: YearTimelineProps) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const years = [2020, 2025, 2030, 2035, 2040, 2045, 2050];

  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    onYearSelect(year);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="text-3xl font-mono text-primary animate-cyber-glow">
        SELECCIONA UN AÑO
      </h2>
      
      <div className="flex space-x-6 overflow-x-auto pb-4">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearClick(year)}
            className={`
              relative px-8 py-4 font-mono text-xl border-2 rounded-lg
              transition-all duration-300 hover:scale-110
              ${selectedYear === year 
                ? 'border-primary bg-primary/20 text-primary shadow-lg shadow-primary/50' 
                : 'border-accent text-accent hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/30'
              }
              before:absolute before:inset-0 before:rounded-lg before:opacity-0
              hover:before:opacity-100 before:animate-cyber-pulse before:border before:border-primary
            `}
          >
            {year}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </button>
        ))}
      </div>
    </div>
  );
};