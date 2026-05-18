import { alpha, createTheme, type ThemeOptions } from '@mui/material/styles';

export const tokens = {
  palette: {
    primary: {
      main: '#3F51B5',
      light: '#5C6BC0',
      dark: '#303F9F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#14B8A6',
      light: '#2DD4BF',
      dark: '#0D9488',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
      subtle: '#F1F3F5',
    },
    text: {
      primary: '#1A1D21',
      secondary: '#64748B',
      disabled: '#94A3B8',
    },
    border: '#E2E8F0',
    divider: 'rgba(15, 23, 42, 0.08)',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 9999,
  },
  radiusPx: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    pill: '9999px',
  },
  shadow: {
    card: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    cardHover: '0px 12px 32px rgba(0, 0, 0, 0.1)',
    navbar: '0px 1px 0px rgba(15, 23, 42, 0.06)',
    dropdown: '0px 8px 24px rgba(0, 0, 0, 0.08)',
    hero: '0px 24px 48px rgba(63, 81, 181, 0.12)',
  },
  transition: {
    default: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    lift: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  layout: {
    maxContentWidth: 1280,
    navbarHeight: 64,
  },
} as const;

declare module '@mui/material/styles' {
  interface Theme {
    custom: typeof tokens;
  }
  interface ThemeOptions {
    custom?: typeof tokens;
  }
}

const fontFamily = [
  'var(--font-inter)',
  'Inter',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
].join(', ');

const themeOptions: ThemeOptions = {
  custom: tokens,
  palette: {
    mode: 'light',
    primary: tokens.palette.primary,
    secondary: tokens.palette.secondary,
    background: {
      default: tokens.palette.background.default,
      paper: tokens.palette.background.paper,
    },
    text: {
      primary: tokens.palette.text.primary,
      secondary: tokens.palette.text.secondary,
      disabled: tokens.palette.text.disabled,
    },
    divider: tokens.palette.divider,
    action: {
      hover: alpha(tokens.palette.primary.main, 0.04),
      selected: alpha(tokens.palette.primary.main, 0.08),
      focus: alpha(tokens.palette.primary.main, 0.12),
    },
    success: {
      main: '#22C55E',
      light: '#4ADE80',
      dark: '#16A34A',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    info: {
      main: tokens.palette.primary.main,
    },
  },
  shape: {
    borderRadius: tokens.radius.md,
  },
  typography: {
    fontFamily,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      color: tokens.palette.text.primary,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.25,
      color: tokens.palette.text.primary,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
      color: tokens.palette.text.primary,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.35,
      color: tokens.palette.text.primary,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: tokens.palette.text.primary,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.45,
      color: tokens.palette.text.primary,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: tokens.palette.text.primary,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: tokens.palette.text.secondary,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
      color: tokens.palette.text.primary,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.55,
      color: tokens.palette.text.secondary,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: tokens.palette.text.secondary,
    },
    overline: {
      fontSize: '0.6875rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: tokens.palette.text.secondary,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.palette.background.default,
          color: tokens.palette.text.primary,
        },
        '#__next, main': {
          flex: 1,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'inherit',
      },
      styleOverrides: {
        root: {
          backgroundColor: tokens.palette.background.paper,
          borderBottom: `1px solid ${tokens.palette.border}`,
          boxShadow: tokens.shadow.navbar,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: tokens.layout.navbarHeight,
          '@media (min-width: 0px)': {
            minHeight: tokens.layout.navbarHeight,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          padding: '10px 20px',
          fontWeight: 600,
          transition: tokens.transition.default,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: tokens.shadow.card,
          },
        },
        outlined: {
          borderColor: tokens.palette.border,
          '&:hover': {
            borderColor: tokens.palette.primary.main,
            backgroundColor: alpha(tokens.palette.primary.main, 0.04),
          },
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(tokens.palette.primary.main, 0.06),
          },
        },
        sizeLarge: {
          padding: '12px 28px',
          fontSize: '1rem',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          transition: tokens.transition.default,
          '&:hover': {
            backgroundColor: alpha(tokens.palette.primary.main, 0.06),
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.lg,
          border: `1px solid ${tokens.palette.border}`,
          boxShadow: tokens.shadow.card,
          backgroundImage: 'none',
          transition: tokens.transition.lift,
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: tokens.radius.lg,
        },
        outlined: {
          border: `1px solid ${tokens.palette.border}`,
          boxShadow: tokens.shadow.card,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: tokens.radius.sm,
        },
        filled: {
          backgroundColor: alpha(tokens.palette.primary.main, 0.08),
          color: tokens.palette.primary.dark,
          '&:hover': {
            backgroundColor: alpha(tokens.palette.primary.main, 0.12),
          },
        },
        outlined: {
          borderColor: tokens.palette.border,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          transition: tokens.transition.default,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(tokens.palette.primary.main, 0.4),
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
          },
        },
        notchedOutline: {
          borderColor: tokens.palette.border,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: tokens.palette.text.secondary,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 2,
          marginRight: 2,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.radius.md,
          border: `1px solid ${tokens.palette.border}`,
          boxShadow: tokens.shadow.dropdown,
          marginTop: 4,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.sm,
          margin: '2px 8px',
          padding: '10px 12px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.radius.lg,
          border: `1px solid ${tokens.palette.border}`,
          boxShadow: tokens.shadow.cardHover,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: tokens.palette.divider,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          transition: tokens.transition.default,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
        },
        colorSuccess: {
          backgroundColor: alpha('#22C55E', 0.08),
          color: '#166534',
        },
        colorError: {
          backgroundColor: alpha('#EF4444', 0.08),
          color: '#991B1B',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: tokens.radius.pill,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          minHeight: 48,
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export const sx = {
  cardHover: {
    transition: tokens.transition.lift,
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: tokens.shadow.cardHover,
    },
  },
  pageContainer: {
    py: { xs: 3, md: 5 },
    px: { xs: 2, sm: 3 },
    maxWidth: tokens.layout.maxContentWidth,
    mx: 'auto',
    width: '100%',
  },
  stickySidebar: {
    position: 'sticky',
    top: tokens.layout.navbarHeight + 24,
    alignSelf: 'flex-start',
  },
  heroOverlay: {
    background: `linear-gradient(180deg, ${alpha('#000', 0)} 0%, ${alpha('#000', 0.65)} 100%)`,
  },
} as const;

export default theme;
