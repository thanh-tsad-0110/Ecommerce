/**
 * FILE: screens/SettingsScreen.tsx
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants';
import { useUser } from '../state/UserContext';
import { useTheme } from '../state/ThemeContext';

const SettingsScreen: React.FC = () => {
  const { user, updateUser } = useUser();
  const { colors, isDark, toggleTheme } = useTheme();

  const [notifications, setNotifications] = useState(user?.preferences?.notifications || true);
  const [location, setLocation] = useState(true);

  // Handler cho Dark Mode
  const handleDarkModeToggle = () => {
    toggleTheme();
    Alert.alert(
      'Chế độ tối',
      !isDark ? 'Đã bật chế độ tối' : 'Đã tắt chế độ tối',
      [{ text: 'OK' }]
    );
  };

  // Handler cho Notifications
  const handleNotificationsToggle = (value: boolean) => {
    setNotifications(value);
    if (user) {
      updateUser({
        preferences: {
          ...user.preferences,
          notifications: value,
        },
      });
    }
  };

  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* APPEARANCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giao diện</Text>
          <SettingItem
            title="Chế độ tối"
            subtitle="Sử dụng chế độ tối"
            toggle={
              <Switch
                value={isDark}
                onValueChange={handleDarkModeToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            }
            styles={styles}
          />
        </View>

        {/* NOTIFICATIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông báo</Text>
          <SettingItem
            title="Thông báo đẩy"
            subtitle="Nhận cập nhật đơn hàng"
            toggle={
              <Switch
                value={notifications}
                onValueChange={handleNotificationsToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            }
            styles={styles}
          />
          <SettingItem
            title="Vị trí"
            subtitle="Cho phép truy cập vị trí"
            toggle={
              <Switch
                value={location}
                onValueChange={setLocation}
                trackColor={{ false: colors.border, true: colors.primary }}
              />
            }
            styles={styles}
          />
        </View>

        {/* ACCOUNT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tài khoản</Text>
          <SettingButton
            title="Thay đổi mật khẩu"
            onPress={() => Alert.alert('Thay đổi mật khẩu', 'Chức năng thay đổi mật khẩu - TODO')}
            styles={styles}
          />
          <SettingButton
            title="Xóa tài khoản"
            onPress={() => Alert.alert('Xóa tài khoản', 'Chức năng xóa tài khoản - TODO')}
            variant="destructive"
            styles={styles}
          />
        </View>

        {/* ABOUT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Về ứng dụng</Text>
          <SettingButton
            title="Về chúng tôi"
            onPress={() => Alert.alert('Về chúng tôi', 'Chức năng về chúng tôi - TODO')}
            styles={styles}
          />
          <SettingButton
            title="Điều khoản dịch vụ"
            onPress={() => Alert.alert('Điều khoản dịch vụ', 'Chức năng điều khoản dịch vụ - TODO')}
            styles={styles}
          />
          <SettingButton
            title="Chính sách bảo mật"
            onPress={() => Alert.alert('Chính sách bảo mật', 'Chức năng chính sách bảo mật - TODO')}
            styles={styles}
          />
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingItem: React.FC<{
  title: string;
  subtitle?: string;
  toggle?: React.ReactNode;
  styles: any;
}> = ({ title, subtitle, toggle, styles }) => (
  <View style={styles.settingItem}>
    <View>
      <Text style={styles.settingTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
    </View>
    {toggle}
  </View>
);

const SettingButton: React.FC<{
  title: string;
  onPress: () => void;
  variant?: 'normal' | 'destructive';
  styles: any;
}> = ({ title, onPress, variant = 'normal', styles }) => (
  <TouchableOpacity
    style={[styles.settingButton, variant === 'destructive' && styles.destructive]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.settingButtonText,
        variant === 'destructive' && styles.destructiveText,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.text,
    marginBottom: SPACING.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: colors.text,
  },
  settingSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: colors.textLight,
    marginTop: SPACING.xs,
  },
  settingButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: colors.backgroundDark,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  settingButtonText: {
    fontSize: FONT_SIZES.md,
    color: colors.text,
    textAlign: 'center',
  },
  destructive: {
    backgroundColor: colors.error + '20',
  },
  destructiveText: {
    color: colors.error,
    fontWeight: FONT_WEIGHTS.semibold as any,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  versionText: {
    fontSize: FONT_SIZES.sm,
    color: colors.textLight,
  },
});

export default SettingsScreen;
