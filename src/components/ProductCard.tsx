import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Product } from '@services/productApi';
import { PRICE_MULTIPLIER } from '@constants/student';
import { theme } from '@constants/theme';

type Props = { product: Product; onPress: () => void; onAdd: () => void };

export function ProductCard({ product, onPress, onAdd }: Props) {
  const price = Math.round(product.price * PRICE_MULTIPLIER);
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.price}>{price.toLocaleString('vi-VN')} đ</Text>
        <Pressable
          accessibilityLabel="Thêm vào giỏ"
          onPress={onAdd}
          style={styles.add}
        >
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    padding: 10,
    minHeight: 245,
    borderRadius: 14,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },
  image: { width: '100%', height: 125, resizeMode: 'contain', marginBottom: 8 },
  title: { color: theme.text, fontSize: 14, fontWeight: '700', lineHeight: 19 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  price: { color: theme.primary, fontWeight: '800', fontSize: 13 },
  add: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
  },
  addText: { color: theme.surface, fontSize: 22, lineHeight: 24 },
});
