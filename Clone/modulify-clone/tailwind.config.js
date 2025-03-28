/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        estateeminence: {
          blue: "#11BEF1",
          darkBlue: "#117DF1",
          dark: "#30333e",
          light: "#fafafb",
          gray: "#95969c",
          pink: "#b85c64",
          lightPink: "#d3a3b3",
          yellow: "#d99950",
          tan: "#e0c69f",
        },
        // Keep the modulify colors for backward compatibility
        modulify: {
          blue: "#11BEF1",
          darkBlue: "#117DF1",
          dark: "#30333e",
          light: "#fafafb",
          gray: "#95969c",
          pink: "#b85c64",
          lightPink: "#d3a3b3",
          yellow: "#d99950",
          tan: "#e0c69f",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'hero-pattern': "url('https://ext.same-assets.com/2675109532/1921181418.png')",
        'gradient-primary': "linear-gradient(135deg, rgba(43, 48, 62, 0.9) 0%, rgba(49, 81, 136, 0.8) 50%, rgba(97, 86, 146, 0.9) 100%)",
        'gradient-blue': "linear-gradient(90deg, #11BEF1 0%, #117DF1 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
