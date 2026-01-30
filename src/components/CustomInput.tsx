/**
 * FILE: components/CustomInput.tsx
 * GIẢI THÍCH: Custom input component với label, error, helper text
 */

import React, { useMemo, useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants';
import { InputProps } from '../types';

/**
 * CustomInput: Text input tùy biến
 * 
 * Features:
 * - Label trên input
 * - Error message hiển thị lỗi kiểm tra
 * - Helper text gợi ý
 * - Focus border color thay đổi
 * - Icon trái hoặc phải
 * 
 * Ví dụ:
 * <CustomInput
 *   label="Email"
 *   placeholder="example@email.com"
 *   value={email}
 *   onChangeText={setEmail}
 *   error={emailError}
 *   helperText="Vui lòng nhập email hợp lệ"
 * />
 */
const CustomInput: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  helperText,
  icon,
  disabled = false,
  secureTextEntry = false,
  style,
}: InputProps) => {
  // Track trạng thái focus để thay đổi border color
  const [isFocused, setIsFocused] = useState(false);

  // Xác định border color
  const getBorderColor = (): string => {
    if (error) {
      return COLORS.error;
    }
    if (isFocused) {
      return COLORS.primary;
    }
    return COLORS.border;
  };

  // Xác định background color
  const getBackgroundColor = (): string => {
    if (disabled) {
      return COLORS.backgroundDark;
    }
    return COLORS.background;
  };

  const inputContainerStyle = useMemo(
    () => [
      styles.inputContainer,
      {
        borderColor: getBorderColor(),
        backgroundColor: getBackgroundColor(),
        borderWidth: isFocused ? 2 : 1,
      },
    ],
    [disabled, error, isFocused],
  );

  const inputStyle = useMemo(
    () => [
      styles.input,
      {
        flex: 1,
        color: disabled ? COLORS.textLight : COLORS.text,
      },
    ],
    [disabled],
  );

  return (
    <View style={[styles.container, style]}>
      {/* Label */}
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}

      {/* Input container */}
      <View
        style={inputContainerStyle}
      >
        {/* Icon trái */}
        {icon && <View style={styles.leftIcon}>{icon}</View>}

        {/* TextInput */}
        <TextInput
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLighter}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
        />
      </View>

      {/* Error message */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold as any,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 44,
  },
  input: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  leftIcon: {
    marginRight: SPACING.md,
  },
  errorText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.normal as any,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  helperText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.normal as any,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
});

export default CustomInput;
