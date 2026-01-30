/**
 * FILE: utils/validation.ts
 * GIẢI THÍCH:
 * - Các hàm kiểm tra (validate) dữ liệu từ user
 * - VD: kiểm tra email hợp lệ, password mạnh, số điện thoại, ...
 */

import { VALIDATION_RULES } from '../constants';

/**
 * validateEmail: Kiểm tra email hợp lệ
 * 
 * @param email - Email cần kiểm tra
 * @returns { isValid, error } - Valid và error message
 * 
 * Ví dụ:
 * validateEmail('test@example.com') // { isValid: true }
 * validateEmail('invalid-email')     // { isValid: false, error: '...' }
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email không được để trống' };
  }

  if (!VALIDATION_RULES.email.test(email)) {
    return { isValid: false, error: 'Email không hợp lệ' };
  }

  return { isValid: true };
};

/**
 * validatePassword: Kiểm tra mật khẩu
 */
export const validatePassword = (
  password: string
): { isValid: boolean; error?: string } => {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Mật khẩu không được để trống' };
  }

  if (password.length < VALIDATION_RULES.password.minLength) {
    return {
      isValid: false,
      error: `Mật khẩu phải ít nhất ${VALIDATION_RULES.password.minLength} ký tự`,
    };
  }

  return { isValid: true };
};

/**
 * validateName: Kiểm tra tên
 */
export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || name.trim() === '') {
    return { isValid: false, error: 'Tên không được để trống' };
  }

  if (
    name.length < VALIDATION_RULES.name.minLength ||
    name.length > VALIDATION_RULES.name.maxLength
  ) {
    return {
      isValid: false,
      error: `Tên phải từ ${VALIDATION_RULES.name.minLength} đến ${VALIDATION_RULES.name.maxLength} ký tự`,
    };
  }

  return { isValid: true };
};

/**
 * validatePhone: Kiểm tra số điện thoại
 */
export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Số điện thoại không được để trống' };
  }

  if (!VALIDATION_RULES.phone.test(phone)) {
    return { isValid: false, error: 'Số điện thoại không hợp lệ' };
  }

  return { isValid: true };
};

/**
 * validateCardNumber: Kiểm tra số thẻ
 */
export const validateCardNumber = (
  cardNumber: string
): { isValid: boolean; error?: string } => {
  const cleaned = cardNumber.replace(/\s/g, '');

  if (!cleaned || cleaned.length === 0) {
    return { isValid: false, error: 'Số thẻ không được để trống' };
  }

  if (!VALIDATION_RULES.cardNumber.test(cleaned)) {
    return { isValid: false, error: 'Số thẻ không hợp lệ' };
  }

  return { isValid: true };
};

/**
 * validateForm: Kiểm tra toàn bộ form
 */
export const validateForm = (data: Record<string, any>, rules: Record<string, (val: any) => any>) => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((key) => {
    const result = rules[key](data[key]);
    if (!result.isValid) {
      errors[key] = result.error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default {
  validateEmail,
  validatePassword,
  validateName,
  validatePhone,
  validateCardNumber,
  validateForm,
};
