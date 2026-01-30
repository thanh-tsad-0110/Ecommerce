/**
 * FILE: screens/HomeScreen.tsx
 * GIẢI THÍCH:
 * - Màn hình chính hiển thị banner, danh mục, sản phẩm nổi bật
 * - Có image carousel cho banner
 * - Infinite scroll để load thêm sản phẩm
 * - Pull-to-refresh để cập nhật dữ liệu
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants';
import { RootStackParamList, Product, Category } from '../types';
import { mockProducts, mockCategories, mockBanners } from '../constants/mockData';
import ProductCard from '../components/ProductCard';
import CustomButton from '../components/CustomButton';
import { useCart } from '../state/CartContext';
import { useFavorites } from '../state/FavoritesContext';
import { useTheme } from '../state/ThemeContext';
import { formatPrice } from '../utils/formatting';


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // ============================================================
  // STATE (Quản lý dữ liệu màn hình)
  // ============================================================

  const [bannerIndex, setBannerIndex] = useState(0);                // Index banner hiện tại
  const [products, setProducts] = useState<Product[]>([]);          // Danh sách sản phẩm
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);                 // Đang tải dữ liệu
  const [isRefreshing, setIsRefreshing] = useState(false);          // Đang refresh
  const [page, setPage] = useState(1);                              // Trang hiện tại
  const [hasMore, setHasMore] = useState(true);                     // Có trang tiếp theo

  // Lấy cart và favorites context
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { colors } = useTheme();

  // ============================================================
  // MOCK DATA (Dữ liệu giả trong khi không có API)
  // ============================================================

  const banners = mockBanners;

  // ============================================================
  // EFFECTS (Tải dữ liệu khi component mount)
  // ============================================================

  useEffect(() => {
    loadInitialData();

    // Auto scroll banner mỗi 5 giây
    const bannerInterval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(bannerInterval);
  }, []);

  // ============================================================
  // FUNCTIONS (Các hàm xử lý logic)
  // ============================================================

  /**
   * loadInitialData: Tải dữ liệu ban đầu
   * Trong thực tế sẽ gọi API để lấy dữ liệu từ server
   */
  const loadInitialData = async () => {
    try {
      setIsLoading(true);

      // Giả lập delay gọi API (2 giây)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setCategories(mockCategories);
      setFeaturedProducts(mockProducts.slice(0, 6));
      setFlashSaleProducts(mockProducts.filter((p) => p.isFlashSale).slice(0, 4));
      setNewArrivals(mockProducts.filter((p) => p.isNew).slice(0, 4));
      setProducts(mockProducts.slice(0, 6));
      setPage(1);
      setHasMore(true);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleRefresh: Làm mới dữ liệu (pull-to-refresh)
   */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      loadInitialData();
    } finally {
      setIsRefreshing(false);
    }
  };

  /**
   * loadMoreProducts: Tải thêm sản phẩm (infinite scroll)
   */
  const loadMoreProducts = async () => {
    if (!hasMore || isLoading) return;

    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Giả lập thêm products
      const newProducts = mockProducts.slice((page + 1) * 6, (page + 2) * 6);

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts([...products, ...newProducts]);
        setPage(page + 1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * handleAddToCart: Thêm sản phẩm vào giỏ
   */
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });

    // Hiển thị thông báo (có thể dùng Toast)
    Alert.alert('Thêm vào giỏ', `✓ ${product.name} đã được thêm vào giỏ hàng`);
  };

  /**
   * handleToggleFavorite: Thêm/xóa khỏi danh sách yêu thích
   */
  const handleToggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({ ...product, isFavorite: true });
    }
  };

  /**
   * handleProductPress: Khi click vào sản phẩm
   */
  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  // ============================================================
  // RENDER COMPONENTS (Các component render)
  // ============================================================

  const styles = getStyles(colors);

  /**
   * BannerCarousel: Hình ảnh carousel
   */
  const renderBannerCarousel = () => (
    <View style={styles.bannerContainer}>
      <Image
        source={{ uri: banners[bannerIndex].image }}
        style={styles.bannerImage}
      />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerTitle}>{banners[bannerIndex].title}</Text>
        <Text style={styles.bannerDiscount}>Giảm {banners[bannerIndex].discount}</Text>
      </View>

      {/* Indicators (các chấm) */}
      <View style={styles.indicators}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === bannerIndex && styles.indicatorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );

  /**
   * CategoriesGrid: Grid danh mục
   */
  const renderCategories = () => (
    <View>
      <Text style={styles.sectionTitle}>Danh Mục</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => {
              // Điều hướng đến search với danh mục đã chọn
              navigation.navigate('Search');
            }}
          >
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryIconText}>{category.icon}</Text>
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  /**
   * SectionProducts: Hiển thị danh sách sản phẩm theo section
   */
  const renderProductsSection = (
    title: string,
    data: Product[],
    onViewMore?: () => void
  ) => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onViewMore}>
          <Text style={styles.viewMoreLink}>Xem thêm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productsGrid}>
        {data.map((item) => (
          <View key={item.id} style={styles.productItem}>
            <ProductCard
              product={item}
              onPress={() => handleProductPress(item.id)}
              onAddToCart={() => handleAddToCart(item)}
              onToggleFavorite={() => handleToggleFavorite(item)}
              variant="grid"
            />
          </View>
        ))}
      </View>
    </View>
  );

  // ============================================================
  // LOADING STATE (Đang tải)
  // ============================================================

  if (isLoading && products.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================
  // MAIN RENDER
  // ============================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* BANNER CAROUSEL */}
        {renderBannerCarousel()}

        {/* CATEGORIES */}
        <View style={styles.section}>
          {renderCategories()}
        </View>

        {/* FLASH SALE */}
        <View style={styles.section}>
          {renderProductsSection(
            '⚡ Flash Sale',
            flashSaleProducts,
            () => alert('Xem thêm flash sale')
          )}
        </View>

        {/* FEATURED PRODUCTS */}
        <View style={styles.section}>
          {renderProductsSection(
            '⭐ Sản Phẩm Nổi Bật',
            featuredProducts,
            () => alert('Xem thêm sản phẩm nổi bật')
          )}
        </View>

        {/* NEW ARRIVALS */}
        <View style={styles.section}>
          {renderProductsSection(
            '🆕 Hàng Mới Về',
            newArrivals,
            () => alert('Xem thêm hàng mới')
          )}
        </View>

        {/* BEST SELLERS */}
        <View style={styles.section}>
          {renderProductsSection(
            '🔥 Best Sellers',
            products,
            () => loadMoreProducts()
          )}
        </View>

        {/* LOAD MORE INDICATOR */}
        {isLoading && products.length > 0 && (
          <View style={styles.loadMoreContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadMoreText}>Đang tải thêm...</Text>
          </View>
        )}

        {/* EMPTY STATE */}
        {!hasMore && products.length > 0 && (
          <View style={styles.endMessage}>
            <Text style={styles.endMessageText}>Bạn đã xem hết sản phẩm 👍</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: colors.textLight,
  },

  // BANNER
  bannerContainer: {
    position: 'relative',
    height: 200,
    margin: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.lg,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: colors.border,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bannerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.textInverse,
  },
  bannerDiscount: {
    fontSize: FONT_SIZES.lg,
    color: colors.warning,
    fontWeight: FONT_WEIGHTS.semibold,
    marginTop: SPACING.xs,
  },
  indicators: {
    position: 'absolute',
    bottom: SPACING.md,
    right: SPACING.lg,
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorActive: {
    backgroundColor: colors.textInverse,
  },

  // SECTIONS
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.text,
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  viewMoreLink: {
    color: colors.primary,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
  },

  // CATEGORIES
  categoriesScroll: {
    marginHorizontal: -SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: SPACING.lg,
    minWidth: 70,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryIconText: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: FONT_SIZES.xs,
    color: colors.text,
    textAlign: 'center',
  },

  // PRODUCTS GRID
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  productItem: {
    width: '47%', // (100% - gap) / 2
    marginBottom: SPACING.sm,
  },

  // LOAD MORE
  loadMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
  },
  loadMoreText: {
    fontSize: FONT_SIZES.sm,
    color: colors.textLight,
  },
  endMessage: {
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
  endMessageText: {
    fontSize: FONT_SIZES.md,
    color: colors.textLight,
  },
});

export default HomeScreen;
