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

  overrides: {
    MuiFormLabel: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: "#828CB8", // Some CSS
      },
    },
    MuiTypography: {
      h5: { color: "#192b7f" },
      body2: { color: "#192b7f" },
      subtitle1: { color: "#192b7f" },
    },
    MuiTablePagination: {
      caption: {
        color: "#192B81",
      },
      select: {
        color: "#192B81",
      },
    },
  },

  props: {
    MuiWithWidth: {
      initialWidth: "lg",
    },
  },
})

export default theme
