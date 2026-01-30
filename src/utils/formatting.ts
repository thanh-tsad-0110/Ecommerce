/**
 * FILE: utils/formatting.ts
 * GIẢI THÍCH: Các hàm định dạng dữ liệu (format price, date, v.v.)
 */

/**
 * formatPrice: Định dạng giá thành tiền tệ
 * 
 * Ví dụ:
 * formatPrice(1234567) => "1.234.567đ"
 * formatPrice(100000) => "100.000đ"
 */
export const formatPrice = (price: number | undefined): string => {
  if (!price) return '0đ';
  return `${price.toLocaleString('vi-VN')}đ`;
};

/**
 * formatDate: Định dạng ngày tháng
 * 
 * Ví dụ:
 * formatDate('2026-01-23') => "23/01/2026"
 */
export const formatDate = (date: string | Date, format: string = 'dd/MM/yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return format
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year.toString());
};

/**
 * formatDateTime: Định dạng ngày giờ
 */
export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * formatPhoneNumber: Định dạng số điện thoại
 * 
 * Ví dụ:
 * formatPhoneNumber('0912345678') => "0912 345 678"
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';

  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }

  return phone;
};

/**
 * formatCardNumber: Định dạng số thẻ
 * 
 * Ví dụ:
 * formatCardNumber('1234567890123456') => "**** **** **** 3456"
 */
export const formatCardNumber = (cardNumber: string): string => {
  if (!cardNumber) return '';

  const cleaned = cardNumber.replace(/\D/g, '');
  const last4 = cleaned.slice(-4);

  return `**** **** **** ${last4}`;
};

/**
 * truncateText: Cắt ngắn text
 * 
 * Ví dụ:
 * truncateText('Hello World', 5) => "He..."
 */
export const truncateText = (text: string, length: number): string => {
  if (!text || text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};

/**
 * capitalizeFirstLetter: Viết hoa chữ cái đầu
 */
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * slugify: Chuyển thành URL-friendly string
 * 
 * Ví dụ:
 * slugify('Hello World') => "hello-world"
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * calculateDiscount: Tính giá sau giảm giá
 */
export const calculateDiscount = (
  originalPrice: number,
  discountPercent: number
): number => {
  return Math.floor(originalPrice * (1 - discountPercent / 100));
};

/**
 * calculateTax: Tính thuế
 */
export const calculateTax = (amount: number, taxPercent: number = 10): number => {
  return Math.floor(amount * (taxPercent / 100));
};

/**
 * pluralize: Thêm "s" cho từ số nhiều
 * 
 * Ví dụ:
 * pluralize('item', 5) => "items"
 * pluralize('item', 1) => "item"
 */
export const pluralize = (word: string, count: number): string => {
  return count === 1 ? word : `${word}s`;
};

/**
 * getInitials: Lấy các chữ cái đầu từ tên
 * 
 * Ví dụ:
 * getInitials('John Doe') => "JD"
 */
export const getInitials = (name: string): string => {
  if (!name) return '';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * formatSize: Định dạng kích cỡ file
 * 
 * Ví dụ:
 * formatSize(1024) => "1.0 KB"
 * formatSize(1048576) => "1.0 MB"
 */
export const formatSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

export default {
  formatPrice,
  formatDate,
  formatDateTime,
  formatPhoneNumber,
  formatCardNumber,
  truncateText,
  capitalizeFirstLetter,
  slugify,
  calculateDiscount,
  calculateTax,
  pluralize,
  getInitials,
  formatSize,
};
