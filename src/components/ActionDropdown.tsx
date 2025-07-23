import { useState, useEffect } from 'react';

interface ActionDropdownProps {
  onAction: (action: 'world' | 'evolution' | 'menu') => void;
}

export const ActionDropdown = ({ onAction }: ActionDropdownProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const actions = [
    { key: 'world' as const, label: 'Mira el mundo', color: 'primary' },
    { key: 'evolution' as const, label: 'Evolución humana', color: 'accent' },
    { key: 'menu' as const, label: 'Volver al menú', color: 'muted' }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => Math.min(actions.length - 1, prev + 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onAction(actions[focusedIndex].key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, actions, onAction]);
  return (
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      <h3 className="text-2xl font-mono text-accent animate-cyber-glow">
        ¿QUÉ QUIERES EXPLORAR?
      </h3>
      
      <div className="flex flex-col space-y-4">
        {actions.map((action, index) => (
          <button
            key={action.key}
            onClick={() => onAction(action.key)}
            className={`
              relative font-mono rounded-lg
              transition-all duration-300
              hover:scale-105 focus:scale-105 focus:outline-none
              before:absolute before:inset-0 before:rounded-lg
              before:animate-cyber-pulse before:opacity-0
              hover:before:opacity-100
              ${action.color === 'primary' 
                ? `px-8 py-4 text-lg border-2 border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/50 before:border before:border-primary ${focusedIndex === index ? 'ring-2 ring-primary/50 bg-primary/15' : ''}` 
                : action.color === 'accent'
                  ? `px-8 py-4 text-lg border-2 border-accent bg-accent/10 text-accent hover:bg-accent/20 hover:shadow-lg hover:shadow-accent/50 before:border before:border-accent ${focusedIndex === index ? 'ring-2 ring-accent/50 bg-accent/15' : ''}` 
                  : `px-6 py-3 text-sm border border-muted text-muted hover:border-foreground hover:text-foreground ${focusedIndex === index ? 'ring-2 ring-foreground/50 border-foreground text-foreground' : ''}`
              }
            `}
            autoFocus={index === 0}
          >
            {action.label}
            {action.color !== 'muted' && (
              <div className={`absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse ${
                action.color === 'primary' ? 'bg-primary' : 'bg-accent'
              }`} />
            )}
          </button>
        ))}
      </div>
      
      <p className="text-muted-foreground text-xs font-mono text-center">
        ↑ ↓ para navegar • Enter para seleccionar • ESC para salir
      </p>
    </div>
  );
};