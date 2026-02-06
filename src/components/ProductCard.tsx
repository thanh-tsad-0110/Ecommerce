/**
 * FILE: components/ProductCard.tsx
 * GIẢI THÍCH: Card hiển thị thông tin sản phẩm
 */

import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SPACING } from '../constants';
import { Product } from '../types';
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
      <View className="flex-row items-center my-xs">
        <Text className="mr-xs">{'⭐'.repeat(Math.floor(rating))}</Text>
        <Text className="text-xs text-text-light">({product.reviews})</Text>
      </View>
    );
  };

  if (variant === 'list') {
    // List view variant
    return (
      <TouchableOpacity
        className="flex-row px-lg py-md border-b border-border items-center relative"
        onPress={onPress}
        activeOpacity={0.7}
      >
        {/* Hình ảnh */}
        <Image
          source={{ uri: product.image }}
          style={{ width: imageWidth, height: imageHeight }}
          className="rounded-md bg-background-dark"
        />

        {/* Thông tin */}
        <View className="flex-1 ml-md">
          <Text className="text-md font-semibold text-text mb-xs" numberOfLines={2}>
            {product.name}
          </Text>

          {renderStars(product.rating)}

          <View className="flex-row items-center my-md">
            <Text className="text-md font-bold text-primary">
              {discountedPrice.toLocaleString('vi-VN')}đ
            </Text>
            {product.originalPrice && (
              <Text className="text-sm text-text-light line-through ml-sm">
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="absolute top-md right-lg p-sm"
            onPress={onToggleFavorite}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text className="text-lg">{product.isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  // Grid view variant (mặc định)
  return (
    <TouchableOpacity
      className="flex-[0.5] mx-sm my-md rounded-lg overflow-hidden bg-background"
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Container hình ảnh */}
      <View className="relative w-full aspect-square">
        {/* Hình ảnh */}
        <Image
          source={{ uri: product.image }}
          style={{ width: imageWidth, height: imageHeight }}
          className="w-full h-full bg-background-dark"
        />

        {/* Badges (discount, new, sale) */}
        {product.discount ? (
          <View className="absolute top-sm left-sm bg-error px-sm py-xs rounded-sm">
            <Text className="text-text-inverse text-xs font-bold">-{product.discount}%</Text>
          </View>
        ) : null}

        {product.isNew && (
          <View className="absolute top-sm right-sm px-sm py-xs rounded-sm bg-primary">
            <Text className="text-text-inverse text-xs font-bold">Mới</Text>
          </View>
        )}

        {product.isFlashSale && (
          <View className="absolute top-sm right-sm mt-[24px] px-sm py-xs rounded-sm bg-warning">
            <Text className="text-text-inverse text-xs font-bold">⚡</Text>
          </View>
        )}

        {/* Favorite button */}
        <TouchableOpacity
          className="absolute bottom-md right-md w-9 h-9 rounded-full bg-background justify-center items-center"
          onPress={onToggleFavorite}
        >
          <Text className="text-lg">
            {product.isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Thông tin sản phẩm */}
      <View className="p-md">
        <Text className="text-sm font-semibold text-text mb-xs" numberOfLines={2}>
          {product.name}
        </Text>

        {/* Đánh giá */}
        {renderStars(product.rating)}

        {/* Giá */}
        <View className="flex-row items-center my-md">
          <Text className="text-md font-bold text-primary">
            {discountedPrice.toLocaleString('vi-VN')}đ
          </Text>
          {product.originalPrice && (
            <Text className="text-sm text-text-light line-through ml-sm">
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
          className="mt-sm"
        />
      </View>
    </TouchableOpacity>
  );
};
export default ProductCard;
