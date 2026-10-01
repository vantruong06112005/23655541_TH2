import React from 'react';
import {
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  BASE_SHIP_FEE,
  ROOM_LABEL,
  STUDENT,
  VARIANT,
} from '@constants/student';
import { theme } from '@constants/theme';
import { Watermark } from '@components/Watermark';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { useAuthStore } from '@stores/authStore';

export function MeScreen() {
  const { status, distanceKm, requestLocation, openSettings } =
    useCampusLocation();
  const signOut = useAuthStore(state => state.signOut);
  const shipping =
    distanceKm === null
      ? null
      : BASE_SHIP_FEE + Math.round(distanceKm * 1500) + 2000;
  return (
    <SafeAreaView style={styles.page}>
      {VARIANT.watermarkAtTop && <Watermark />}
      <View style={styles.content}>
        <Text style={styles.heading}>Tôi</Text>
        <Text style={styles.name}>{STUDENT.hoTen}</Text>
        <Text style={styles.meta}>
          MSSV: {STUDENT.mssv} · Giao đến {ROOM_LABEL}
        </Text>
        <Text style={styles.section}>Vị trí giao hàng</Text>
        <Text style={styles.status}>Trạng thái: {status}</Text>
        {status !== 'granted' && status !== 'blocked' && (
          <Pressable onPress={requestLocation} style={styles.button}>
            <Text style={styles.buttonText}>Xin quyền vị trí</Text>
          </Pressable>
        )}
        {status === 'blocked' && (
          <Pressable onPress={openSettings} style={styles.button}>
            <Text style={styles.buttonText}>Mở cài đặt</Text>
          </Pressable>
        )}
        {distanceKm !== null && (
          <Text style={styles.fee}>
            Khoảng cách: {distanceKm.toFixed(2)} km · Phí:{' '}
            {shipping?.toLocaleString('vi-VN')} đ
          </Text>
        )}
        <Pressable onPress={signOut} style={styles.logout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </View>
      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.background },
  content: { padding: 20 },
  heading: { color: theme.text, fontSize: 30, fontWeight: '900' },
  name: {
    color: theme.primary,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 20,
  },
  meta: { color: theme.textLight, marginTop: 6 },
  section: {
    color: theme.text,
    fontWeight: '900',
    fontSize: 18,
    marginTop: 34,
  },
  status: { color: theme.textLight, marginTop: 10 },
  button: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: { color: theme.surface, fontWeight: '800' },
  fee: { color: theme.secondary, fontWeight: '800', marginTop: 18 },
  logout: {
    borderWidth: 1,
    borderColor: theme.error,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 40,
  },
  logoutText: { color: theme.error, fontWeight: '800' },
});
