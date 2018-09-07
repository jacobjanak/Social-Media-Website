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
    },
  },
  // props: {
  //   ListItemText: {
  //     // prop
  //     root: {
  //       paddingRight: '0px !important',
  //     },
  //   },
  // },
});

export default theme;
