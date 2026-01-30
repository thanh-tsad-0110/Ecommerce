/**
 * FILE: screens/ProductDetailScreen.tsx
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants';
import { RootStackParamList, CartItem, Product } from '../types';
import CustomButton from '../components/CustomButton';
import { useCart } from '../state/CartContext';
import { useFavorites } from '../state/FavoritesContext';
import { formatPrice } from '../utils/formatting';
import { findProductById } from '../constants/mockData';

type ProductDetailProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC<ProductDetailProps> = ({ route, navigation }) => {
  const { productId } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const fallbackProduct: Product = {
    id: productId,
    name: 'Sản phẩm không tìm thấy',
    description: 'Vui lòng quay lại hoặc thử sản phẩm khác.',
    price: 0,
    image: 'https://dummyimage.com/900x900/cccccc/333333&text=No+image',
    images: ['https://dummyimage.com/900x900/cccccc/333333&text=No+image'],
    category: '',
    brand: '',
    rating: 0,
    reviews: 0,
    stock: 0,
    discount: 0,
    isFavorite: false,
    isNew: false,
    isFlashSale: false,
  };

  const product = findProductById(productId) ?? fallbackProduct;

  const specsMap: Record<string, string[]> = {
    p1: [
      'Màn hình: 6.7" Super Retina XDR 120Hz',
      'Chip: A17 Pro',
      'Bộ nhớ: 256GB',
      'Camera: 48MP ProRAW',
      'Pin: 29 giờ xem video',
    ],
    p2: [
      'Màn hình: 6.8" Dynamic AMOLED 120Hz',
      'Chip: Snapdragon 8 Gen 3',
      'Bộ nhớ: 256GB + microSD 1TB',
      'Camera: Zoom quang 10x',
      'Pin: 5000 mAh sạc 45W',
    ],
    p3: [
      'CPU: Apple M3 8-core',
      'RAM: 16GB',
      'SSD: 512GB',
      'Màn: 13" Liquid Retina',
      'Pin: Lên tới 18 giờ',
    ],
    p4: [
      'CPU: Apple M3 Pro 12-core',
      'RAM: 18GB',
      'SSD: 1TB',
      'Màn: 14" Liquid Retina XDR 120Hz',
      'Cổng: 3x Thunderbolt 4, HDMI, SDXC',
    ],
    p5: [
      'Màn: 12.9" mini-LED 120Hz',
      'Chip: Apple M2',
      'Bộ nhớ: 256GB',
      'Hỗ trợ: Apple Pencil 2',
      'Kết nối: Wi‑Fi 6E',
    ],
    p6: [
      'Màn: 11" Liquid Retina 120Hz',
      'Chip: Apple M2',
      'Bộ nhớ: 256GB',
      'Trọng lượng: 462g',
      'Pin: 10 giờ lướt web',
    ],
    p7: [
      'Màn LTPO 2.000 nits',
      'Cảm biến: ECG, SpO2, nhiệt độ',
      'Pin: 36 giờ',
      'Chống nước: WR50, IP6X',
      'Sạc nhanh USB‑C',
    ],
    p8: [
      'Chip: Apple H2',
      'ANC + Transparency + Adaptive Audio',
      'Pin: 6h (30h với case)',
      'Sạc: USB‑C, MagSafe',
      'Tìm kiếm qua Find My',
    ],
    p9: [
      'ANC thế hệ 5',
      'Driver 30mm Carbon',
      'Pin: 30 giờ (ANC)',
      'Sạc nhanh: 3 phút = 3 giờ',
      'Kết nối: Multipoint, LDAC',
    ],
    p10: [
      'Cảm biến Darkfield 8K',
      'Cuộn Magspeed 1.000 dòng/giây',
      'Kết nối: Bolt / Bluetooth',
      'Pin: 70 ngày, sạc USB‑C',
      'Tương thích: 3 thiết bị',
    ],
    p11: [
      'Màn OLED 7"',
      'Chế độ Dock/Handheld',
      'Bộ nhớ: 64GB, hỗ trợ thẻ nhớ',
      'Pin: 4.5 - 9 giờ',
      'Cổng: LAN trên dock',
    ],
    p12: [
      'Màn e-ink 6.8" 300ppi',
      'Đèn nền ấm điều chỉnh',
      'Pin: Vài tuần',
      'Chống nước IPX8',
      'USB‑C, hỗ trợ Audible',
    ],
  };

  const specs = specsMap[product.id] || ['Đang cập nhật thông số.'];

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    };
    addToCart(cartItem);
    alert(`✓ Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({ ...product, isFavorite: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE CAROUSEL */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.images[selectedImage] }} style={styles.mainImage} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          >
            <Text style={styles.favoriteIcon}>
              {isFavorite(product.id) ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* IMAGE THUMBNAILS */}
        <FlatList
          data={product.images}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.thumbnail, selectedImage === index && styles.thumbnailActive]}
              onPress={() => setSelectedImage(index)}
            >
              <Image source={{ uri: item }} style={styles.thumbnailImage} />
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailList}
        />

        {/* PRODUCT INFO */}
        <View style={styles.infoContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>

          {/* RATING */}
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingStars}>⭐ {product.rating}</Text>
            <Text style={styles.reviewsCount}>({product.reviews} đánh giá)</Text>
          </View>

          {/* PRICE */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </Text>
            )}
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{product.discount}%</Text>
              </View>
            )}
          </View>

          {/* DESCRIPTION */}
          <Text style={styles.description}>{product.description}</Text>

          {/* SPECS */}
          <View style={styles.specsContainer}>
            <Text style={styles.specsTitle}>Thông số kỹ thuật</Text>
            {specs.map((spec, index) => (
              <Text key={index} style={styles.specItem}>
                • {spec}
              </Text>
            ))}
          </View>

          {/* QUANTITY SELECTOR */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Số lượng:</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* STOCK STATUS */}
          <Text style={styles.stock}>
            📦 Còn hàng: {product.stock} sản phẩm
          </Text>

          {/* BUTTONS */}
          <View style={styles.buttonsContainer}>
            <CustomButton
              title="Thêm vào giỏ"
              onPress={handleAddToCart}
              variant="primary"
              size="large"
            />
            <CustomButton
              title="Mua ngay"
              onPress={() => {
                handleAddToCart();
                navigation.navigate('Checkout');
              }}
              variant="secondary"
              size="large"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: COLORS.backgroundDark,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.lg,
  },
  favoriteIcon: {
    fontSize: 24,
  },
  thumbnailList: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  thumbnail: {
    width: 70,
    height: 70,
    marginRight: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundDark,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbnailActive: {
    borderColor: COLORS.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  brand: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  name: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  ratingStars: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  reviewsCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginLeft: SPACING.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  price: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  discountText: {
    color: COLORS.textInverse,
    fontWeight: FONT_WEIGHTS.bold,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  specsContainer: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: BORDER_RADIUS.md,
  },
  specsTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  specItem: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  quantityLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
  quantityValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
    minWidth: 30,
    textAlign: 'center',
  },
  stock: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.success,
    marginBottom: SPACING.lg,
  },
  buttonsContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
});

export default ProductDetailScreen;
