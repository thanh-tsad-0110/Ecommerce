/**
 * FILE: screens/CheckoutScreen.tsx
 * GIẢI THÍCH: Màn hình thanh toán với multi-step form
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants';
import { RootStackParamList } from '../types';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useCart } from '../state/CartContext';
import { useUser } from '../state/UserContext';
import { formatPrice } from '../utils/formatting';

type CheckoutProps = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

const CheckoutScreen: React.FC<CheckoutProps> = ({ navigation }) => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [isProcessing, setIsProcessing] = useState(false);

  // STEP 1: ADDRESS
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  // STEP 2: PAYMENT
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [cardNumber, setCardNumber] = useState('');

  const handleStepOne = () => {
    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
    setStep(2);
  };

  const handleStepTwo = () => {
    if (paymentMethod === 'card' && !cardNumber.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập số thẻ');
      return;
    }
    setStep(3);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert(
        'Thành công',
        'Đơn hàng của bạn đã được tạo!\\nSố đơn hàng: ORD-2026-001',
        [
          {
            text: 'OK',
            onPress: () => {
              clearCart();
              navigation.navigate('OrderHistory');
            },
          },
        ]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // ============================================================
  // STEP INDICATOR
  // ============================================================

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((s) => (
        <View key={s} style={styles.stepItem}>
          <View
            style={[
              styles.stepNumber,
              step >= s && styles.stepNumberActive,
            ]}
          >
            <Text
              style={[
                styles.stepText,
                step >= s && styles.stepTextActive,
              ]}
            >
              {s}
            </Text>
          </View>
          <Text style={styles.stepLabel}>
            {s === 1 ? 'Địa chỉ' : s === 2 ? 'Thanh toán' : 'Xác nhận'}
          </Text>
        </View>
      ))}
    </View>
  );

  // ============================================================
  // STEP 1: ADDRESS
  // ============================================================

  const renderAddressStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Thông tin giao hàng</Text>

      <CustomInput
        label="Tên người nhận"
        placeholder="Nhập tên đầy đủ"
        value={fullName}
        onChangeText={setFullName}
      />

      <CustomInput
        label="Số điện thoại"
        placeholder="0912345678"
        value={phone}
        onChangeText={setPhone}
      />

      <CustomInput
        label="Địa chỉ"
        placeholder="Nhập địa chỉ giao hàng"
        value={address}
        onChangeText={setAddress}
      />

      <CustomInput
        label="Thành phố"
        placeholder="VD: Hà Nội, TP.HCM"
        value={city}
        onChangeText={setCity}
      />
    </View>
  );

  // ============================================================
  // STEP 2: PAYMENT
  // ============================================================

  const renderPaymentStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Phương thức thanh toán</Text>

      {/* COD */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          paymentMethod === 'cod' && styles.paymentOptionActive,
        ]}
        onPress={() => setPaymentMethod('cod')}
      >
        <View style={styles.paymentRadio}>
          {paymentMethod === 'cod' && (
            <View style={styles.paymentRadioSelected} />
          )}
        </View>
        <Text style={styles.paymentText}>Thanh toán khi nhận hàng (COD)</Text>
      </TouchableOpacity>

      {/* CARD */}
      <TouchableOpacity
        style={[
          styles.paymentOption,
          paymentMethod === 'card' && styles.paymentOptionActive,
        ]}
        onPress={() => setPaymentMethod('card')}
      >
        <View style={styles.paymentRadio}>
          {paymentMethod === 'card' && (
            <View style={styles.paymentRadioSelected} />
          )}
        </View>
        <Text style={styles.paymentText}>Thẻ credit/debit</Text>
      </TouchableOpacity>

      {/* CARD INPUT */}
      {paymentMethod === 'card' && (
        <CustomInput
          label="Số thẻ"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      )}
    </View>
  );

  // ============================================================
  // STEP 3: REVIEW
  // ============================================================

  const renderReviewStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Xác nhận đơn hàng</Text>

      {/* DELIVERY ADDRESS */}
      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>📍 Địa chỉ giao hàng</Text>
        <Text style={styles.reviewText}>{fullName}</Text>
        <Text style={styles.reviewText}>{phone}</Text>
        <Text style={styles.reviewText}>{address}, {city}</Text>
      </View>

      {/* PAYMENT METHOD */}
      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>💳 Phương thức thanh toán</Text>
        <Text style={styles.reviewText}>
          {paymentMethod === 'cod'
            ? 'Thanh toán khi nhận hàng'
            : `Thẻ: ${cardNumber.slice(-4)}`}
        </Text>
      </View>

      {/* ORDER ITEMS */}
      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>📦 Sản phẩm ({items.length})</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.orderItemName}>{item.name}</Text>
            <Text style={styles.orderItemPrice}>
              {item.quantity}x {formatPrice(item.price)}
            </Text>
          </View>
        ))}
      </View>

      {/* TOTAL */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng tiền:</Text>
          <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
        </View>
      </View>
    </View>
  );

  // ============================================================
  // MAIN RENDER
  // ============================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* STEP INDICATOR */}
        {renderStepIndicator()}

        {/* STEP CONTENT */}
        {step === 1 && renderAddressStep()}
        {step === 2 && renderPaymentStep()}
        {step === 3 && renderReviewStep()}

        {/* BUTTONS */}
        <View style={styles.buttonsContainer}>
          {step > 1 && (
            <CustomButton
              title="Quay lại"
              onPress={() => setStep(step - 1)}
              variant="outline"
              size="large"
            />
          )}
          <CustomButton
            title={
              step === 3
                ? isProcessing
                  ? 'Đang xử lý...'
                  : 'Đặt hàng'
                : 'Tiếp tục'
            }
            onPress={
              step === 1
                ? handleStepOne
                : step === 2
                ? handleStepTwo
                : handlePlaceOrder
            }
            variant="primary"
            size="large"
            loading={isProcessing}
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
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  stepNumberActive: {
    backgroundColor: COLORS.primary,
  },
  stepText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  stepTextActive: {
    color: COLORS.textInverse,
  },
  stepLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  stepContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  stepTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
  },
  paymentOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight + '20',
  },
  paymentRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentRadioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  paymentText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  reviewSection: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: BORDER_RADIUS.md,
  },
  reviewSectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  reviewText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  orderItemName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  orderItemPrice: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.primary,
  },
  totalSection: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: BORDER_RADIUS.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  buttonsContainer: {
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
});

export default CheckoutScreen;
