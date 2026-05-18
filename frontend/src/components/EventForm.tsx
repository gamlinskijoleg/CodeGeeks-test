'use client';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { API_URL } from '@/lib/api';
import EventLocationPicker from '@/components/EventLocationPicker';
import { tokens } from '@/app/theme';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Date must be a valid date',
  }),
  location: z.string().min(1, 'Location is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  category: z.string().min(1, 'Category is required'),
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  initialData?: EventFormData & { id?: string };
  isEditing?: boolean;
}

export default function EventForm({
  initialData,
  isEditing = false,
}: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      date: '',
      location: '',
      latitude: undefined,
      longitude: undefined,
      category: '',
    },
  });

  const latitude = useWatch({
    control,
    name: 'latitude',
    defaultValue: 49.811185,
  });
  const longitude = useWatch({
    control,
    name: 'longitude',
    defaultValue: 24.017955,
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        ...data,
        latitude: data.latitude || undefined,
        longitude: data.longitude || undefined,
      };

      const url =
        isEditing && initialData?.id
          ? `${API_URL}/events/${initialData.id}`
          : `${API_URL}/events`;
      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save event');
      }

      const saved = await response.json();
      router.push(
        isEditing && initialData?.id
          ? `/events/${initialData.id}`
          : `/events/${saved.id}`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: tokens.radiusPx.lg,
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography
          variant="overline"
          color="primary"
          sx={{ mb: 0.5, display: 'block' }}
        >
          {isEditing ? 'Edit' : 'New event'}
        </Typography>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 700 }}>
          {isEditing ? 'Update your event' : 'Create an event'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Fill in the details below.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Event title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category"
                  placeholder="e.g. Music, Tech, Workshop"
                  fullWidth
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date & time"
                  type="datetime-local"
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                  error={!!errors.date}
                  helperText={errors.date?.message}
                />
              )}
            />

            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Venue / address"
                  fullWidth
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />
              )}
            />

            <Divider />

            <EventLocationPicker
              value={{ latitude, longitude }}
              onChange={({
                latitude: nextLatitude,
                longitude: nextLongitude,
              }) => {
                setValue('latitude', nextLatitude, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                setValue('longitude', nextLongitude, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />

            {(errors.latitude || errors.longitude) && (
              <Alert severity="error">
                {errors.latitude?.message || errors.longitude?.message}
              </Alert>
            )}

            <Stack
              direction={{ xs: 'column-reverse', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'flex-end', pt: 1 }}
            >
              <Button
                variant="outlined"
                onClick={() => router.back()}
                disabled={loading}
                fullWidth
                sx={{ sm: { width: 'auto' } }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
                sx={{ sm: { minWidth: 160, width: 'auto' } }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : isEditing ? (
                  'Save changes'
                ) : (
                  'Create event'
                )}
              </Button>
            </Stack>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
