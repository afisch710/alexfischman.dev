// src/theme.tsx
import { createTheme } from '@mui/material/styles';
import { roboto } from './lib/fonts';

const theme = createTheme({
    palette: {
        text: {
            'primary': '#fff',
            'secondary': '#bbb',
        },
        primary: {
            main: '#fff',
        },
        background: {
            paper: 'rgba(0,0,0,0.25)',
        },
        secondary: {
            main: '#555',
        },
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#ccc',
                    '&.Mui-selected': {
                        color: '#fff',
                    },
                },
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: false,
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    maxWidth: '1400px',
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: 0,
                    paddingRight: 0,
                    [theme.breakpoints.down('sm')]: {
                        maxWidth: '95vw',
                    },
                }),
            },
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
            lineHeight: 1.3,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            lineHeight: 1.3,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            lineHeight: 1.4,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.4,
        },
        subtitle1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        subtitle2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        allVariants: {
            color: "#fff",
        },
    },
});

export const customMaxWidth = {
    mobile: '95vw',
    desktop: '1200px',
};

export default theme;