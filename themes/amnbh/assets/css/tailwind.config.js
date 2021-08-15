module.exports = {
    theme: {
     
        extend: {
            fontSize: {
                'xxs': '.50rem',
            },
            colors: {
                'orange-400': '#F85E00',
                'orange-300': '#E86E23',
                'orange-600': '#AB511A',
                'orange-200': '#FC914E',
                'biga': '#455434'
            },
            borderWidth: {
                '3': '3px'
            },
            height: {
                'h-screen-half': '50vh',
                "screen/3": "calc(100vh / 3)",
                "screen/4": "calc(100vh / 4)",
                "screen/5": "calc(100vh / 5)",
            },
            fontFamily: {
                'causten': ['Causten'],
                'arsenica': ['Arsenica'],
                'rougant': ['Rougant'],
                'cocogoose': ['Cocogoose'],
                'blacker': ['Blacker'],
            }
        }

    },
    variants: {
        extend: {
            backgroundColor: ['even'],
          }
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
    darkMode: "class",
    // ...
}