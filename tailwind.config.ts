import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cyber: {
					pink: 'hsl(var(--cyber-pink))',
					purple: 'hsl(var(--cyber-purple))',
					blue: 'hsl(var(--cyber-blue))',
					dark: 'hsl(var(--cyber-dark))',
					grid: 'hsl(var(--cyber-grid))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'cyber-pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'cyber-glow': {
					'0%, 100%': { 
						filter: 'drop-shadow(0 0 5px hsl(var(--primary)))',
						opacity: '1'
					},
					'50%': { 
						filter: 'drop-shadow(0 0 20px hsl(var(--primary)))',
						opacity: '0.8'
					}
				},
				'cyber-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'cyber-flow': {
					'0%, 100%': { 
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					'50%': { 
						transform: 'translateX(0%)',
						opacity: '1'
					}
				},
				'data-stream': {
					'0%': { 
						transform: 'translateY(-100vh)',
						opacity: '0'
					},
					'10%': { 
						opacity: '1'
					},
					'90%': { 
						opacity: '1'
					},
					'100%': { 
						transform: 'translateY(100vh)',
						opacity: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite',
				'cyber-glow': 'cyber-glow 3s ease-in-out infinite',
				'cyber-rotate': 'cyber-rotate 10s linear infinite',
				'cyber-flow': 'cyber-flow 4s ease-in-out infinite',
				'data-stream': 'data-stream 3s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
