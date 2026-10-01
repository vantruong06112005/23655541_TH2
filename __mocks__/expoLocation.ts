export const requestForegroundPermissionsAsync = jest.fn(async () => ({
  status: 'denied',
}));

export const getCurrentPositionAsync = jest.fn(async () => ({
  coords: { latitude: 0, longitude: 0 },
}));