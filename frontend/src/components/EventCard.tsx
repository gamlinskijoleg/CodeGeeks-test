'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  alpha,
  useTheme,
} from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sx, tokens } from '@/app/theme';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  onDelete?: (id: string) => void;
  variant?: 'default' | 'compact';
}

export default function EventCard({
  id,
  title,
  description,
  date,
  location,
  category,
  onDelete,
  variant = 'default',
}: EventCardProps) {
  const theme = useTheme();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const eventDate = new Date(date);
  const day = eventDate.toLocaleDateString('en-US', { day: 'numeric' });
  const month = eventDate
    .toLocaleDateString('en-US', { month: 'short' })
    .toUpperCase();
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const isCompact = variant === 'compact';

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await onDelete?.(id);
      setDeleteDialogOpen(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Card
        onClick={() => router.push(`/events/${id}`)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          ...sx.cardHover,
        }}
      >
        <Box
          sx={{
            height: isCompact ? 100 : 140,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.85)} 0%, ${alpha(theme.palette.secondary.main, 0.75)} 100%)`,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Chip
            label={category}
            size="small"
            sx={{
              bgcolor: alpha('#fff', 0.2),
              color: '#fff',
              fontWeight: 600,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${alpha('#fff', 0.25)}`,
            }}
          />
          <Box
            sx={{
              bgcolor: '#fff',
              borderRadius: tokens.radiusPx.md,
              px: 1.5,
              py: 1,
              textAlign: 'center',
              minWidth: 52,
              boxShadow: tokens.shadow.card,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                fontWeight: 700,
                color: theme.palette.primary.main,
                lineHeight: 1,
                letterSpacing: '0.06em',
              }}
            >
              {month}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                lineHeight: 1.1,
                color: tokens.palette.text.primary,
              }}
            >
              {day}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ flex: 1, p: isCompact ? 2 : 2.5 }}>
          <Typography
            variant={isCompact ? 'subtitle1' : 'h6'}
            component="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>

          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              mb: isCompact ? 1 : 1.5,
              color: 'text.secondary',
              alignItems: 'flex-start',
            }}
          >
            <LocationOnOutlinedIcon sx={{ fontSize: 18, mt: 0.15 }} />
            <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
              {location}
            </Typography>
          </Stack>

          {!isCompact && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </Typography>
          )}

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 1.5 }}
          >
            {formattedDate}
          </Typography>
        </CardContent>

        {!isCompact && onDelete && (
          <CardActions
            sx={{
              px: 2,
              pb: 2,
              pt: 0,
              justifyContent: 'space-between',
              '& a': { textDecoration: 'none' },
            }}
            onClick={(e) => e.preventDefault()}
          >
            <Button
              size="small"
              endIcon={<ArrowForwardIcon />}
              sx={{ fontWeight: 600 }}
              component={Link}
              href={`/events/${id}`}
            >
              View details
            </Button>
            <Box>
              <IconButton
                size="small"
                component={Link}
                href={`/events/${id}/edit`}
                aria-label="Edit event"
                onClick={(e) => e.stopPropagation()}
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                aria-label="Delete event"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDeleteDialogOpen(true);
                }}
              >
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
          </CardActions>
        )}
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete event?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Are you sure you want to delete <strong>{title}</strong>? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
