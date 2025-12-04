/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Spectrum primary palette
        'spectrum-green': '#8BF700', // R139 V247 B0
        'spectrum-blue': '#3DBDE6', // R61 V189 B230
        'spectrum-purple': '#8F24F0', // R143 V36 B240
        'spectrum-red': '#DE203C', // R222 V32 B60
        'spectrum-orange': '#FF5700', // R255 V87 B0
        'spectrum-yellow': '#FFC900', // R255 V201 B0
        'spectrum-yellow-dark': '#F9BF00',

        // Spectrum accompaniment / neutrals
        'spectrum-neutral-400': '#AAAAA9', // R170 V170 B169
        'spectrum-neutral-600': '#706F6F', // R112 V111 B111
        'spectrum-navy': '#1A3965', // R26 V57 B101
        'spectrum-sky': '#00ADDD', // R0 V173 B221
        'spectrum-teal': '#189C9D', // R24 V156 B157
        'spectrum-soft-green': '#62B466', // R98 V180 B102
        'spectrum-gold': '#F9BF00', // R249 V191 B0
        'spectrum-deep-orange': '#F07E00', // R240 V126 B0
        'spectrum-magenta': '#E72386', // R231 V35 B134
        'spectrum-crimson': '#E61D35', // R230 V29 B53
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
