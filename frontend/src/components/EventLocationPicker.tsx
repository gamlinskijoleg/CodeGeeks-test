'use client';

import dynamic from 'next/dynamic';
import { useMapEvents } from 'react-leaflet';
import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  alpha,
} from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import 'leaflet/dist/leaflet.css';
import { tokens } from '@/app/theme';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false, loading: () => <CircularProgress size={28} /> },
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false },
);

const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false },
);

interface EventLocationValue {
  latitude?: number;
  longitude?: number;
}

interface EventLocationPickerProps {
  value?: EventLocationValue;
  onChange: (location: { latitude: number; longitude: number }) => void;
  center?: [number, number];
  zoom?: number;
}

function MapClickHandler({
  onChange,
}: Pick<EventLocationPickerProps, 'onChange'>) {
  useMapEvents({
    click(event) {
      onChange({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
}

export default function EventLocationPicker({
  value,
  onChange,
  center = [51.505, -0.09],
  zoom = 13,
}: EventLocationPickerProps) {
  const theme = useTheme();

  const selectedLocation =
    value?.latitude !== undefined && value?.longitude !== undefined
      ? ([value.latitude, value.longitude] as [number, number])
      : null;

  const mapCenter = selectedLocation ?? center;

  return (
    <Box>
      <StackLabel />
      <Box
        sx={{
          height: 360,
          borderRadius: tokens.radiusPx.lg,
          overflow: 'hidden',
          border: `1px solid ${tokens.palette.border}`,
          boxShadow: tokens.shadow.card,
          '& .leaflet-container': {
            height: '100%',
            width: '100%',
            cursor: 'crosshair',
          },
        }}
      >
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler onChange={onChange} />
          {selectedLocation && (
            <CircleMarker
              center={selectedLocation}
              radius={12}
              pathOptions={{
                color: theme.palette.primary.main,
                fillColor: theme.palette.secondary.main,
                fillOpacity: 0.85,
                weight: 3,
              }}
            />
          )}
        </MapContainer>
      </Box>

      {selectedLocation ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
          <PlaceOutlinedIcon
            sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 0.5 }}
          />
          {selectedLocation[0].toFixed(6)}, {selectedLocation[1].toFixed(6)}
        </Typography>
      ) : (
        <Typography
          variant="body2"
          sx={{
            mt: 1.5,
            color: 'text.secondary',
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            px: 2,
            py: 1,
            borderRadius: tokens.radiusPx.md,
          }}
        >
          Click the map to set the event location.
        </Typography>
      )}
    </Box>
  );
}

function StackLabel() {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        Pin on map
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Click anywhere on the map to place or move the marker.
      </Typography>
    </Box>
  );
}
