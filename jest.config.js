module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^expo-haptics$': '<rootDir>/__mocks__/expoHaptics.ts',
    '^expo-location$': '<rootDir>/__mocks__/expoLocation.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((@react-native|@react-native-async-storage|@react-navigation|@shopify|expo|expo-haptics|expo-location|expo-modules-core|react-native|react-native-safe-area-context|react-native-screens|zustand)/))',
  ],
};
