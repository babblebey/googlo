module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'gblue': '#1A73E8'
      },
      boxShadow: {
        'form': '0 1px 8px rgb(32 33 36 / 30%)',
        'form-light': '0 1px 4px rgb(32 33 36 / 20%)',
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in .2s ease-out",
      },
    },
  },
  plugins: [],
}
