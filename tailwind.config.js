module.exports = {
  purge: false,
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    extend: {
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
      },
      fontFamily: { openSans: ["Open Sans", "sans-serif"] },
      boxShadow: {
        menu_shadow: "0 12px 25px 0px rgba(0, 0, 0, 0.2)",
      },
      borderRadius: {
        xl: "13px",
        xxl: "1.5em",
      },
      width: {
        homeMenu: "1140px",
      },
      height: {
        screen50: "65vh",
        half_screen: "75vh",
        half_screenPX: "600px",
      },
      borderColor: {
        goldText: "#A08F46",
      },
      screens: {
        xxs: "286px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1920px",
        screen2K: "2048px",
        screenQuadHD: "2560px",
        screenUHD: "3840px",
      },
      colors: {
        blueLight: "#1B90FF",
        blueLightMenu: "#005AF0",
        goldText: "#A08F46",
        grayLight: "#F4F5FE",
        bgGrayLight: "#E7ECF1",
        violet: "#3a0ca3",
        blueLight2: "#1890FF",
      },
      boxShadow: {
        "3xl": "5px 20px 50px 5px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [require("@tailwindcss/ui")],
};
