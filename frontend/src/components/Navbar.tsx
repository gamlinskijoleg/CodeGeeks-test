'use client';

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  IconButton,
  Avatar,
  alpha,
  useTheme,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tokens } from '@/app/theme';

const navLinks = [
  { label: 'Discover', href: '/' },
  { label: 'Create', href: '/events/new' },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const theme = useTheme();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/events';
    }
    return pathname.startsWith(href);
  };

  return (
    <AppBar position="sticky" sx={{ mb: 0 }}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            gap: 2,
            minHeight: tokens.layout.navbarHeight,
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                transition: tokens.transition.default,
                '&:hover': { opacity: 0.85 },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: tokens.radiusPx.md,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  color: '#fff',
                  boxShadow: tokens.shadow.card,
                }}
              >
                <EventIcon sx={{ fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: tokens.palette.text.primary,
                }}
              >
                EventHub
              </Typography>
            </Box>
          </Link>

          <Box
            component="nav"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {navLinks.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                  <Button
                    color="inherit"
                    sx={{
                      px: 2,
                      py: 1,
                      fontWeight: active ? 600 : 500,
                      color: active
                        ? theme.palette.primary.main
                        : tokens.palette.text.secondary,
                      backgroundColor: active
                        ? alpha(theme.palette.primary.main, 0.08)
                        : 'transparent',
                      borderRadius: tokens.radiusPx.md,
                      '&:hover': {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          active ? 0.1 : 0.06,
                        ),
                      },
                    }}
                  >
                    {label}
                  </Button>
                </Link>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Link
              href="/events/new"
              style={{ textDecoration: 'none' }}
              className="navbar-create-mobile"
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddIcon />}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  borderRadius: tokens.radiusPx.md,
                }}
              >
                Create Event
              </Button>
            </Link>
            <Link href="/events/new" style={{ textDecoration: 'none' }}>
              <IconButton
                color="primary"
                sx={{
                  display: { xs: 'inline-flex', sm: 'none' },
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                }}
                aria-label="Create event"
              >
                <AddIcon />
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
