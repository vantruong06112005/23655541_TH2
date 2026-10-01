import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import { PRICE_MULTIPLIER, STUDENT, VARIANT } from '@constants/student';
import { theme } from '@constants/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShopStackParamList } from '@navigation/ShopStack';
import * as Haptics from 'expo-haptics';

type Props = NativeStackScreenProps<ShopStackParamList, 'Detail'>;
export function DetailScreen({ route }: Props) {
  const { data } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const product = data?.find(item => String(item.id) === route.params.id);
  const add = useCartStore(state => state.add);
  if (!product) return <Text style={styles.empty}>Đang tải chi tiết...</Text>;
  const addToCart = () => {
    add(product);
    if (VARIANT.hapticOnAdd === 'selection') Haptics.selectionAsync();
    else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Đã thêm vào giỏ', `MSSV ${STUDENT.mssv}`);
  };
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>
        {Math.round(product.price * PRICE_MULTIPLIER).toLocaleString('vi-VN')} đ
      </Text>
      <Text style={styles.description}>{product.description}</Text>
      <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Thêm vào giỏ</Text>
      </Pressable>
      <Text style={styles.student}>TH2 · {STUDENT.mssv}</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.background },
  content: { padding: 20 },
  image: {
    height: 280,
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: theme.surface,
    borderRadius: 16,
  },
  category: {
    color: theme.secondary,
    marginTop: 20,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  title: { color: theme.text, fontSize: 24, fontWeight: '900', marginTop: 8 },
  price: {
    color: theme.primary,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 10,
  },
  description: { color: theme.textLight, lineHeight: 22, marginTop: 18 },
  button: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: { color: theme.surface, fontWeight: '800', fontSize: 16 },
  student: { color: theme.textLight, textAlign: 'center', marginTop: 24 },
  empty: { padding: 24, color: theme.text },
});
