module.exports = {
//   mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
            '112': '28rem',
            '144': '36rem',
            }, 
            fontFamily: {
                'Inter': ['Inter', 'sans-serif']
            },
        
        },
        minWidth: {
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '2/3': '66%',
            '3/4': '75%',
            '3/5': '60%',
            'full': '100%',
        },
    },
    variants: {
    },
  plugins: [],
  corePlugins: {
   tableLayout: false,
  }


  
}
