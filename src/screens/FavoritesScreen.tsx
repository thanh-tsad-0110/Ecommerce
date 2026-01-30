/**
 * FILE: screens/FavoritesScreen.tsx
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../constants';
import { BottomTabParamList, RootStackParamList, Product } from '../types';
import { useFavorites } from '../state/FavoritesContext';
import { useCart } from '../state/CartContext';
import ProductCard from '../components/ProductCard';
import CustomButton from '../components/CustomButton';

type FavoritesScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Favorites'>,
  NativeStackScreenProps<RootStackParamList>
>;

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const { items: favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>❤️</Text>
          <Text style={styles.emptyTitle}>Danh sách trống</Text>
          <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích nào</Text>
          <CustomButton
            title="Khám phá sản phẩm"
            onPress={() => navigation.navigate('Home')}
            variant="primary"
            size="large"
            style={{ marginTop: SPACING.lg }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }: { item: Product }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            onAddToCart={() => addToCart({
              id: `${item.id}-${Date.now()}`,
              productId: item.id,
              name: item.name,
              price: item.price,
              quantity: 1,
              image: item.image,
            })}
            onToggleFavorite={() => removeFromFavorites(item.id)}
            variant="list"
          />
        )}
        keyExtractor={(item: Product) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Danh sách yêu thích ({favorites.length})</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
});

export default FavoritesScreen;
