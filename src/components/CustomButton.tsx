/**
 * FILE: components/CustomButton.tsx
 * GIẢI THÍCH:
 * - Custom button component dùng ở nhiều chỗ
 * - Hỗ trợ nhiều variant (primary, secondary, outline)
 * - Hỗ trợ kích cỡ khác nhau (small, medium, large)
 * - Có state loading, disabled
 */

import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants';
import { ButtonProps } from '../types';

/**
 * CustomButton: Component nút bấm tùy biến
 * 
 * Props:
 * - title: Text hiển thị trên nút
 * - onPress: Callback khi bấm
 * - variant: Kiểu nút (primary/secondary/outline)
 * - size: Kích cỡ (small/medium/large)
 * - loading: Đang tải (hiển thị spinner)
 * - disabled: Bị vô hiệu hóa
 * - icon: Icon (nếu có)
 * 
 * Ví dụ:
 * <CustomButton
 *   title="Thêm vào giỏ"
 *   onPress={() => handleAddCart()}
 *   variant="primary"
 *   size="large"
 * />
 */
const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  style,
}: ButtonProps) => {
  // Sử dụng state để track press animation
  const [isPressed, setIsPressed] = useState(false);

  // Lấy style dựa trên variant
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? COLORS.disabled : COLORS.primary,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? COLORS.disabled : COLORS.secondary,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? COLORS.disabled : COLORS.primary,
        };
      default:
        return {};
    }
  };

  // Lấy style dựa trên size
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: SPACING.sm,
          paddingHorizontal: SPACING.md,
          minHeight: 32,
        };
      case 'large':
        return {
          paddingVertical: SPACING.lg,
          paddingHorizontal: SPACING.xl,
          minHeight: 52,
        };
      case 'medium':
      default:
        return {
          paddingVertical: SPACING.md,
          paddingHorizontal: SPACING.lg,
          minHeight: 44,
        };
    }
  };

  // Lấy style chữ dựa trên size
  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return {
          fontSize: FONT_SIZES.sm,
        };
      case 'large':
        return {
          fontSize: FONT_SIZES.lg,
        };
      case 'medium':
      default:
        return {
          fontSize: FONT_SIZES.md,
        };
    }
  };

  // Xác định màu text
  const getTextColor = (): string => {
    if (disabled) {
      return COLORS.textLight;
    }
    return variant === 'outline' ? COLORS.primary : COLORS.textInverse;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (!disabled && !loading) {
          setIsPressed(true);
          setTimeout(() => setIsPressed(false), 150);
          onPress();
        }
      }}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.button,
          getVariantStyle(),
          getSizeStyle(),
          {
            opacity: isPressed ? 0.8 : 1,
          },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} size="small" />
        ) : (
          <>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text
              style={[
                styles.text,
                getTextSizeStyle(),
                {
                  color: getTextColor(),
                },
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: FONT_WEIGHTS.semibold as any,
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: SPACING.sm,
  },
});

export default CustomButton;
