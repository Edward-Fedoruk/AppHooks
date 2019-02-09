import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#344DBC",
      main: "#192b7f",
      dark: "#192B81",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#344DBC",
      main: "#35c1ce",
      dark: "#2AA4AF",
      contrastText: "#ffffff",
    },
  },

  typography: {
    useNextVariants: true,
  },

  props: {
    // withWidth component ⚛️
    MuiWithWidth: {
      // Initial width property
      initialWidth: "lg", // Breakpoint being globally set
    },
  },
})

export default theme
