/**
 * FILE: services/api.ts
 * GIẢI THÍCH:
 * - Chứa tất cả các function để gọi API
 * - Tập trung 1 chỗ thay vì lặp lại code fetch ở nhiều nơi
 * - Dễ quản lý, thay đổi logic API một chỗ là áp dụng toàn bộ app
 */

import { ApiResponse, PaginatedResponse, Product, Order, User } from '../types';
import { APP_CONFIG } from '../constants';

/**
 * Base config cho tất cả API calls
 */
const API_BASE_URL = APP_CONFIG.apiBaseUrl;
const API_TIMEOUT = APP_CONFIG.apiTimeout;

// ============================================================
// HELPER FUNCTIONS (Các hàm hỗ trợ)
// ============================================================

/**
 * fetchWithTimeout: Fetch với timeout
 * Tránh app bị hang nếu API không phản hồi
 */
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

/**
 * handleApiResponse: Xử lý phản hồi từ API
 * Kiểm tra status code, parse JSON, xử lý lỗi
 */
const handleApiResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  const data = isJson ? await response.json() : await response.text();

  // Nếu status không phải 2xx (200-299), throw error
  if (!response.ok) {
    throw new Error(data?.message || `HTTP ${response.status}`);
  }

  return data;
};

/**
 * retryRequest: Retry request nếu thất bại
 * Tái thử lại nếu có network error
 */
const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries: number = APP_CONFIG.retryAttempts,
  delay: number = APP_CONFIG.retryDelay
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay);
    }
    throw error;
  }
};

// ============================================================
// PRODUCTS API (Gọi API lấy sản phẩm)
// ============================================================

/**
 * getProducts: Lấy danh sách sản phẩm
 * 
 * Ví dụ:
 * const products = await getProducts({ page: 1, limit: 10 });
 */
export const getProducts = async (
  params?: {
    page?: number;
    limit?: number;
    category?: string;
    sort?: string;
  }
): Promise<PaginatedResponse<Product>> => {
  return retryRequest(async () => {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.category) query.append('category', params.category);
    if (params?.sort) query.append('sort', params.sort);

    const url = `${API_BASE_URL}/api/products?${query.toString()}`;
    const response = await fetchWithTimeout(url);
    return handleApiResponse<PaginatedResponse<Product>>(response);
  });
};

/**
 * getProductDetail: Lấy chi tiết một sản phẩm
 */
export const getProductDetail = async (productId: string): Promise<Product> => {
  return retryRequest(async () => {
    const url = `${API_BASE_URL}/api/products/${productId}`;
    const response = await fetchWithTimeout(url);
    return handleApiResponse<Product>(response);
  });
};

/**
 * searchProducts: Tìm kiếm sản phẩm
 */
export const searchProducts = async (
  query: string,
  page: number = 1
): Promise<PaginatedResponse<Product>> => {
  return retryRequest(async () => {
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('page', page.toString());

    const url = `${API_BASE_URL}/api/search?${params.toString()}`;
    const response = await fetchWithTimeout(url);
    return handleApiResponse<PaginatedResponse<Product>>(response);
  });
};

// ============================================================
// ORDERS API (Gọi API đơn hàng)
// ============================================================

/**
 * getOrders: Lấy danh sách đơn hàng của user
 */
export const getOrders = async (page: number = 1): Promise<PaginatedResponse<Order>> => {
  return retryRequest(async () => {
    const url = `${API_BASE_URL}/api/orders?page=${page}`;
    const response = await fetchWithTimeout(url, {
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    });
    return handleApiResponse<PaginatedResponse<Order>>(response);
  });
};

/**
 * getOrderDetail: Lấy chi tiết một đơn hàng
 */
export const getOrderDetail = async (orderId: string): Promise<Order> => {
  return retryRequest(async () => {
    const url = `${API_BASE_URL}/api/orders/${orderId}`;
    const response = await fetchWithTimeout(url, {
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    });
    return handleApiResponse<Order>(response);
  });
};

/**
 * placeOrder: Tạo đơn hàng mới
 */
export const placeOrder = async (orderData: any): Promise<Order> => {
  return retryRequest(async () => {
    const url = `${API_BASE_URL}/api/orders`;
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAuthToken()}`,
      },
      body: JSON.stringify(orderData),
    });
    return handleApiResponse<Order>(response);
  });
};

// ============================================================
// USER API (Gọi API user)
// ============================================================

/**
 * getUserProfile: Lấy thông tin profile user
 */
export const getUserProfile = async (): Promise<User> => {
  return retryRequest(async () => {
    const url = `${API_BASE_URL}/api/user/profile`;
    const response = await fetchWithTimeout(url, {
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    });
    return handleApiResponse<User>(response);
  });
};

/**
 * updateUserProfile: Cập nhật profile user
 */
export const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  return retryRequest(async () => {
    const url = `${API_BASE_URL}/api/user/profile`;
    const response = await fetchWithTimeout(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getAuthToken()}`,
      },
      body: JSON.stringify(userData),
    });
    return handleApiResponse<User>(response);
  });
};

// ============================================================
// AUTH API (Gọi API authentication)
// ============================================================

/**
 * login: Đăng nhập
 */
export const login = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  return retryRequest(async () => {
    const url = `${API_BASE_URL}/api/auth/login`;
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return handleApiResponse<{ user: User; token: string }>(response);
  });
};

/**
 * register: Đăng ký tài khoản
 */
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<{ user: User; token: string }> => {
  return retryRequest(async () => {
    const url = `${API_BASE_URL}/api/auth/register`;
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });
    return handleApiResponse<{ user: User; token: string }>(response);
  });
};

/**
 * logout: Đăng xuất
 */
export const logout = async (): Promise<void> => {
  return retryRequest(async () => {
    const url = `${API_BASE_URL}/api/auth/logout`;
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`,
      },
    });
    await handleApiResponse<void>(response);
  });
};

// ============================================================
// PROMO API (Gọi API mã khuyến mãi)
// ============================================================

/**
 * validatePromoCode: Kiểm tra mã khuyến mãi
 */
export const validatePromoCode = async (code: string): Promise<any> => {
  return retryRequest(async () => {
    const url = `${API_BASE_URL}/api/promo/validate`;
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });
    return handleApiResponse<any>(response);
  });
};

// ============================================================
// HELPER (Lấy auth token)
// ============================================================

/**
 * getAuthToken: Lấy auth token từ storage
 * Thường được lưu sau khi đăng nhập
 */
export const getAuthToken = async (): Promise<string> => {
  // TODO: Implement lấy token từ AsyncStorage
  return '';
};

/**
 * setAuthToken: Lưu auth token
 */
export const setAuthToken = async (token: string): Promise<void> => {
  // TODO: Implement lưu token vào AsyncStorage
};

/**
 * clearAuthToken: Xóa auth token
 */
export const clearAuthToken = async (): Promise<void> => {
  // TODO: Implement xóa token khỏi AsyncStorage
};

export default {
  // Products
  getProducts,
  getProductDetail,
  searchProducts,

  // Orders
  getOrders,
  getOrderDetail,
  placeOrder,

  // User
  getUserProfile,
  updateUserProfile,

  // Auth
  login,
  register,
  logout,

  // Promo
  validatePromoCode,

  // Token
  getAuthToken,
  setAuthToken,
  clearAuthToken,
};
