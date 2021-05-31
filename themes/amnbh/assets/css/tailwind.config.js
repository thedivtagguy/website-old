module.exports = {
    theme: {
        nightwind: {
            transitionDuration: "500ms", // default '300ms'
        },
        extend: {
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
            }
        }

    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
    ],
    darkMode: "class",
    // ...
    plugins: [require("nightwind")]
}