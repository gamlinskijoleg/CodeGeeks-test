'use client';

import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import EventForm from '@/components/EventForm';
import { sx } from '@/app/theme';

export default function NewEventPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', flex: 1, py: { xs: 3, md: 5 } }}>
      <Container maxWidth="md" sx={sx.pageContainer}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <MuiLink
            component={Link}
            href="/"
            underline="hover"
            color="text.secondary"
          >
            Events
          </MuiLink>
          <Typography color="text.primary">Create</Typography>
        </Breadcrumbs>
        <EventForm />
      </Container>
    </Box>
  );
}
