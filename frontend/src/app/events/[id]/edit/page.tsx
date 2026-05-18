'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Container,
  CircularProgress,
  Alert,
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import EventForm from '@/components/EventForm';
import { API_URL } from '@/lib/api';
import { sx } from '@/app/theme';

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  latitude?: number;
  longitude?: number;
  category: string;
}

export default function EditEventPage() {
  const params = useParams();
  const id = params.id as string;
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/events/${id}`);
        if (!response.ok) throw new Error('Failed to fetch event');
        const data = await response.json();
        setEvent(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

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
          <MuiLink
            component={Link}
            href={`/events/${id}`}
            underline="hover"
            color="text.secondary"
          >
            Event
          </MuiLink>
          <Typography color="text.primary">Edit</Typography>
        </Breadcrumbs>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {event && (
          <EventForm
            initialData={{
              ...event,
              id: event.id,
              date: new Date(event.date).toISOString().slice(0, 16),
            }}
            isEditing
          />
        )}
      </Container>
    </Box>
  );
}
