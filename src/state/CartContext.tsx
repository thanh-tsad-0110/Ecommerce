/**
 * FILE: state/CartContext.tsx
 * GIẢI THÍCH:
 * - Context API dùng để quản lý trạng thái giỏ hàng toàn cục
 * - Thay vì truyền props từ component cha đến con (prop drilling)
 *   chúng ta dùng Context để các component con có thể truy cập trực tiếp
 * - Giống như Redux nhưng đơn giản hơn
 */

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { CartItem, Product } from '../types';

// ============================================================
// DEFINE CONTEXT STATE & ACTIONS
// ============================================================

/**
 * CartState: Cấu trúc dữ liệu của giỏ hàng
 */
interface CartState {
  items: CartItem[];           // Danh sách sản phẩm trong giỏ
  totalItems: number;          // Tổng số lượng items
  totalPrice: number;          // Tổng giá
  isLoading: boolean;          // Đang tải dữ liệu
  error: string | null;        // Lỗi (nếu có)
}

/**
 * CartAction: Các hành động có thể thực hiện trên giỏ
 * Mỗi action có type (loại hành động) và payload (dữ liệu)
 */
type CartAction = 
  | {
      type: 'ADD_TO_CART';
      payload: CartItem;         // Thêm 1 item vào giỏ
    }
  | {
      type: 'REMOVE_FROM_CART';
      payload: string;           // Remove item bằng id
    }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { id: string; quantity: number }; // Cập nhật số lượng
    }
  | {
      type: 'CLEAR_CART';        // Xóa tất cả items
    }
  | {
      type: 'SET_LOADING';
      payload: boolean;
    }
  | {
      type: 'SET_ERROR';
      payload: string | null;
    };

// ============================================================
// INITIAL STATE (Trạng thái khởi tạo)
// ============================================================
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null,
};

// ============================================================
// REDUCER FUNCTION (Hàm xử lý logic)
// ============================================================
/**
 * Reducer: Hàm nhận state hiện tại và action, trả về state mới
 * Tương tự switch-case trong Redux
 */
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Kiểm tra xem product đã có trong giỏ chưa
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      let updatedItems: CartItem[];
      if (existingItem) {
        // Nếu có rồi, tăng số lượng
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Nếu chưa có, thêm mới
        updatedItems = [...state.items, action.payload];
      }

      // Tính tổng
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
        error: null,
      };
    }

    case 'REMOVE_FROM_CART': {
      // Xóa item khỏi giỏ
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'UPDATE_QUANTITY': {
      // Cập nhật số lượng
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        // Nếu quantity <= 0, xóa item
        const updatedItems = state.items.filter((item) => item.id !== id);
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return {
          ...state,
          items: updatedItems,
          totalItems,
          totalPrice,
        };
      }

      // Update quantity
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    }

    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

// ============================================================
// CREATE CONTEXT (Tạo context)
// ============================================================
interface CartContextType extends CartState {
  // Các action để manipulate state
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Context được khởi tạo với undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// ============================================================
// PROVIDER COMPONENT (Component provider)
// ============================================================
/**
 * CartProvider: Component bao bọc toàn bộ app
 * Cung cấp cart state cho tất cả component con
 * 
 * Cách dùng:
 * <CartProvider>
 *   <App />
 * </CartProvider>
 */
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Các action functions sử dụng dispatch
  const addToCart = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const value: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// ============================================================
// CUSTOM HOOK (Hook để dùng context)
// ============================================================
/**
 * useCart: Hook để sử dụng cart context
 * 
 * Cách dùng trong component:
 * const { items, totalPrice, addToCart } = useCart();
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart phải được dùng bên trong CartProvider');
  }

  return context;
};

export default CartContext;
