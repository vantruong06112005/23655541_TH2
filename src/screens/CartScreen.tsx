import React from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCartStore } from '@stores/cartStore';
import {
  calculateShippingFee,
  ROOM_LABEL,
  STUDENT,
  VARIANT,
} from '@constants/student';
import { theme } from '@constants/theme';
import { Watermark } from '@components/Watermark';
import { useCampusLocation } from '@hooks/useCampusLocation';

export function CartScreen() {
  const { items, changeQty, remove, totalQuantity, totalAmount } =
    useCartStore();
  const { distanceKm } = useCampusLocation();
  const shipping = distanceKm === null ? 0 : calculateShippingFee(distanceKm);
  return (
    <SafeAreaView style={styles.page}>
      {VARIANT.watermarkAtTop && <Watermark />}
      <Text style={styles.heading}>Giỏ hàng ({totalQuantity()})</Text>
      {items.length === 0 ? (
        <Text style={styles.empty}>Chưa có món nào trong giỏ.</Text>
      ) : (
        items.map(item => (
          <View key={`${STUDENT.mssv}-${item.id}`} style={styles.row}>
            <Text numberOfLines={2} style={styles.name}>
              {item.title}
            </Text>
            <View style={styles.controls}>
              <Pressable
                onPress={() => changeQty(item.id, item.quantity - 1)}
                style={styles.step}
              >
                <Text>-</Text>
              </Pressable>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Pressable
                onPress={() => changeQty(item.id, item.quantity + 1)}
                style={styles.step}
              >
                <Text>+</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  remove(item.id);
                  Alert.alert('Đã xoá món');
                }}
              >
                <Text style={styles.remove}>Xoá</Text>
              </Pressable>
            </View>
          </View>
        ))
      )}
      <View style={styles.summary}>
        <Text style={styles.info}>Phòng giao: {ROOM_LABEL}</Text>
        <Text style={styles.info}>
          Tạm tính: {totalAmount().toLocaleString('vi-VN')} đ
        </Text>
        <Text style={styles.info}>
          Phí ship: {shipping.toLocaleString('vi-VN')} đ
        </Text>
      </View>
      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.background },
  heading: { color: theme.text, fontWeight: '900', fontSize: 26, padding: 20 },
  empty: { textAlign: 'center', color: theme.textLight, paddingTop: 80 },
  row: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
  },
  name: { color: theme.text, fontWeight: '700' },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 12,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: { fontWeight: '800' },
  remove: { color: theme.error, fontWeight: '700', marginLeft: 'auto' },
  summary: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: theme.surface,
  },
  info: { color: theme.text, fontWeight: '700', marginVertical: 4 },
});
