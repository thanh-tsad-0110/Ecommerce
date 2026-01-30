/**
 * FILE: styles/theme.ts
 * GIẢI THÍCH:
 * - Định nghĩa theme (chủ đề) cho ứng dụng
 * - Kết hợp các colors, spacing, fonts từ constants
 * - Tạo ra các preset style được sử dụng chung
 */

import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../constants';

// ============================================================
// TYPOGRAPHY (Kiểu chữ)
// ============================================================
/**
 * Cấu trúc text dùng ở các vị trí khác nhau
 * Ví dụ:
 * - heading1: Tiêu đề lớn
 * - heading2: Tiêu đề phụ
 * - body: Text bình thường
 */
export const typography = StyleSheet.create({
  // Các heading (tiêu đề)
  heading1: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  
  heading2: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  
  heading3: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  
  heading4: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  
  // Body text (text bình thường)
  body: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.normal,
    color: COLORS.text,
    lineHeight: FONT_SIZES.md * 1.5, // Dòng cao gấp 1.5 lần font size
  },
  
  bodySmall: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.normal,
    color: COLORS.text,
    lineHeight: FONT_SIZES.sm * 1.5,
  },
  
  bodyXSmall: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.normal,
    color: COLORS.textLight,
    lineHeight: FONT_SIZES.xs * 1.5,
  },
  
  // Subtitles và captions
  subtitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textLight,
  },
  
  caption: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.normal,
    color: COLORS.textLighter,
  },
  
  // Button text
  buttonText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textInverse,
  },
  
  // Label (cho form)
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text,
  },
  
  // Error/helper text
  errorText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.normal,
    color: COLORS.error,
  },
  
  helperText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.normal,
    color: COLORS.textLight,
  },
});

// ============================================================
// COMMON STYLES (Styles chung)
// ============================================================
/**
 * Các style được tái sử dụng ở nhiều nơi
 */
export const commonStyles = StyleSheet.create({
  // Container/View
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  containerPadded: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // Row (hàng ngang)
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Column (cột dọc)
  column: {
    flexDirection: 'column',
  },
  
  columnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Center
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Flex
  flex1: {
    flex: 1,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  
  // Separator
  separator: {
    height: SPACING.md,
  },
});

// ============================================================
// BUTTON STYLES (Style cho nút bấm)
// ============================================================
export const buttonStyles = StyleSheet.create({
  // Primary button
  primary: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.md,
  },
  
  // Secondary button
  secondary: {
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.md,
  },
  
  // Outline button
  outline: {
    backgroundColor: COLORS.transparent,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  
  // Small button
  small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  
  // Large button
  large: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  
  // Disabled button
  disabled: {
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
});

// ============================================================
// INPUT STYLES (Style cho input field)
// ============================================================
export const inputStyles = StyleSheet.create({
  // Cơ bản
  base: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  
  // Focused (khi focus)
  focused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  
  // Error (khi có lỗi)
  error: {
    borderColor: COLORS.error,
    borderWidth: 1,
  },
  
  // Disabled
  disabled: {
    backgroundColor: COLORS.backgroundDark,
    color: COLORS.textLight,
  },
});

// ============================================================
// CARD STYLES (Style cho card)
// ============================================================
export const cardStyles = StyleSheet.create({
  // Card cơ bản
  base: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  
  // Card với bóng
  elevated: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.lg,
  },
  
  // Card nhỏ
  small: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  
  // Card có thể click
  pressable: {
    overflow: 'hidden',
  },
});

// ============================================================
// LIST STYLES (Style cho danh sách)
// ============================================================
export const listStyles = StyleSheet.create({
  // Item cơ bản
  item: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  
  // Item cuối cùng (không có border)
  itemLast: {
    borderBottomWidth: 0,
  },
  
  // List container
  container: {
    backgroundColor: COLORS.background,
  },
});

// ============================================================
// SPACING UTILITIES (Tiện ích khoảng cách)
// ============================================================
/**
 * Các class utility cho spacing
 * Dùng khi không muốn tạo style mới
 */
export const spacingUtils = {
  // Padding
  p: (size: keyof typeof SPACING) => ({
    padding: SPACING[size],
  }),
  
  px: (size: keyof typeof SPACING) => ({
    paddingHorizontal: SPACING[size],
  }),
  
  py: (size: keyof typeof SPACING) => ({
    paddingVertical: SPACING[size],
  }),
  
  // Margin
  m: (size: keyof typeof SPACING) => ({
    margin: SPACING[size],
  }),
  
  mx: (size: keyof typeof SPACING) => ({
    marginHorizontal: SPACING[size],
  }),
  
  my: (size: keyof typeof SPACING) => ({
    marginVertical: SPACING[size],
  }),
  
  // Gap (cho flexbox)
  gap: (size: keyof typeof SPACING) => ({
    gap: SPACING[size],
  }),
};

// ============================================================
// SHADOW UTILITIES (Tiện ích bóng đổ)
// ============================================================
export const shadowUtils = {
  small: SHADOWS.sm,
  medium: SHADOWS.md,
  large: SHADOWS.lg,
  extraLarge: SHADOWS.xl,
};

// ============================================================
// ELEVATION LEVELS (Mức độ nổi)
// ============================================================
/**
 * Trong Material Design, elevation định nghĩa "chiều cao" của element
 * Được hiển thị qua shadow
 */
export const elevationLevels = {
  none: 0,
  low: 2,
  medium: 4,
  high: 8,
  extraHigh: 12,
};

// ============================================================
// BORDER UTILITIES (Tiện ích viền)
// ============================================================
export const borderUtils = {
  thin: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  
  thick: {
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  
  primary: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  
  error: {
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  
  success: {
    borderWidth: 1,
    borderColor: COLORS.success,
  },
};

// ============================================================
// THEME OBJECT (Đối tượng theme chứa tất cả)
// ============================================================
/**
 * Tập trung tất cả style vào 1 object
 * Dễ dàng để pass vào context hoặc provider
 */
export const theme = {
  colors: COLORS,
  spacing: SPACING,
  fontSizes: FONT_SIZES,
  fontWeights: FONT_WEIGHTS,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  typography,
  commonStyles,
  buttonStyles,
  inputStyles,
  cardStyles,
  listStyles,
  spacingUtils,
  shadowUtils,
  elevationLevels,
  borderUtils,
};

export type Theme = typeof theme;
