'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  CircularProgress,
  Alert,
  Box,
  Typography,
  Paper,
  Chip,
  Checkbox,
  ListItemText,
  InputAdornment,
  alpha,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import EventCard from '@/components/EventCard';
import { API_URL } from '@/lib/api';
import { tokens } from '@/app/theme';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
}

export default function EventsList() {
  const theme = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchText, setSearchText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/events`);
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = useMemo(
    () => [...new Set(events.map((e) => e.category))].sort(),
    [events],
  );

  const filteredEvents = useMemo(() => {
    const result = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchText.toLowerCase()) ||
        event.description.toLowerCase().includes(searchText.toLowerCase()) ||
        event.location.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(event.category);
      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return result;
  }, [events, searchText, selectedCategories, sortOrder]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete event');
      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete event');
    }
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedCategories([]);
    setSortOrder('desc');
  };

  const hasActiveFilters =
    searchText !== '' || selectedCategories.length > 0 || sortOrder !== 'desc';

  return (
    <Box sx={{ bgcolor: 'background.default', flex: 1, pb: 6 }}>
      <Box
        sx={{
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 100%)`,
          borderBottom: `1px solid ${tokens.palette.border}`,
          py: { xs: 4, md: 5 },
          mb: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.02em',
              mb: 1,
            }}
          >
            Discover events
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 560 }}
          >
            Browse upcoming experiences, filter by categories, and find your
            next gathering.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                width: '100%',
                position: { md: 'sticky' },
                top: tokens.layout.navbarHeight + 24,
                alignSelf: 'flex-start',
                borderRadius: tokens.radiusPx.lg,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 2, alignItems: 'center' }}
              >
                <FilterListIcon color="primary" fontSize="small" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Filters
                </Typography>
              </Stack>

              <Stack spacing={2.5}>
                <TextField
                  label="Search"
                  placeholder="Title, description, location…"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  fullWidth
                  size="small"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <FormControl fullWidth size="small">
                  <InputLabel>Categories</InputLabel>
                  <Select
                    multiple
                    value={selectedCategories}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedCategories(
                        typeof value === 'string' ? value.split(',') : value,
                      );
                    }}
                    label="Categories"
                    renderValue={(selected) =>
                      selected.length === 0
                        ? 'All categories'
                        : selected.join(', ')
                    }
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        <Checkbox
                          size="small"
                          checked={selectedCategories.includes(cat)}
                        />
                        <ListItemText primary={cat} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>Sort by date</InputLabel>
                  <Select
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(e.target.value as 'asc' | 'desc')
                    }
                    label="Sort by date"
                  >
                    <MenuItem value="desc">Newest first</MenuItem>
                    <MenuItem value="asc">Oldest first</MenuItem>
                  </Select>
                </FormControl>

                {categories.length > 0 && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1, display: 'block', fontWeight: 600 }}
                    >
                      Quick categories
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {categories.map((cat) => {
                        const isSelected = selectedCategories.includes(cat);
                        return (
                          <Chip
                            key={cat}
                            label={cat}
                            size="small"
                            clickable
                            variant={isSelected ? 'filled' : 'outlined'}
                            color={isSelected ? 'primary' : 'default'}
                            onClick={() => toggleCategory(cat)}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                )}

                {hasActiveFilters && (
                  <Chip
                    label="Clear all filters"
                    size="small"
                    onClick={clearFilters}
                    onDelete={clearFilters}
                    sx={{ alignSelf: 'flex-start' }}
                  />
                )}
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Stack
              direction="row"
              sx={{
                mb: 3,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {loading
                  ? 'Loading events…'
                  : `${filteredEvents.length} event${filteredEvents.length === 1 ? '' : 's'}`}
              </Typography>
            </Stack>

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {!loading && filteredEvents.length === 0 && !error && (
              <Paper
                variant="outlined"
                sx={{
                  p: 6,
                  textAlign: 'center',
                  borderRadius: tokens.radiusPx.lg,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  No events found
                </Typography>
                <Typography color="text.secondary">
                  Try adjusting your search or filters to discover more events.
                </Typography>
              </Paper>
            )}

            <Grid container spacing={3}>
              {filteredEvents.map((event) => (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={event.id}>
                  <EventCard {...event} onDelete={handleDelete} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
