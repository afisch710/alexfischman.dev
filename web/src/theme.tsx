// src/theme.tsx
import { createTheme } from '@mui/material/styles';

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
    },
    typography: {
        fontFamily: 'var(--font-geist-sans)',
        allVariants: {
            color: "#fff",
        },
    },
});

export default theme;