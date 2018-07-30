import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#707dff',
      main: '#2151f1',
      dark: '#0029bd',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#d1d3d4',
      dark: '#a0a2a3',
      contrastText: '#000',
    }
  }
});

export default theme;
