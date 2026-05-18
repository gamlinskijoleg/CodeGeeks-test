'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Stack,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Box,
  Grid,
  Paper,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import EventMap from '@/components/EventMap';
import EventCard from '@/components/EventCard';
import { API_URL } from '@/lib/api';
import { sx, tokens } from '@/app/theme';

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  latitude?: number;
  longitude?: number;
  category: string;
  createdAt: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const theme = useTheme();
  const id = params.id as string;

  const [event, setEvent] = useState<EventData | null>(null);
  const [recommendations, setRecommendations] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventAndRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);

        const eventRes = await fetch(`${API_URL}/events/${id}`);
        if (!eventRes.ok) throw new Error('Failed to fetch event');
        const eventData = await eventRes.json();
        setEvent(eventData);

        const recsRes = await fetch(`${API_URL}/events/${id}/recommendations`);
        if (!recsRes.ok) throw new Error('Failed to fetch recommendations');
        const recsData = await recsRes.json();
        setRecommendations(recsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEventAndRecommendations();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Delete this event?')) return;
    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      router.push('/');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete event');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !event) {
    return (
      <Container maxWidth="lg" sx={{ ...sx.pageContainer }}>
        <Alert severity="error">{error || 'Event not found'}</Alert>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to events
        </Button>
      </Container>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Box sx={{ bgcolor: 'background.default', pb: 8 }}>
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 280, md: 360 },
          display: 'flex',
          alignItems: 'flex-end',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            ...sx.heroOverlay,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            backgroundImage:
              'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)',
          }}
        />
        <Container
          maxWidth="lg"
          sx={{ position: 'relative', py: { xs: 4, md: 6 } }}
        >
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              mb: 3,
              color: alpha('#fff', 0.9),
              '&:hover': { bgcolor: alpha('#fff', 0.1) },
            }}
          >
            All events
          </Button>
          <Chip
            label={event.category}
            sx={{
              ml: 1,
              mb: 2,
              bgcolor: alpha('#fff', 0.2),
              color: '#fff',
              fontWeight: 600,
              border: `1px solid ${alpha('#fff', 0.3)}`,
            }}
          />
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: '#fff',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              maxWidth: 800,
            }}
          >
            {event.title}
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{ mt: { xs: -3, md: -4 }, position: 'relative' }}
      >
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: tokens.radiusPx.lg,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                About this event
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.75 }}
              >
                {event.description}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: tokens.radiusPx.lg,
                ...sx.stickySidebar,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 700 }}>
                Event details
              </Typography>

              <Stack spacing={2.5} divider={<Divider flexItem />}>
                <Stack direction="row" spacing={1.5}>
                  <CalendarTodayOutlinedIcon color="primary" />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 600 }}
                    >
                      Date & time
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formattedDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formattedTime}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5}>
                  <LocationOnOutlinedIcon color="primary" />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 600 }}
                    >
                      Location
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {event.location}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>

              <Stack spacing={1.5} sx={{ mt: 3 }}>
                <Button
                  component={Link}
                  href={`/events/${id}/edit`}
                  variant="contained"
                  fullWidth
                  startIcon={<EditOutlinedIcon />}
                >
                  Edit event
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={handleDelete}
                >
                  Delete event
                </Button>
              </Stack>

              {event.latitude != null && event.longitude != null && (
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1.5, fontWeight: 700 }}
                  >
                    Map
                  </Typography>
                  <EventMap
                    events={[event]}
                    center={[event.latitude, event.longitude]}
                    zoom={15}
                    height={220}
                  />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 700 }}>
            Similar events
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You might also enjoy these gatherings
          </Typography>

          {recommendations.length > 0 ? (
            <Grid container spacing={3}>
              {recommendations.map((rec) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={rec.id}>
                  <EventCard {...rec} variant="compact" />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info" sx={{ borderRadius: tokens.radiusPx.md }}>
              No similar events found right now.
            </Alert>
          )}
        </Box>
      </Container>
    </Box>
  );
}
