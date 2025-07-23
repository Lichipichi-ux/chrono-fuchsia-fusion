interface ActionDropdownProps {
  onAction: (action: 'world' | 'evolution' | 'menu') => void;
}

export const ActionDropdown = ({ onAction }: ActionDropdownProps) => {
  return (
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      <h3 className="text-2xl font-mono text-accent animate-cyber-glow">
        ¿QUÉ QUIERES EXPLORAR?
      </h3>
      
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => onAction('world')}
          className="
            relative px-8 py-4 font-mono text-lg border-2 border-primary
            bg-primary/10 text-primary rounded-lg
            hover:bg-primary/20 hover:scale-105
            transition-all duration-300
            hover:shadow-lg hover:shadow-primary/50
            before:absolute before:inset-0 before:rounded-lg
            before:animate-cyber-pulse before:border before:border-primary before:opacity-0
            hover:before:opacity-100
          "
        >
          Mira el mundo
          <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </button>

        <button
          onClick={() => onAction('evolution')}
          className="
            relative px-8 py-4 font-mono text-lg border-2 border-accent
            bg-accent/10 text-accent rounded-lg
            hover:bg-accent/20 hover:scale-105
            transition-all duration-300
            hover:shadow-lg hover:shadow-accent/50
            before:absolute before:inset-0 before:rounded-lg
            before:animate-cyber-pulse before:border before:border-accent before:opacity-0
            hover:before:opacity-100
          "
        >
          Evolución humana
          <div className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
        </button>

        <button
          onClick={() => onAction('menu')}
          className="
            relative px-6 py-3 font-mono text-sm border border-muted
            text-muted rounded-lg
            hover:border-foreground hover:text-foreground hover:scale-105
            transition-all duration-300
          "
        >
          Volver al menú
        </button>
      </div>
    </div>
  );
};