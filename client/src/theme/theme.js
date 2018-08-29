import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5472d3',
      main: '#0d47a1',
      dark: '#002171',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5472d3',
      main: '#0d47a1',
      dark: '#002171',
      contrastText: '#fff',
    }
    // secondary: {
    //   light: '#ffffff',
    //   main: '#89a0ff',
    //   dark: '#0d47a1',
    //   contrastText: '#000',
    // }
  }
  // typography: {
  //   "fontFamily": "Barlow",
  //   "fontSize": 14,
  //   "subheading": {
  //     "fontSize": "14px"
  //   }
  // },
  // "status": {
  //   "danger": "orange"
  // },
  // "overrides": {
  //   "MuiAppBar": {
  //     "colorDefault": {
  //       "backgroundColor": "#FFF",
  //       "color": "#000"
  //     }
  //   }
  // }
});

export default theme;
