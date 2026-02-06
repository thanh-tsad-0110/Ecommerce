import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomButton from '../components/CustomButton';
import { useCart } from '../state/CartContext';
import { useFavorites } from '../state/FavoritesContext';
import { formatPrice } from '../utils/formatting';
import { findProductById } from '../constants/mockData';
import { RootStackParamList, CartItem, Product } from '../types';
import { COLORS } from '../constants';

type ProductDetailProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC<ProductDetailProps> = ({ route }) => {
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
      'Pin: 36 giờ',
      'Sạc nhanh USB‑C',
    ],
    p7: [
      'Chip: Apple H2',
      'ANC + Transparency + Adaptive Audio',
      'Pin: 6h (30h với case)',
      'Sạc: USB‑C, MagSafe',
      'Tìm kiếm qua Find My',
    ],
    p8: [
      'ANC thế hệ 5',
      'Driver 30mm Carbon',
      'Pin: 30 giờ (ANC)',
      'Kết nối: Multipoint, LDAC',
    ],
    p9: [
      'Cảm biến Darkfield 8K',
      'Cuộn Magspeed 1.000 dòng/giây',
      'Kết nối: Bolt / Bluetooth',
      'Pin: 70 ngày, sạc USB‑C',
      'Tương thích: 3 thiết bị',
    ],
    p10: [
      'Màn OLED 7"',
      'Chế độ Dock/Handheld',
      'Pin 8h, sạc nhanh 45W',
    ],
    default: ['Đang cập nhật thông số.'],
  };

  const specs = specsMap[product.id] || specsMap.default;

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
    Alert.alert('Giỏ hàng', `✓ Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => q + 1);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View className="relative w-full h-[320px] bg-background-dark rounded-lg mb-lg overflow-hidden">
          <Image
            source={{ uri: product.images[selectedImage] || product.image }}
            className="w-full h-full"
            resizeMode="contain"
          />
          <TouchableOpacity
            className="absolute top-lg right-lg w-12 h-12 rounded-full bg-background items-center justify-center shadow-md"
            onPress={handleToggleFavorite}
          >
            <Text className="text-2xl">{isFavorite(product.id) ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={product.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: string, idx: number) => `${item}-${idx}`}
          contentContainerStyle={styles.thumbList}
          renderItem={({ item, index }: { item: string; index: number }) => (
            <TouchableOpacity
              style={[styles.thumb, selectedImage === index && styles.thumbActive]}
              onPress={() => setSelectedImage(index)}
            >
              <Image source={{ uri: item }} style={styles.thumbImage} resizeMode="contain" />
            </TouchableOpacity>
          )}
        />

        <View className="mt-lg">
          <Text className="text-sm text-text-light mb-xs">{product.brand || 'Thương hiệu'}</Text>
          <Text className="text-xl font-bold text-text mb-sm">{product.name}</Text>

          <View className="flex-row items-center mb-md">
            <Text className="text-md font-semibold">⭐ {product.rating}</Text>
            <Text className="text-sm text-text-light ml-sm">({product.reviews} đánh giá)</Text>
          </View>

          <View className="flex-row items-center mb-md gap-md">
            <Text className="text-2xl font-bold text-primary">{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <Text className="text-md text-text-light line-through">
                {formatPrice(product.originalPrice)}
              </Text>
            )}
            {product.discount ? (
              <View className="bg-error px-md py-xs rounded-sm">
                <Text className="text-text-inverse font-bold">-{product.discount}%</Text>
              </View>
            ) : null}
          </View>

          <Text className="text-md text-text mb-lg leading-5">{product.description}</Text>

          <View className="mb-lg">
            <Text className="text-lg font-semibold text-text mb-sm">Thông số kỹ thuật</Text>
            <View className="bg-background-dark rounded-lg p-md">
              {specs.map((spec, idx) => (
                <Text key={idx} className="text-md text-text mb-xs">
                  • {spec}
                </Text>
              ))}
            </View>
          </View>

          <View className="flex-row items-center justify-between mb-md">
            <Text className="text-md font-semibold text-text">Số lượng:</Text>
            <View className="flex-row items-center gap-md">
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-background-dark items-center justify-center"
                onPress={decrease}
              >
                <Text className="text-lg text-primary font-bold">−</Text>
              </TouchableOpacity>
              <Text className="text-md font-semibold text-text">{quantity}</Text>
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-background-dark items-center justify-center"
                onPress={increase}
              >
                <Text className="text-lg text-primary font-bold">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row gap-md mt-md">
            <CustomButton title="Thêm vào giỏ" onPress={handleAddToCart} className="flex-1" />
            <CustomButton
              title={isFavorite(product.id) ? 'Bỏ yêu thích' : 'Yêu thích'}
              onPress={handleToggleFavorite}
              variant="secondary"
              className="flex-1"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  thumbList: {
    paddingVertical: 12,
  },
  thumb: {
    width: 70,
    height: 70,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbActive: {
    borderColor: '#FF6B35',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
});

export default ProductDetailScreen;
