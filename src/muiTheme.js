import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#663A92',
    },
    secondary: {
      main: '#FAFAFA',
    },
  },

  typography: {
    useNextVariants: true,
  }
})

export default theme