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
      light: '#ffffe4',
      main: '#ffe0b2',
      dark: '#cbae82',
      contrastText: '#000',
    }
  }
});

export default theme;
