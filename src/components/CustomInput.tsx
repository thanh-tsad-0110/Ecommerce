/**
 * FILE: components/CustomInput.tsx
 * GIẢI THÍCH: Custom input component với label, error, helper text
 */

import React, { useMemo, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';
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
  rightIcon,
  onRightIconPress,
  disabled = false,
  secureTextEntry = false,
  style,
  className,
  inputClassName,
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

  const borderClass = useMemo(() => {
    if (error) return 'border border-error';
    if (isFocused) return 'border-primary border-2';
    return 'border border-border';
  }, [error, isFocused]);

  const backgroundClass = disabled ? 'bg-background-dark' : 'bg-background';
  const textColorClass = disabled ? 'text-text-light' : 'text-text';
  const containerStyle = {
    borderColor: getBorderColor(),
    backgroundColor: getBackgroundColor(),
    borderWidth: error ? 1 : isFocused ? 1.5 : 1,
    height: 52,
    borderRadius: 999,
    paddingHorizontal: 14,
  };

  return (
    <View className={`my-sm ${className || ''}`} style={[styles.container, style]}>
      {/* Label */}
      {label && (
        <Text className="text-sm font-semibold text-text mb-xs">{label}</Text>
      )}

      {/* Input container */}
      <View
        className={`flex-row items-center rounded-full px-md h-[48px] ${borderClass} ${backgroundClass} ${inputClassName || ''}`}
        style={[styles.row, containerStyle]}
      >
        {/* Icon trái */}
        {icon && <View className="mr-md">{icon}</View>}

        {/* TextInput */}
        <TextInput
          className={`flex-1 text-md ${textColorClass}`}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLighter}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
        />

        {/* Icon phải (ví dụ: toggle password) */}
        {rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <View className="ml-md">{rightIcon}</View>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Error message */}
      {error && (
        <Text className="text-xs text-error mt-xs">{error}</Text>
      )}

      {/* Helper text */}
      {helperText && !error && (
        <Text className="text-xs text-text-light mt-xs">{helperText}</Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
});
