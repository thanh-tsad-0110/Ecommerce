/**
 * FILE: components/CustomButton.tsx
 * GIẢI THÍCH:
 * - Custom button component dùng ở nhiều chỗ
 * - Hỗ trợ nhiều variant (primary, secondary, outline)
 * - Hỗ trợ kích cỡ khác nhau (small, medium, large)
 * - Có state loading, disabled
 */

import React, { useMemo, useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View, StyleSheet } from 'react-native';
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
  className,
}: ButtonProps) => {
  // Sử dụng state để track press animation
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = 'flex-row items-center justify-center rounded-md';

  const baseStyle = styles.base;

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'small':
        return 'py-sm px-md min-h-[32px]';
      case 'large':
        return 'py-lg px-xl min-h-[52px]';
      case 'medium':
      default:
        return 'py-md px-lg min-h-[44px]';
    }
  }, [size]);

  const variantClasses = useMemo(() => {
    if (disabled) {
      return 'bg-disabled border-disabled';
    }
    switch (variant) {
      case 'secondary':
        return 'bg-secondary';
      case 'outline':
        return 'bg-transparent border-2 border-primary';
      case 'primary':
      default:
        return 'bg-primary';
    }
  }, [variant, disabled]);

  const textColorClass = useMemo(() => {
    if (disabled) return 'text-text-light';
    return variant === 'outline' ? 'text-primary' : 'text-text-inverse';
  }, [variant, disabled]);

  const sizeStyle = useMemo(() => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 12, minHeight: 32, borderRadius: 999 };
      case 'large':
        return { paddingVertical: 14, paddingHorizontal: 20, minHeight: 52, borderRadius: 999 };
      case 'medium':
      default:
        return { paddingVertical: 12, paddingHorizontal: 16, minHeight: 44, borderRadius: 999 };
    }
  }, [size]);

  const variantStyle = useMemo(() => {
    if (disabled) {
      return { backgroundColor: '#CCCCCC', borderColor: '#CCCCCC', borderWidth: 1 };
    }
    switch (variant) {
      case 'secondary':
        return { backgroundColor: '#004E89', borderColor: '#004E89', borderWidth: 1 };
      case 'outline':
        return { backgroundColor: 'transparent', borderColor: '#FF6B35', borderWidth: 2 };
      case 'primary':
      default:
        return { backgroundColor: '#FF6B35', borderColor: '#FF6B35', borderWidth: 1 };
    }
  }, [variant, disabled]);

  const textStyle = useMemo(() => {
    if (disabled) return { color: '#888888' };
    return variant === 'outline' ? { color: '#FF6B35' } : { color: '#FFFFFF' };
  }, [variant, disabled]);

  const textSizeClass = useMemo(() => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      case 'medium':
      default:
        return 'text-md';
    }
  }, [size]);

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
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className || ''}`}
      style={[baseStyle, sizeStyle, variantStyle, { opacity: isPressed ? 0.8 : 1 }, style]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#FF6B35' : '#FFFFFF'} size="small" />
      ) : (
        <>
          {icon && <View className="mr-sm">{icon}</View>}
          <Text
            className={`font-semibold text-center ${textSizeClass} ${textColorClass}`}
            style={textStyle}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
