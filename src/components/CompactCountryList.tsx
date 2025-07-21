interface Country {
  name: string;
  flag: string;
  code: string;
}

interface CompactCountryListProps {
  countries: Country[];
  selectedIndex: number;
  onSelect: (country: Country) => void;
}

export const CompactCountryList = ({ countries, selectedIndex, onSelect }: CompactCountryListProps) => {
  return (
    <div className="space-y-2">
      {countries.map((country, index) => (
        <div
          key={country.code}
          className={`
            flex items-center p-3 rounded border cursor-pointer transition-all duration-300 
            ${index === selectedIndex 
              ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
              : 'border-border bg-card/50 hover:border-accent hover:bg-accent/5'
            }
          `}
          onClick={() => onSelect(country)}
        >
          <span className="text-2xl mr-3">{country.flag}</span>
          <span className="text-foreground font-mono text-sm flex-1">{country.name}</span>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${
                  index === selectedIndex ? 'bg-primary animate-cyber-pulse' : 'bg-muted'
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};