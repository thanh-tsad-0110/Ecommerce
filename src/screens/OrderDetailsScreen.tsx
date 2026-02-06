/**
 * FILE: screens/OrderDetailsScreen.tsx
 */

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
} from '../constants';
import { RootStackParamList } from '../types';
import { useTheme } from '../state/ThemeContext';
import { formatPrice } from '../utils/formatting';
import CustomButton from '../components/CustomButton';

type OrderDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderDetails'
>;

const OrderDetailsScreen: React.FC<OrderDetailsProps> = ({
  route,
  navigation,
}) => {
  const { orderId } = route.params;
  const { colors } = useTheme();

  // Mock order detail
  const order = {
    id: orderId,
    orderNumber: 'ORD-2026-001',
    date: '2026-01-20',
    status: 'Đã giao',
    items: [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        quantity: 1,
        price: 29990000,
      },
    ],
    subtotal: 29990000,
    shipping: 50000,
    tax: 3000000,
    discount: 1500000,
    total: 31540000,
    shippingAddress: {
      name: 'Nguyễn Văn A',
      phone: '0912345678',
      address: '123 Đường ABC, Quận 1, TP.HCM',
    },
    paymentMethod: 'Thanh toán khi nhận hàng',
    trackingNumber: 'TRK12345678',
    estimatedDelivery: '2026-01-22',
  };

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.status}>✓ {order.status}</Text>
        </View>

        {/* TRACKING */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theo dõi đơn hàng</Text>

          <View style={styles.trackingStep}>
            <Text style={styles.trackingIcon}>✓</Text>
            <Text style={styles.trackingLabel}>Đã đặt hàng</Text>
          </View>

          <View style={styles.trackingStep}>
            <Text style={styles.trackingIcon}>✓</Text>
            <Text style={styles.trackingLabel}>Đã gửi</Text>
          </View>

          <View style={styles.trackingStep}>
            <Text style={styles.trackingIcon}>✓</Text>
            <Text style={styles.trackingLabel}>Đã giao</Text>
          </View>

          <Text style={styles.trackingNumber}>
            Mã vận chuyển: {order.trackingNumber}
          </Text>
        </View>

        {/* ITEMS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản phẩm</Text>
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>
                  Số lượng: {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemPrice}>
                {formatPrice(item.price)}
              </Text>
            </View>
          ))}
        </View>

        {/* SUMMARY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tóm tắt</Text>

          <View style={styles.summaryRow}>
            <Text style={{ color: colors.text }}>Tiền hàng</Text>
            <Text style={{ color: colors.text }}>{formatPrice(order.subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={{ color: colors.text }}>Vận chuyển</Text>
            <Text style={{ color: colors.text }}>{formatPrice(order.shipping)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={{ color: colors.text }}>Thuế</Text>
            <Text style={{ color: colors.text }}>{formatPrice(order.tax)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={{ color: colors.text }}>Giảm giá</Text>
            <Text style={{ color: colors.success }}>-{formatPrice(order.discount)}</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng</Text>
            <Text style={styles.totalValue}>
              {formatPrice(order.total)}
            </Text>
          </View>
        </View>

        {/* SHIPPING ADDRESS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Địa chỉ giao hàng</Text>
          <View style={styles.addressBox}>
            <Text style={styles.addressName}>
              {order.shippingAddress.name}
            </Text>
            <Text style={styles.addressPhone}>
              {order.shippingAddress.phone}
            </Text>
            <Text style={styles.addressText}>
              {order.shippingAddress.address}
            </Text>
          </View>
        </View>

        {/* PAYMENT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thanh toán</Text>
          <Text style={{ color: colors.text }}>{order.paymentMethod}</Text>
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Quay lại"
            variant="outline"
            size="large"
            onPress={() => navigation.goBack()}
          />
          <CustomButton
            title="Liên hệ hỗ trợ"
            variant="primary"
            size="large"
            onPress={() => Alert.alert('Liên hệ hỗ trợ', 'Vui lòng liên hệ bộ phận CSKH')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  orderNumber: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.text,
  },
  status: {
    marginTop: SPACING.sm,
    color: colors.success,
  },
  section: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    marginBottom: SPACING.md,
    color: colors.text,
  },
  trackingStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  trackingIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.success,
    color: colors.textInverse,
    textAlign: 'center',
    lineHeight: 28,
    marginRight: SPACING.md,
  },
  trackingLabel: {
    fontSize: FONT_SIZES.md,
    color: colors.text,
  },
  trackingNumber: {
    marginTop: SPACING.sm,
    fontSize: FONT_SIZES.sm,
    color: colors.textLight,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  itemName: {
    fontWeight: FONT_WEIGHTS.semibold,
    color: colors.text,
  },
  itemQty: {
    fontSize: FONT_SIZES.sm,
    color: colors.textLight,
  },
  itemPrice: {
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  totalRow: {
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: SPACING.md,
  },
  totalLabel: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.text,
  },
  totalValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.primary,
  },
  addressBox: {
    backgroundColor: colors.backgroundDark,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  addressName: {
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.text,
  },
  addressPhone: {
    color: colors.textLight,
  },
  addressText: {
    marginTop: SPACING.xs,
    color: colors.text,
  },
  buttonsContainer: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
});

export default OrderDetailsScreen;
