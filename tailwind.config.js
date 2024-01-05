module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // #34FFCE
        // #2E3345
        "theme-green": "#34FFCE",
        "theme-black": "#2E3345",
      },
      spacing: {
        15: "62px",
        98: "430px",
        99: "500px",
        800: "800px",
        100: "560px",
        150: "650px",
        1000: "1000px",
        23: "84px",
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
      width: ["group-hover"],
      height: ["group-hover"],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
