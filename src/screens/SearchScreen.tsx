/**
 * FILE: screens/SearchScreen.tsx
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
} from '../constants';
import { useTheme } from '../state/ThemeContext';
import {
  RootStackParamList,
  BottomTabParamList,
  Product,
  ProductFilters,
  SortOption,
} from '../types';
import ProductCard from '../components/ProductCard';
import { useFavorites } from '../state/FavoritesContext';
import { useCart } from '../state/CartContext';
import { mockProducts } from '../constants/mockData';

type SearchScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Search'>,
  NativeStackScreenProps<RootStackParamList>
>;

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  // ================= STATE =================
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'iPhone 15',
    'Samsung Galaxy',
    'AirPods Pro',
    'Laptop Dell',
  ]);
  const [trendingSearches] = useState<string[]>([
    'iPhone 15 Pro',
    'MacBook Air M3',
    'iPad Pro',
    'Apple Watch',
  ]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [filters] = useState<ProductFilters>({
    priceRange: { min: 0, max: 10000000 },
  });

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  // ================= FUNCTIONS =================
  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      await new Promise(resolve => setTimeout(resolve, 800));

      const results = mockProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );

      setSearchResults(results);

      if (!searchHistory.includes(query)) {
        setSearchHistory([query, ...searchHistory.slice(0, 4)]);
      }

      setIsSearching(false);
    },
    [searchHistory],
  );

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    Alert.alert('Thêm vào giỏ', `✓ ${product.name} đã được thêm vào giỏ hàng`);
  };

  const handleToggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({ ...product, isFavorite: true });
    }
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    const sorted = [...searchResults];
    if (option === 'price_low') sorted.sort((a, b) => a.price - b.price);
    if (option === 'price_high') sorted.sort((a, b) => b.price - a.price);
    if (option === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    setSearchResults(sorted);
  };

  // ================= RENDER =================
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const renderSearchResults = () => {
    if (isSearching) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.text }}>Đang tìm kiếm...</Text>
        </View>
      );
    }

    if (!searchResults.length && searchQuery) {
      return (
        <View style={styles.center}>
          <Text style={{ fontSize: 40 }}>🔍</Text>
          <Text style={{ color: colors.text }}>Không tìm thấy kết quả</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={searchResults}
        key={viewType}
        keyExtractor={(item: Product) => item.id}
        numColumns={viewType === 'grid' ? 2 : 1}
        columnWrapperStyle={
          viewType === 'grid' ? styles.columnWrapper : undefined
        }
        renderItem={({ item }: { item: Product }) => (
          <ProductCard
            product={item}
            variant={viewType}
            onPress={() =>
              navigation.navigate('ProductDetail', { productId: item.id })
            }
            onAddToCart={() => handleAddToCart(item)}
            onToggleFavorite={() => handleToggleFavorite(item)}
          />
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* SEARCH BAR */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm sản phẩm..."
            placeholderTextColor={colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch(searchQuery)}
          />
        </View>

        {/* TRENDING */}
        {!searchQuery && (
          <View style={styles.tags}>
            {trendingSearches.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tag}
                onPress={() => {
                  setSearchQuery(item);
                  handleSearch(item);
                }}
              >
                <Text style={{ color: colors.text }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* SORT */}
        {searchResults.length > 0 && (
          <View style={styles.sortRow}>
            {['popularity', 'price_low', 'price_high', 'rating'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.sortBtn,
                  sortBy === option && styles.sortActive,
                ]}
                onPress={() => handleSortChange(option as SortOption)}
              >
                <Text style={{ color: sortBy === option ? colors.textInverse : colors.text }}>{option}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => setViewType('grid')}>
              <Text style={{ color: colors.text }}>▦</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewType('list')}>
              <Text style={{ color: colors.text }}>☰</Text>
            </TouchableOpacity>
          </View>
        )}

        {renderSearchResults()}
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchBar: { padding: SPACING.lg },
  searchInput: {
    backgroundColor: colors.backgroundDark,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    height: 40,
    color: colors.text,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    padding: SPACING.lg,
  },
  tag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: colors.backgroundDark,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  sortBtn: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: BORDER_RADIUS.sm,
  },
  sortActive: {
    backgroundColor: colors.primary,
  },
  center: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  columnWrapper: {
    gap: SPACING.md,
  },
});

export default SearchScreen;

