import { useCallback, useState } from 'react';
import { Linking } from 'react-native';
import * as Location from 'expo-location';

const CAMPUS_GATE = { latitude: 10.8231, longitude: 106.6297 };

function haversineKm(latitude: number, longitude: number) {
  const earthRadius = 6371;
  const toRadians = (value: number) => value * Math.PI / 180;
  const deltaLatitude = toRadians(latitude - CAMPUS_GATE.latitude);
  const deltaLongitude = toRadians(longitude - CAMPUS_GATE.longitude);
  const a = Math.sin(deltaLatitude / 2) ** 2 + Math.cos(toRadians(CAMPUS_GATE.latitude)) * Math.cos(toRadians(latitude)) * Math.sin(deltaLongitude / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function useCampusLocation() {
  const [status, setStatus] = useState<'idle' | 'granted' | 'denied' | 'blocked'>('idle');
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

  const requestLocation = useCallback(async () => {
    const servicesEnabled = await Location.hasServicesEnabledAsync();
    if (!servicesEnabled) {
      setStatus('denied');
      return;
    }
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.status === Location.PermissionStatus.GRANTED) {
      const position = await Location.getCurrentPositionAsync({});
      setDistanceKm(haversineKm(position.coords.latitude, position.coords.longitude));
      setStatus('granted');
    } else if (permission.canAskAgain === false) {
      setStatus('blocked');
    } else {
      setStatus('denied');
    }
  }, []);

  const openSettings = useCallback(() => Linking.openSettings(), []);
  return { status, distanceKm, requestLocation, openSettings };
}