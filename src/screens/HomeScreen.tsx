import React, { useMemo, useState } from 'react';
import {
    Alert,
    Pressable,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, type Product } from '@services/productApi';
import { ProductCard } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import {
    DEBOUNCE_MS,
    ROOM_LABEL,
    STUDENT,
    STALE_TIME_MS,
    VARIANT,
} from '@constants/student';
import { theme } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ShopStackParamList } from '@navigation/ShopStack';

type Props = NativeStackScreenProps<ShopStackParamList, 'Home'>;
const ExamFlashList = FlashList as unknown as React.ComponentType<any>;

export function HomeScreen({ navigation }: Props) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS);
    const add = useCartStore(state => state.add);
    const { data, isPending, isError, refetch, isRefetching } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: STALE_TIME_MS,
    });
    const products = useMemo(
        () =>
            data?.filter(product =>
            product.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
        ) ?? [],
        [data, debouncedSearch],
    );
    const addProduct = (product: Product) => {
        add(product);
        if (VARIANT.hapticOnAdd === 'selection') Haptics.selectionAsync();
        else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };
    return (
        <SafeAreaView style={styles.page}>
        {VARIANT.watermarkAtTop && <Watermark />}
        <View style={styles.header}>
        <View>
        <Text style={styles.brand}>KTXGO</Text>
        <Text style={styles.room}>Giao tận {ROOM_LABEL}</Text>
        </View>
        <Text style={styles.student}>{STUDENT.mssv}</Text>
        </View>
        <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Tìm món ăn, nước uống..."
        style={styles.search}
        />
        {isPending ? (
            <Text style={styles.center}>Đang tải món...</Text>
        ) : isError ? (
            <View style={styles.center}>
            <Text style={styles.error}>
            Không tải được dữ liệu · {STUDENT.mssv}
            </Text>
            <Pressable onPress={() => refetch()} style={styles.retry}>
            <Text style={styles.retryText}>Thử lại</Text>
            </Pressable>
            </View>
        ) : (
            <ExamFlashList
            data={products}
            numColumns={2}
            estimatedItemSize={245}
            keyExtractor={(item: Product) => `${STUDENT.mssv}-${item.id}`}
            renderItem={({ item }: { item: Product }) => (
                <ProductCard
                product={item}
                onAdd={() => addProduct(item)}
                onPress={() =>
                    navigation.navigate('Detail', { id: String(item.id) })
                }
                />
            )}
            refreshControl={
                <RefreshControl
                refreshing={isRefetching}
                onRefresh={async () => {
                    await refetch();
                }}
                tintColor={theme.primary}
                />
            }
            contentContainerStyle={styles.list}
            />
        )}{' '}
        {!VARIANT.watermarkAtTop && <Watermark />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: theme.background },
    header: {
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    brand: { color: theme.primary, fontSize: 25, fontWeight: '900' },
    room: { color: theme.textLight, marginTop: 2 },
    student: { color: theme.secondary, fontWeight: '800' },
    search: {
        marginHorizontal: 18,
        marginBottom: 6,
        height: 48,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 12,
        backgroundColor: theme.surface,
    },
    list: { padding: 6 },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: theme.text,
        paddingTop: 160,
    },
    error: { color: theme.error, textAlign: 'center', paddingHorizontal: 24 },
    retry: {
        backgroundColor: theme.primary,
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 12,
    },
    retryText: { color: theme.surface, fontWeight: '700' },
});
