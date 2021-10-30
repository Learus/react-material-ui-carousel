import { red } from '@mui/material/colors';
import { Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const typographyDefaultColor = 'lightgrey'


const DemoTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: 'rgb(73, 73, 73)'
        },
        primary: {
            main: red[900]
        }
    },
    typography: {
        fontFamily: [
            'montserrat',
            'tahoma',
            'sans-serif'
        ].join(','),
        h1: {color: typographyDefaultColor},
        h2: {color: typographyDefaultColor},
        h3: {color: typographyDefaultColor},
        h4: {color: typographyDefaultColor},
        h5: {color: typographyDefaultColor},
        body1: {color: typographyDefaultColor},
        subtitle1: {color: typographyDefaultColor}
    },
    spacing: 32
});

export default DemoTheme;