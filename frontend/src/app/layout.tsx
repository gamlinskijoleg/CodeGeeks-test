'use client';

import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';
import Navbar from '@/components/Navbar';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Box
            component="main"
            sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
