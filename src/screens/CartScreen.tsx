/**
 * FILE: screens/CartScreen.tsx
 * GIẢI THÍCH:
 * - Màn hình giỏ hàng
 * - Hiển thị danh sách sản phẩm trong giỏ
 * - Cập nhật số lượng, xóa sản phẩm
 * - Tính toán tổng tiền
 * - Thêm mã khuyến mãi
 * - Chọn phương thức vận chuyển
 * - Nút checkout
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SHIPPING_OPTIONS } from '../constants';
import { RootStackParamList } from '../types';
import { useCart } from '../state/CartContext';
import CustomButton from '../components/CustomButton';
import { formatPrice } from '../utils/formatting';

type CartScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState('standard');

  // Tính phí shipping
  const shippingCost = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping)?.cost || 0;

  // Tính tổng
  const subtotal = totalPrice;
  const tax = Math.floor(subtotal * 0.1); // 10% tax
  const finalTotal = subtotal + shippingCost + tax - promoDiscount;

  const handleApplyPromo = () => {
    if (promoCode === 'SAVE50') {
      setPromoDiscount(subtotal * 0.5);
      alert('✓ Áp dụng mã \"SAVE50\" giảm 50% thành công!');
    } else if (promoCode === 'FREE10') {
      setPromoDiscount(100000);
      alert('✓ Áp dụng mã \"FREE10\" giảm 100.000đ thành công!');
    } else {
      alert('✗ Mã khuyến mãi không hợp lệ');
    }
    setPromoCode('');
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Vui lòng thêm sản phẩm vào giỏ hàng');
      return;
    }
    navigation.navigate('Checkout');
  };

  // ============================================================
  // EMPTY CART
  // ============================================================

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
          <Text style={styles.emptyText}>Bắt đầu thêm sản phẩm yêu thích vào giỏ hàng</Text>
          <CustomButton
            title="Tiếp tục mua sắm"
            onPress={() => navigation.navigate('Home')}
            variant="primary"
            size="large"
            style={{ marginTop: SPACING.lg }}
          />
        </View>
      </SafeAreaView>
    );
  }

  // ============================================================
  // CART ITEMS
  // ============================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* CART ITEMS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giỏ hàng ({items.length} sản phẩm)</Text>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                {/* Hình ảnh */}
                <Image
                  source={{ uri: item.image }}
                  style={styles.itemImage}
                />

                {/* Thông tin */}
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemPrice}>
                    {formatPrice(item.price)}
                  </Text>

                  {/* Quantity Selector */}
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Remove Button */}
                <TouchableOpacity
                  onPress={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeIcon}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* PROMO CODE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mã khuyến mãi</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Nhập mã khuyến mãi"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <CustomButton
              title="Áp dụng"
              onPress={handleApplyPromo}
              variant="secondary"
              size="small"
            />
          </View>
          <Text style={styles.promoHint}>💡 Hãy thử: SAVE50, FREE10</Text>
        </View>

        {/* SHIPPING OPTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chọn vận chuyển</Text>
          {SHIPPING_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.shippingOption,
                selectedShipping === option.id && styles.shippingOptionActive,
              ]}
              onPress={() => setSelectedShipping(option.id)}
            >
              <View style={styles.shippingRadio}>
                {selectedShipping === option.id && (
                  <View style={styles.shippingRadioSelected} />
                )}
              </View>
              <View style={styles.shippingInfo}>
                <Text style={styles.shippingName}>{option.name}</Text>
                <Text style={styles.shippingDesc}>{option.description}</Text>
              </View>
              <Text style={styles.shippingPrice}>{formatPrice(option.cost)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ORDER SUMMARY */}
        <View style={[styles.section, styles.summaryContainer]}>
          <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>

          {/* Items */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tiền hàng:</Text>
            <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
          </View>

          {/* Shipping */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Vận chuyển:</Text>
            <Text style={styles.summaryValue}>{formatPrice(shippingCost)}</Text>
          </View>

          {/* Tax */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Thuế:</Text>
            <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
          </View>

          {/* Discount */}
          {promoDiscount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, styles.discountLabel]}>
                Giảm giá:
              </Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>
                -{formatPrice(promoDiscount)}
              </Text>
            </View>
          )}

          {/* Total */}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng cộng:</Text>
            <Text style={styles.totalValue}>{formatPrice(finalTotal)}</Text>
          </View>
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Tiếp tục mua sắm"
            onPress={() => navigation.navigate('Home')}
            variant="outline"
            size="large"
            style={styles.button}
          />
          <CustomButton
            title="Tiến hành thanh toán"
            onPress={handleCheckout}
            variant="primary"
            size="large"
            style={styles.button}
          />
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
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },

  section: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },

  // CART ITEMS
  cartItem: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.md,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.backgroundDark,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  itemPrice: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
  quantity: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  removeButton: {
    padding: SPACING.sm,
  },
  removeIcon: {
    fontSize: 20,
  },

  // PROMO
  promoContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    height: 40,
  },
  promoHint: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
    marginTop: SPACING.sm,
  },

  // SHIPPING
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
  },
  shippingOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight + '20',
  },
  shippingRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shippingRadioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  shippingInfo: {
    flex: 1,
  },
  shippingName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  shippingDesc: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  shippingPrice: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },

  // SUMMARY
  summaryContainer: {
    backgroundColor: COLORS.backgroundDark,
    borderRadius: BORDER_RADIUS.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  summaryLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  summaryValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  discountLabel: {
    color: COLORS.success,
  },
  discountValue: {
    color: COLORS.success,
  },
  totalRow: {
    borderTopWidth: 2,
    borderTopColor: COLORS.border,
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
  },
  totalLabel: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  totalValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },

  // BUTTONS
  buttonsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
  },
  button: {
    marginVertical: SPACING.sm,
  },
});

export default CartScreen;
