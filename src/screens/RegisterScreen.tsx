import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, User } from '../types';
import { useUser } from '../state/UserContext';
import { useTheme } from '../state/ThemeContext';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';


type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { loginSuccess } = useUser();
  const { colors } = useTheme();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string; confirmPassword?: string }>( {} );

  const validate = () => {
    const next: { fullName?: string; email?: string; password?: string; confirmPassword?: string } = {};
    if (!fullName.trim()) next.fullName = 'Vui lòng nhập họ tên';
    if (!email.trim()) next.email = 'Vui lòng nhập email';
    else if (!email.includes('@')) next.email = 'Email không hợp lệ';
    if (password.length < 6) next.password = 'Mật khẩu phải từ 6 ký tự trở lên';
    if (password !== confirmPassword) next.confirmPassword = 'Mật khẩu nhập lại không khớp';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setIsLoading(true);

      await new Promise<void>((resolve) => setTimeout(() => resolve(), 900));

      const newUser: User = {
        id: `${Date.now()}`,
        email,
        name: fullName,
        phone: phone || 'Chưa cập nhật',
        avatar: undefined,
        addresses: [],
        paymentMethods: [],
        preferences: {
          darkMode: false,
          notifications: true,
          language: 'vi',
          currency: 'VND',
        },
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      loginSuccess(newUser);

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } catch (error) {
      console.error('Register error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.hero}>
            <View style={styles.logoBox}>
              <Text style={styles.logoEmoji}>🛡️</Text>
            </View>
            <Text style={styles.heading}>Tạo tài khoản</Text>
            <Text style={styles.subheading}>Bắt đầu trải nghiệm của bạn</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Đăng ký</Text>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Họ tên</Text>
              <CustomInput
                placeholder="Nguyen Van A"
                value={fullName}
                onChangeText={(v) => {
                  setFullName(v);
                  if (errors.fullName) setErrors((e) => ({ ...e, fullName: undefined }));
                }}
                icon={<Text style={styles.inputIcon}>👤</Text>}
                inputClassName="bg-white border-[#E5E7EB]"
              />
              {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Email</Text>
              <CustomInput
                placeholder="ban@example.com"
                value={email}
                onChangeText={(v) => {
                  setEmail(v);
                  if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                icon={<Text style={styles.inputIcon}>✉️</Text>}
                inputClassName="bg-white border-[#E5E7EB]"
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Số điện thoại (tuỳ chọn)</Text>
              <CustomInput
                placeholder="0901234567"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                icon={<Text style={styles.inputIcon}>📱</Text>}
                inputClassName="bg-white border-[#E5E7EB]"
              />
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Mật khẩu</Text>
              <CustomInput
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChangeText={(v) => {
                  setPassword(v);
                  if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
                }}
                secureTextEntry={!showPassword}
                icon={<Text style={styles.inputIcon}>🔒</Text>}
                rightIcon={<Text style={styles.toggleText}>{showPassword ? 'Ẩn' : 'Hiện'}</Text>}
                onRightIconPress={() => setShowPassword((prev) => !prev)}
                helperText="Tối thiểu 6 ký tự"
                inputClassName="bg-white border-[#E5E7EB]"
              />
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.label}>Nhập lại mật khẩu</Text>
              <CustomInput
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChangeText={(v) => {
                  setConfirmPassword(v);
                  if (errors.confirmPassword) setErrors((e) => ({ ...e, confirmPassword: undefined }));
                }}
                secureTextEntry={!showConfirm}
                icon={<Text style={styles.inputIcon}>✅</Text>}
                rightIcon={<Text style={styles.toggleText}>{showConfirm ? 'Ẩn' : 'Hiện'}</Text>}
                onRightIconPress={() => setShowConfirm((prev) => !prev)}
                inputClassName="bg-white border-[#E5E7EB]"
              />
              {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
            </View>

            <CustomButton
              title={isLoading ? 'Đang đăng ký...' : 'Tạo tài khoản'}
              onPress={handleRegister}
              disabled={isLoading}
              variant="primary"
              className="rounded-full"
              style={styles.cta}
            />

            {isLoading && (
              <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />
            )}

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Đã có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={[styles.footerLink, { color: colors.primary }]}> Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 6,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#FFEAD5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f97316',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 5,
  },
  logoEmoji: { fontSize: 28 },
  heading: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  subheading: { fontSize: 14, color: '#6B7280' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 10,
  },
  fieldBlock: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
    marginLeft: 6,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 6,
  },
  loader: {
    marginVertical: 12,
  },
  inputIcon: {
    fontSize: 16,
  },
  toggleText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '700',
  },
  cta: {
    shadowColor: '#F97316',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 16,
    elevation: 6,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 13,
    color: '#6B7280',
  },
  footerLink: {
    fontSize: 13,
    fontWeight: '700',
  },
});
