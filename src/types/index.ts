/**
 * FILE: types/index.ts
 * GIẢI THÍCH: 
 * - Đây là file định nghĩa kiểu dữ liệu (Types) cho toàn bộ ứng dụng
 * - Trong TypeScript, Types giúp kiểm soát loại dữ liệu và tránh lỗi
 * - Tất cả các object trong app đều tuân theo các type được định nghĩa ở đây
 */

// ============================================================
// PRODUCT TYPES (Các loại dữ liệu liên quan đến sản phẩm)
// ============================================================

/**
 * Product: Định nghĩa cấu trúc của một sản phẩm
 * 
 * Ví dụ:
 * {
 *   id: "1",
 *   name: "iPhone 15",
 *   price: 999,
 *   ...
 * }
 */
export interface Product {
  id: string;              // ID duy nhất của sản phẩm
  name: string;            // Tên sản phẩm
  description: string;     // Mô tả chi tiết
  price: number;           // Giá hiện tại
  originalPrice?: number;  // Giá gốc (dùng để tính discount)
  image: string;           // URL hình ảnh chính
  images: string[];        // Danh sách các hình ảnh
  category: string;        // Danh mục sản phẩm
  brand: string;           // Thương hiệu
  rating: number;          // Đánh giá từ 0-5
  reviews: number;         // Số lượng đánh giá
  stock: number;           // Số lượng hàng còn
  discount?: number;       // Phần trăm giảm giá
  isFavorite: boolean;     // Có phải yêu thích không
  isNew: boolean;          // Có phải sản phẩm mới không
  isFlashSale: boolean;    // Có phải flash sale không
}

/**
 * Category: Định nghĩa danh mục sản phẩm
 */
export interface Category {
  id: string;
  name: string;           // Tên danh mục (VD: "Điện thoại", "Laptop")
  icon: string;           // Icon hiển thị
  image?: string;         // Hình ảnh
}

// ============================================================
// CART TYPES (Giỏ hàng)
// ============================================================

/**
 * CartItem: Một sản phẩm trong giỏ hàng
 * 
 * Khác với Product ở chỗ:
 * - Có thêm trường quantity (số lượng)
 * - Có thể lưu variant đã chọn (màu, size, ...)
 */
export interface CartItem {
  id: string;              // ID của item trong giỏ (có thể khác với product id nếu có variant)
  productId: string;       // ID sản phẩm
  name: string;
  price: number;
  quantity: number;        // Số lượng mua
  image: string;
  variant?: {              // Các lựa chọn như màu, size
    color?: string;
    size?: string;
    storage?: string;
  };
}

// ============================================================
// ORDER TYPES (Đơn hàng)
// ============================================================

/**
 * Order: Định nghĩa cấu trúc của một đơn hàng
 */
export interface Order {
  id: string;              // ID đơn hàng
  orderNumber: string;     // Số đơn hàng hiển thị cho user (VD: "ORD-2026-001")
  userId: string;          // ID của user
  items: CartItem[];       // Danh sách sản phẩm trong đơn
  totalAmount: number;     // Tổng tiền
  subtotal: number;        // Tiền hàng (trước shipping, tax)
  shippingCost: number;    // Phí vận chuyển
  tax: number;             // Thuế
  discount: number;        // Tiền giảm giá
  promoCode?: string;      // Mã khuyến mãi được áp dụng
  status: OrderStatus;     // Trạng thái đơn hàng
  shippingAddress: Address; // Địa chỉ giao hàng
  paymentMethod: PaymentMethod; // Phương thức thanh toán
  createdAt: string;       // Ngày tạo (ISO format)
  estimatedDelivery?: string; // Ngày dự kiến giao
  trackingNumber?: string; // Mã tracking
}

/**
 * OrderStatus: Các trạng thái đơn hàng có thể có
 */
export type OrderStatus =
  | 'pending'        // Chờ xác nhận
  | 'confirmed'      // Đã xác nhận
  | 'processing'     // Đang xử lý
  | 'shipped'        // Đã gửi
  | 'delivered'      // Đã giao
  | 'cancelled'      // Hủy
  | 'returned';      // Trả hàng

// ============================================================
// ADDRESS TYPES (Địa chỉ)
// ============================================================

/**
 * Address: Định nghĩa cấu trúc địa chỉ
 */
export interface Address {
  id?: string;
  fullName: string;        // Tên người nhận
  phone: string;           // Số điện thoại
  email: string;           // Email
  street: string;          // Đường phố
  city: string;            // Thành phố
  district: string;        // Quận/Huyện
  zipCode: string;         // Mã bưu điện
  country: string;         // Quốc gia
  isDefault?: boolean;     // Có phải địa chỉ mặc định không
}

// ============================================================
// PAYMENT TYPES (Thanh toán)
// ============================================================

/**
 * PaymentMethod: Phương thức thanh toán
 */
export interface PaymentMethod {
  id?: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'cod'; // Loại thanh toán
  cardNumber?: string;     // Số thẻ (chỉ 4 chữ số cuối: **** **** **** 1234)
  cardHolder?: string;     // Chủ thẻ
  expiryDate?: string;     // Ngày hết hạn (MM/YY)
  cvv?: string;            // CVV
  paypalEmail?: string;    // Email PayPal
  isDefault?: boolean;     // Có phải phương thức mặc định không
}

// ============================================================
// USER TYPES (Người dùng)
// ============================================================

/**
 * User: Định nghĩa người dùng
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;         // URL ảnh đại diện
  addresses: Address[];    // Danh sách địa chỉ
  paymentMethods: PaymentMethod[]; // Danh sách phương thức thanh toán
  preferences: UserPreferences;
  createdAt: string;
  lastLogin?: string;
}

/**
 * UserPreferences: Cài đặt ưa thích của user
 */
export interface UserPreferences {
  darkMode: boolean;       // Chế độ tối
  notifications: boolean;  // Bật thông báo
  language: string;        // Ngôn ngữ (en, vi, ...)
  currency: string;        // Tiền tệ (USD, VND, ...)
}

// ============================================================
// FILTER & SEARCH TYPES (Lọc và tìm kiếm)
// ============================================================

/**
 * ProductFilters: Các bộ lọc sản phẩm
 */
export interface ProductFilters {
  categories?: string[];   // Danh mục đã chọn
  brands?: string[];       // Thương hiệu đã chọn
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;         // Đánh giá tối thiểu (VD: 4 = từ 4 sao trở lên)
  inStock?: boolean;       // Chỉ hiện sản phẩm còn hàng
}

/**
 * SortOption: Các tuỳ chọn sắp xếp
 */
export type SortOption =
  | 'popularity'      // Phổ biến nhất
  | 'newest'          // Mới nhất
  | 'price_low'       // Giá: Thấp đến Cao
  | 'price_high'      // Giá: Cao đến Thấp
  | 'rating';         // Đánh giá

// ============================================================
// API RESPONSE TYPES (Phản hồi từ API)
// ============================================================

/**
 * ApiResponse: Định dạng phản hồi từ API
 */
export interface ApiResponse<T> {
  success: boolean;        // Thành công hay không
  data?: T;               // Dữ liệu trả về
  message?: string;       // Thông báo
  error?: string;         // Lỗi (nếu có)
  statusCode: number;     // Mã status HTTP
}

/**
 * PaginatedResponse: Phản hồi có phân trang
 */
export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasMore: boolean;       // Có trang tiếp theo không
}

// ============================================================
// NAVIGATION TYPES (Điều hướng)
// ============================================================

/**
 * RootStackParamList: Định nghĩa các tham số cho Stack Navigation
 * 
 * Được dùng để:
 * - Type-check navigation params
 * - Autocomplete navigation
 * - Capture params ở các screens
 */
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  ProductDetail: { productId: string }; // Truyền productId khi vào detail
  Checkout: undefined;
  OrderHistory: undefined;
  Settings: undefined;
  OrderDetails: { orderId: string };   // Truyền orderId để xem chi tiết
};

/**
 * BottomTabParamList: Định nghĩa các tham số cho Tab Navigation
 */
export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Favorites: undefined;
  Profile: undefined;
};

// ============================================================
// COMPONENT PROPS TYPES (Props của components)
// ============================================================

/**
 * ButtonProps: Props cho Button component
 */
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline'; // Kiểu button
  size?: 'small' | 'medium' | 'large';            // Kích cỡ
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: any;
  className?: string;
}

/**
 * InputProps: Props cho Input component
 */
export interface InputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;           // Thông báo lỗi
  helperText?: string;      // Gợi ý
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  disabled?: boolean;
  secureTextEntry?: boolean; // Ẩn text (cho password)
  style?: any;
  className?: string;
  inputClassName?: string; // Class cho ô input (container) để tuỳ chỉnh nhanh
}

/**
 * CardProps: Props cho Card component
 */
export interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  elevation?: number;       // Bóng đổ
}

// ============================================================
// PROMO CODE TYPES (Mã khuyến mãi)
// ============================================================

/**
 * PromoCode: Định nghĩa mã khuyến mãi
 */
export interface PromoCode {
  id: string;
  code: string;            // Mã code (VD: "SALE50")
  discount: number;        // % giảm hoặc số tiền cố định
  discountType: 'percentage' | 'fixed'; // Loại giảm giá
  minPurchase?: number;    // Giá tối thiểu để dùng
  maxUses?: number;        // Số lần dùng tối đa
  currentUses: number;     // Đã dùng bao nhiêu lần
  expiryDate: string;      // Ngày hết hạn
  isActive: boolean;
}

// ============================================================
// COMMON TYPES (Các kiểu chung)
// ============================================================

/**
 * LoadingState: Trạng thái loading
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * ErrorObject: Định dạng lỗi
 */
export interface ErrorObject {
  message: string;
  code?: string;
  details?: any;
}
