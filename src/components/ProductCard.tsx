/**
 * FILE: components/ProductCard.tsx
 * GIẢI THÍCH: Card hiển thị thông tin sản phẩm
 */

import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Product } from '../types';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants';
import CustomButton from './CustomButton';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  variant?: 'grid' | 'list';
}

/**
 * ProductCard: Hiển thị một sản phẩm dưới dạng card
 * 
 * Features:
 * - Hình ảnh sản phẩm
 * - Tên, giá, đánh giá
 * - Badge cho discount, new, flash sale
 * - Nút add to cart
 * - Nút yêu thích
 * 
 * Ví dụ:
 * <ProductCard
 *   product={product}
 *   onPress={() => navigation.navigate('ProductDetail')}
 *   onAddToCart={() => handleAddCart(product)}
 * />
 */
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  onToggleFavorite,
  variant = 'grid',
}) => {
  const imageWidth = variant === 'grid' ? Dimensions.get('window').width / 2 - SPACING.lg : 80;
  const imageHeight = variant === 'grid' ? 150 : 80;

  // Giá hiển thị là giá hiện tại (đã giảm nếu có). Tránh trừ giảm giá lần nữa.
  const discountedPrice = product.price;

  const renderStars = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{'⭐'.repeat(Math.floor(rating))}</Text>
        <Text style={styles.reviewsText}>({product.reviews})</Text>
      </View>
    );
  };

  if (variant === 'list') {
    // List view variant
    return (
      <TouchableOpacity
        style={styles.listContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {/* Hình ảnh */}
        <Image
          source={{ uri: product.image }}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
        />

        {/* Thông tin */}
        <View style={styles.listInfo}>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>

          {renderStars(product.rating)}

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {discountedPrice.toLocaleString('vi-VN')}đ
            </Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onToggleFavorite}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.favoriteIcon}>{product.isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  // Grid view variant (mặc định)
  return (
    <TouchableOpacity
      style={styles.gridContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Container hình ảnh */}
      <View style={styles.imageWrapper}>
        {/* Hình ảnh */}
        <Image
          source={{ uri: product.image }}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
        />

        {/* Badges (discount, new, sale) */}
        {product.discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.badgeText}>-{product.discount}%</Text>
          </View>
        ) : null}

        {product.isNew && (
          <View style={[styles.badge, styles.newBadge]}>
            <Text style={styles.badgeText}>Mới</Text>
          </View>
        )}

        {product.isFlashSale && (
          <View style={[styles.badge, styles.flashSaleBadge]}>
            <Text style={styles.badgeText}>⚡</Text>
          </View>
        )}

        {/* Favorite button */}
        <TouchableOpacity
          style={styles.favoriteCircle}
          onPress={onToggleFavorite}
        >
          <Text style={styles.favoriteIcon}>
            {product.isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Thông tin sản phẩm */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Đánh giá */}
        {renderStars(product.rating)}

        {/* Giá */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {discountedPrice.toLocaleString('vi-VN')}đ
          </Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>
              {product.originalPrice.toLocaleString('vi-VN')}đ
            </Text>
          )}
        </View>

        {/* Nút add to cart */}
        <CustomButton
          title="Thêm vào giỏ"
          onPress={onAddToCart || (() => {})}
          variant="primary"
          size="small"
          style={{ marginTop: SPACING.sm }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Grid variant
  gridContainer: {
    flex: 0.5,
    marginHorizontal: SPACING.sm,
    marginVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
    ...SHADOWS.md,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: COLORS.backgroundDark,
  },
  discountBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  badge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  newBadge: {
    backgroundColor: COLORS.primary,
  },
  flashSaleBadge: {
    backgroundColor: COLORS.warning,
  },
  badgeText: {
    color: COLORS.textInverse,
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.bold as any,
  },
  favoriteCircle: {
    position: 'absolute',
    bottom: SPACING.md,
    right: SPACING.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  favoriteIcon: {
    fontSize: 18,
  },
  info: {
    padding: SPACING.md,
  },
  name: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold as any,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  ratingText: {
    marginRight: SPACING.xs,
  },
  reviewsText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  price: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold as any,
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginLeft: SPACING.sm,
    textDecorationLine: 'line-through',
  },

  // List variant
  listContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: 'center',
    position: 'relative',
  },
  listInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.lg,
    padding: SPACING.sm,
  },
});

export default ProductCard;
