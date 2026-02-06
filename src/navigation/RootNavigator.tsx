/**
 * FILE: navigation/RootNavigator.tsx
 * GIẢI THÍCH:
 * - Setup navigation chính của app
 * - Kết hợp Tab Navigation (Home, Search, Cart, ...) + Stack Navigation
 * - Định nghĩa cấu trúc điều hướng toàn bộ app
 */

import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, TAB_NAMES } from '../constants';
import { RootStackParamList, BottomTabParamList } from '../types';
import { useTheme } from '../state/ThemeContext';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';


// ============================================================
// CREATE NAVIGATORS (Tạo các loại navigator)
// ============================================================

/**
 * Stack Navigator: Cho phép điều hướng giữa các màn hình
 * Mỗi khi vào màn hình mới, màn hình cũ được lưu trong stack
 * Có nút back để quay lại
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Tab Navigator: Thanh tab dưới cùng
 * Cho phép nhanh chóng switch giữa các tab chính
 */
const Tab = createBottomTabNavigator<BottomTabParamList>();

// ============================================================
// TAB NAVIGATION (Thanh tab dưới cùng)
// ============================================================

/**
 * BottomTabNavigator: Setup các tab chính
 * 
 * Cấu trúc:
 * - Home: Trang chủ
 * - Search: Tìm kiếm
 * - Cart: Giỏ hàng
 * - Favorites: Danh sách yêu thích
 * - Profile: Hồ sơ user
 */
const BottomTabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        // Style toàn bộ tab bar
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,     // Màu icon khi active
        tabBarInactiveTintColor: colors.textLight, // Màu icon khi inactive
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600' as const,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontWeight: 'bold' as const,
          fontSize: 18,
          color: colors.text,
        },
      }}
    >
      {/* TAB 1: HOME */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          tabBarLabel: TAB_NAMES.home,
          tabBarIcon: ({ color }) => (
            <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>🏠</Text>
            </View>
          ),
          headerTitle: '🛍️ TECHNOLOGY STORE',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            letterSpacing: 0.6,
            textTransform: 'uppercase' as const,
          },
        }}
      />

      {/* TAB 2: SEARCH */}
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Tìm kiếm',
          tabBarLabel: TAB_NAMES.search,
          tabBarIcon: ({ color }) => (
            <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>🔍</Text>
            </View>
          ),
          headerTitle: 'Tìm kiếm sản phẩm',
        }}
      />

      {/* TAB 3: CART */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Giỏ hàng',
          tabBarLabel: TAB_NAMES.cart,
          tabBarIcon: ({ color }) => (
            <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>🛒</Text>
            </View>
          ),
          headerTitle: 'Giỏ hàng',
        }}
      />

      {/* TAB 4: FAVORITES */}
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Yêu thích',
          tabBarLabel: TAB_NAMES.favorites,
          tabBarIcon: ({ color }) => (
            <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>❤️</Text>
            </View>
          ),
          headerTitle: 'Danh sách yêu thích',
        }}
      />

      {/* TAB 5: PROFILE */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Hồ sơ',
          tabBarLabel: TAB_NAMES.profile,
          tabBarIcon: ({ color }) => (
            <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>👤</Text>
            </View>
          ),
          headerTitle: 'Hồ sơ của tôi',
        }}
      />
    </Tab.Navigator>
  );
};

// ============================================================
// STACK NAVIGATION (Modal/Detail screens)
// ============================================================

/**
 * RootNavigator: Setup chính của app
 * 
 * Cấu trúc:
 * - Main: BottomTabNavigator (tabs chính)
 * - ProductDetail: Chi tiết sản phẩm (push từ Home/Search)
 * - Checkout: Thanh toán (push từ Cart)
 * - OrderHistory: Lịch sử đơn hàng
 * - OrderDetails: Chi tiết đơn hàng
 * - Settings: Cài đặt
 */
export const RootNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          fontWeight: 'bold' as const,
          fontSize: 18,
          color: colors.text,
        },
        headerTintColor: colors.primary,
      }}
    >
      {/* LOGIN SCREEN */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,  // Không hiển thị header cho login
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* MAIN: Tab navigation */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          headerShown: false,  // Không hiển thị header cho main tabs
        }}
      />

      {/* PRODUCT DETAIL */}
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          title: 'Chi tiết sản phẩm',
        }}
      />

      {/* CHECKOUT */}
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Thanh toán',
        }}
      />

      {/* ORDER HISTORY */}
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          title: 'Lịch sử đơn hàng',
        }}
      />

      {/* ORDER DETAILS */}
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{
          title: 'Chi tiết đơn hàng',
        }}
      />

      {/* SETTINGS */}
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Cài đặt',
        }}
      />
    </Stack.Navigator>
  );
};



export default RootNavigator;
