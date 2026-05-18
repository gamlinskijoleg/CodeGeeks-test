'use client';

import dynamic from 'next/dynamic';
import { useMemo, useEffect } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { tokens } from '@/app/theme';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false, loading: () => <CircularProgress size={28} /> },
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false },
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false },
);

const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

import 'leaflet/dist/leaflet.css';

interface EventLocation {
  id: string;
  title: string;
  latitude?: number;
  longitude?: number;
}

interface EventMapProps {
  events: EventLocation[];
  center?: [number, number];
  zoom?: number;
  height?: number;
}

export default function EventMap({
  events,
  center = [51.505, -0.09],
  zoom = 13,
  height = 400,
}: EventMapProps) {
  useEffect(() => {
    import('leaflet').then((L) => {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  const eventsWithCoords = useMemo(
    () =>
      events.filter(
        (e) => e.latitude !== undefined && e.longitude !== undefined,
      ),
    [events],
  );

  if (eventsWithCoords.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height,
          bgcolor: tokens.palette.background.subtle,
          borderRadius: tokens.radiusPx.lg,
          border: `1px dashed ${tokens.palette.border}`,
          gap: 1,
        }}
      >
        <PlaceOutlinedIcon color="disabled" />
        <Typography variant="body2" color="text.secondary">
          No location data to display
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height,
        borderRadius: tokens.radiusPx.lg,
        overflow: 'hidden',
        border: `1px solid ${tokens.palette.border}`,
        boxShadow: tokens.shadow.card,
        '& .leaflet-container': {
          height: '100%',
          width: '100%',
          fontFamily: 'inherit',
        },
        '& .leaflet-popup-content-wrapper': {
          borderRadius: tokens.radiusPx.md,
          boxShadow: tokens.shadow.dropdown,
        },
        '& .leaflet-popup-content': {
          margin: '12px 14px',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: tokens.palette.text.primary,
        },
      }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {eventsWithCoords.map((event) => (
          <Marker key={event.id} position={[event.latitude!, event.longitude!]}>
            <Popup>
              <Box sx={{ minWidth: 120 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {event.title}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}
