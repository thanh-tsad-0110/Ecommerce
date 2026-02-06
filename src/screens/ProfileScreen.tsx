/**
 * FILE: screens/ProfileScreen.tsx
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants';
import { BottomTabParamList, RootStackParamList } from '../types';
import { useUser } from '../state/UserContext';
import { useTheme } from '../state/ThemeContext';
import CustomButton from '../components/CustomButton';

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, isAuthenticated, logout } = useUser();
  const { colors } = useTheme();

  const styles = getStyles(colors);

  if (!isAuthenticated || !user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginIcon}>👤</Text>
          <Text style={styles.loginTitle}>Đăng nhập để tiếp tục</Text>
          <CustomButton
            title="Đăng nhập"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
            size="large"
            style={{ marginTop: SPACING.lg }}
          />
          <CustomButton
            title="Đăng ký"
            onPress={() => navigation.navigate('Register')}
            variant="secondary"
            size="large"
            style={{ marginTop: SPACING.md }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleLogout = () => {
    Alert.alert('Xác nhận', 'Bạn chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', onPress: () => { } },
      {
        text: 'Đăng xuất',
        onPress: () => {
          logout();
          Alert.alert('Thành công', 'Đã đăng xuất');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PROFILE HEADER */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại</Text>
            <Text style={styles.infoValue}>{user.phone || 'Chưa cập nhật'}</Text>
          </View>
        </View>

        {/* MENU ITEMS */}
        <View style={styles.section}>
          <MenuItem
            icon="📦"
            title="Lịch sử đơn hàng"
            onPress={() => navigation.navigate('OrderHistory')}
            styles={styles}
          />
          <MenuItem
            icon="📍"
            title="Địa chỉ giao hàng"
            onPress={() => Alert.alert('Quản lý địa chỉ', 'Chức năng quản lý địa chỉ - TODO')}
            styles={styles}
          />
          <MenuItem
            icon="💳"
            title="Phương thức thanh toán"
            onPress={() => Alert.alert('Quản lý thanh toán', 'Chức năng quản lý thanh toán - TODO')}
            styles={styles}
          />
          <MenuItem
            icon="⚙️"
            title="Cài đặt"
            onPress={() => navigation.navigate('Settings')}
            styles={styles}
          />
          <MenuItem
            icon="📞"
            title="Liên hệ hỗ trợ"
            onPress={() => Alert.alert('Liên hệ', 'Chức năng liên hệ - TODO')}
            styles={styles}
          />
        </View>

        {/* LOGOUT */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Đăng xuất"
            onPress={handleLogout}
            variant="outline"
            size="large"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem: React.FC<{
  icon: string;
  title: string;
  onPress: () => void;
  styles: any;
}> = ({ icon, title, onPress, styles }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <Text style={styles.menuTitle}>{title}</Text>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  loginIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  loginTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.text,
    marginBottom: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.textInverse,
  },
  name: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.text,
  },
  email: {
    fontSize: FONT_SIZES.sm,
    color: colors.textLight,
    marginTop: SPACING.xs,
  },
  section: {
    paddingVertical: SPACING.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  menuTitle: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: colors.text,
  },
  menuArrow: {
    fontSize: 20,
    color: colors.textLight,
  },
  buttonContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  infoCard: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    backgroundColor: colors.background,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  infoLabel: {
    fontSize: FONT_SIZES.sm,
    color: colors.textLight,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    color: colors.text,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});

export default ProfileScreen;
