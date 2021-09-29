import { blue, red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

const typographyDefaultColor = 'lightgrey'


const DemoTheme = createTheme({
    palette: {
        type: 'dark',
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