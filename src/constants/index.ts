/**
 * FILE: constants/index.ts
 * GIẢI THÍCH:
 * - Chứa các giá trị không thay đổi được sử dụng trong app
 * - Các hằng số như màu sắc, kích thước, text, v.v.
 * - Tập trung lại 1 chỗ để dễ quản lý (thay vì lặp lại ở nhiều file)
 */

// ============================================================
// COLORS (Màu sắc)
// ============================================================
export const COLORS = {
  // Primary colors (Màu chính)
  primary: '#FF6B35',        // Màu cam (action, button)
  primaryLight: '#FFB399',   // Cam nhạt
  primaryDark: '#D64423',    // Cam đậm
  
  // Secondary colors (Màu phụ)
  secondary: '#004E89',      // Xanh đậm
  secondaryLight: '#1982C4', // Xanh nhạt
  
  // Backgrounds
  background: '#FFFFFF',     // Nền trắng
  backgroundDark: '#F5F5F5', // Nền xám nhạt
  backgroundDarker: '#EFEFEF', // Nền xám đậm
  
  // Text colors
  text: '#333333',           // Text chính
  textLight: '#666666',      // Text thứ cấp
  textLighter: '#999999',    // Text yếu hơn
  textInverse: '#FFFFFF',    // Text trên nền tối
  
  // Status colors
  success: '#4CAF50',        // Xanh lá (thành công)
  warning: '#FFC107',        // Vàng (cảnh báo)
  error: '#F44336',          // Đỏ (lỗi)
  info: '#2196F3',           // Xanh lam (thông tin)
  
  // Borders & Shadows
  border: '#E0E0E0',         // Đường viền
  shadow: '#000000',         // Bóng đổ (đen)
  
  // Special
  disabled: '#CCCCCC',       // Vô hiệu hóa
  transparent: 'transparent',
};

// ============================================================
// SPACING (Khoảng cách)
// ============================================================
/**
 * Quy ước:
 * - Tất cả margin, padding, gap đều dùng những giá trị này
 * - Giúp UI nhất quán
 */
export const SPACING = {
  xs: 4,      // Rất nhỏ
  sm: 8,      // Nhỏ
  md: 12,     // Trung bình
  lg: 16,     // Lớn
  xl: 20,     // Rất lớn
  xxl: 24,    // Siêu lớn
  xxxl: 32,   // Khổng lồ
};

// ============================================================
// FONT SIZES (Kích cỡ chữ)
// ============================================================
export const FONT_SIZES = {
  xs: 12,     // Rất nhỏ (subtitle, helper text)
  sm: 14,     // Nhỏ (body text)
  md: 16,     // Trung bình (default body)
  lg: 18,     // Lớn (subheading)
  xl: 20,     // Rất lớn (heading)
  xxl: 24,    // Siêu lớn (main heading)
  xxxl: 28,   // Khổng lồ (title)
};

// ============================================================
// FONT WEIGHTS (Độ đậm chữ)
// ============================================================
/**
 * Trong React Native:
 * - 'normal' = 400 (mặc định)
 * - 'bold' = 700
 */
export const FONT_WEIGHTS = {
  light: '300' as const,     // Mỏng
  normal: '400' as const,    // Bình thường
  medium: '500' as const,    // Trung bình
  semibold: '600' as const,  // Bán đậm
  bold: '700' as const,      // Đậm
  extrabold: '800' as const, // Cực đậm
};

// ============================================================
// BORDER RADIUS (Bo tròn góc)
// ============================================================
export const BORDER_RADIUS = {
  none: 0,       // Không bo
  xs: 4,         // Rất nhỏ
  sm: 8,         // Nhỏ
  md: 12,        // Trung bình
  lg: 16,        // Lớn
  xl: 20,        // Rất lớn
  full: 999,     // Tròn hoàn toàn (pill)
};

// ============================================================
// SHADOW (Bóng đổ)
// ============================================================
export const SHADOWS = {
  none: {
    elevation: 0,
  },
  sm: {
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  md: {
    elevation: 4,
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  lg: {
    elevation: 8,
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  xl: {
    elevation: 12,
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
};

// ============================================================
// SIZES (Kích cỡ component)
// ============================================================
export const SIZES = {
  // Button sizes
  buttonSmall: 36,
  buttonMedium: 44,
  buttonLarge: 52,
  
  // Icon sizes
  iconSmall: 16,
  iconMedium: 24,
  iconLarge: 32,
  iconXLarge: 48,
  
  // Avatar sizes
  avatarSmall: 32,
  avatarMedium: 48,
  avatarLarge: 64,
  
  // Card sizes
  minCardHeight: 100,
  maxCardHeight: 200,
};

// ============================================================
// DURATIONS (Thời gian animation)
// ============================================================
/**
 * Tất cả các animation sử dụng những giá trị này (milliseconds)
 */
export const DURATIONS = {
  fast: 100,     // Animation nhanh
  normal: 200,   // Animation bình thường
  slow: 300,     // Animation chậm
  slower: 500,   // Animation rất chậm
};

// ============================================================
// PAGINATION (Phân trang)
// ============================================================
export const PAGINATION = {
  defaultPageSize: 10,     // Số items mỗi trang
  maxPageSize: 50,         // Tối đa items mỗi trang
  initialPage: 1,          // Trang bắt đầu
};

// ============================================================
// API ENDPOINTS (URL API)
// ============================================================
/**
 * Cấu trúc tập trung API URLs
 * Thay vì viết URL ở nhiều file, tập trung ở đây
 */
export const API_ENDPOINTS = {
  // Products
  products: '/api/products',
  productDetail: (id: string) => `/api/products/${id}`,
  categories: '/api/categories',
  
  // Search
  search: '/api/search',
  
  // Orders
  orders: '/api/orders',
  orderDetail: (id: string) => `/api/orders/${id}`,
  orderHistory: '/api/orders/history',
  
  // Cart
  cart: '/api/cart',
  
  // Auth
  login: '/api/auth/login',
  register: '/api/auth/register',
  logout: '/api/auth/logout',
  
  // User
  userProfile: '/api/user/profile',
  userAddresses: '/api/user/addresses',
  userPayments: '/api/user/payments',
  
  // Promo
  validatePromo: '/api/promo/validate',
};

// ============================================================
// FILTER & SEARCH DEFAULTS (Mặc định cho lọc/tìm kiếm)
// ============================================================
export const FILTER_DEFAULTS = {
  priceRange: {
    min: 0,
    max: 10000,  // Giá tối đa
  },
  ratingMin: 0,
  sortBy: 'popularity' as const,
};

// ============================================================
// VALIDATION RULES (Quy tắc kiểm tra)
// ============================================================
/**
 * Các quy tắc để kiểm tra input từ user
 */
export const VALIDATION_RULES = {
  // Email validation regex
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Phone number (Vietnam)
  phone: /^[0-9]{10}$/,
  
  // Password requirements
  password: {
    minLength: 6,
    requiresUppercase: false,
    requiresNumber: false,
    requiresSpecialChar: false,
  },
  
  // Name
  name: {
    minLength: 2,
    maxLength: 50,
  },
  
  // Card number
  cardNumber: /^[0-9]{16}$/,
};

// ============================================================
// MOCK DATA KEYS (Khóa cho mock data)
// ============================================================
/**
 * Được dùng cho async storage, cache
 */
export const STORAGE_KEYS = {
  user: '@user_data',
  cart: '@cart_data',
  favorites: '@favorites_data',
  searchHistory: '@search_history',
  authToken: '@auth_token',
  userPreferences: '@user_preferences',
};

// ============================================================
// TAB NAMES (Tên các tab)
// ============================================================
export const TAB_NAMES = {
  home: 'Home',
  search: 'Search',
  cart: 'Cart',
  favorites: 'Favorites',
  profile: 'Profile',
};

// ============================================================
// ORDER STATUS LABELS (Nhãn trạng thái đơn hàng)
// ============================================================
/**
 * Hiển thị text cho user thay vì code
 */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipped: 'Đã gửi',
  delivered: 'Đã giao',
  cancelled: 'Hủy',
  returned: 'Trả hàng',
};

// ============================================================
// PAYMENT METHOD LABELS (Nhãn phương thức thanh toán)
// ============================================================
export const PAYMENT_LABELS: Record<string, string> = {
  credit_card: 'Thẻ tín dụng',
  debit_card: 'Thẻ ghi nợ',
  paypal: 'PayPal',
  cod: 'Thanh toán khi nhận hàng',
};

// ============================================================
// ERROR MESSAGES (Thông báo lỗi)
// ============================================================
/**
 * Các thông báo lỗi thường dùng
 */
export const ERROR_MESSAGES = {
  networkError: 'Không thể kết nối. Vui lòng kiểm tra kết nối internet.',
  genericError: 'Có lỗi xảy ra. Vui lòng thử lại.',
  validationError: 'Vui lòng kiểm tra lại thông tin.',
  unauthorized: 'Bạn cần đăng nhập để tiếp tục.',
  notFound: 'Không tìm thấy tài nguyên.',
  serverError: 'Lỗi máy chủ. Vui lòng thử lại sau.',
};

// ============================================================
// SUCCESS MESSAGES (Thông báo thành công)
// ============================================================
export const SUCCESS_MESSAGES = {
  addedToCart: 'Đã thêm vào giỏ hàng',
  addedToFavorites: 'Đã thêm vào danh sách yêu thích',
  removedFromFavorites: 'Đã xóa khỏi danh sách yêu thích',
  orderPlaced: 'Đơn hàng đã được tạo thành công',
  profileUpdated: 'Cập nhật hồ sơ thành công',
  loggedOut: 'Đã đăng xuất',
};

// ============================================================
// EMPTY STATE MESSAGES (Thông báo trạng thái trống)
// ============================================================
export const EMPTY_MESSAGES = {
  noProducts: 'Không có sản phẩm nào',
  noCart: 'Giỏ hàng của bạn trống',
  noFavorites: 'Bạn chưa thêm sản phẩm yêu thích',
  noOrders: 'Bạn chưa có đơn hàng nào',
  noResults: 'Không tìm thấy kết quả',
  noSearchHistory: 'Không có lịch sử tìm kiếm',
};

// ============================================================
// FILTER OPTIONS (Tùy chọn lọc)
// ============================================================
export const FILTER_OPTIONS = {
  categories: [
    { id: '1', name: 'Điện thoại', icon: 'phone' },
    { id: '2', name: 'Laptop', icon: 'laptop' },
    { id: '3', name: 'Tablet', icon: 'tablet' },
    { id: '4', name: 'Phụ kiện', icon: 'shopping-bag' },
    { id: '5', name: 'Âm thanh', icon: 'headphones' },
  ],
  
  brands: [
    'Apple',
    'Samsung',
    'Google',
    'OnePlus',
    'Xiaomi',
    'Sony',
    'LG',
  ],
  
  priceRanges: [
    { label: 'Dưới 5 triệu', min: 0, max: 5000000 },
    { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
    { label: '10 - 20 triệu', min: 10000000, max: 20000000 },
    { label: 'Trên 20 triệu', min: 20000000, max: 999999999 },
  ],
  
  ratings: [
    { label: '5 ⭐', value: 5 },
    { label: '4+ ⭐', value: 4 },
    { label: '3+ ⭐', value: 3 },
    { label: '2+ ⭐', value: 2 },
    { label: '1+ ⭐', value: 1 },
  ],
};

// ============================================================
// APP CONFIG (Cấu hình ứng dụng)
// ============================================================
export const APP_CONFIG = {
  name: 'ECommerce',
  version: '1.0.0',
  bundleId: 'com.ecommerce.app',
  apiBaseUrl: 'https://api.example.com', // Thay đổi thành URL thực
  apiTimeout: 30000, // 30 giây
  retryAttempts: 3,
  retryDelay: 1000, // milliseconds
};

// ============================================================
// SHIPPING OPTIONS (Tuỳ chọn vận chuyển)
// ============================================================
export const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    name: 'Giao hàng tiêu chuẩn',
    cost: 30000,
    estimatedDays: 3,
    description: 'Giao hàng trong 3-5 ngày',
  },
  {
    id: 'express',
    name: 'Giao hàng nhanh',
    cost: 50000,
    estimatedDays: 1,
    description: 'Giao hàng trong 1-2 ngày',
  },
  {
    id: 'overnight',
    name: 'Giao hàng qua đêm',
    cost: 100000,
    estimatedDays: 0,
    description: 'Giao hàng cùng ngày',
  },
];

// ============================================================
// REGEX PATTERNS (Mẫu regex kiểm tra)
// ============================================================
export const REGEX_PATTERNS = {
  url: /^https?:\/\/.+/,
  imageUrl: /\.(jpg|jpeg|png|gif|webp)$/i,
  phoneNumber: /^(\+84|0)[0-9]{9}$/,
  zipCode: /^[0-9]{5,6}$/,
};

// ============================================================
// TEST ACCOUNTS (Tài khoản test - chỉ dùng khi phát triển)
// ============================================================
export const TEST_ACCOUNTS = {
  user: {
    email: 'user@example.com',
    password: 'password123',
  },
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
  },
};
