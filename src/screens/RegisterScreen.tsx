import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SPACING, FONT_SIZES, FONT_WEIGHTS } from '../constants';
import { RootStackParamList } from '../types';
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const styles = useMemo(() => getStyles(colors), [colors]);

  const validate = () => {
    if (!fullName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập họ tên');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập email');
      return false;
    }
    if (!email.includes('@')) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải từ 6 ký tự trở lên');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu nhập lại không khớp');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setIsLoading(true);

      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1200));

      const mockUser = {
        id: `${Date.now()}`,
        email,
        name: fullName,
        phone: '',
        avatar: 'https://picsum.photos/100/100?random=123',
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

      loginSuccess(mockUser);

      Alert.alert('Thành công', 'Tạo tài khoản thành công!', [
        {
          text: 'Tiếp tục',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainTabs' }],
            }),
        },
      ]);
    } catch (error) {
      console.error('Register error', error);
      Alert.alert('Lỗi', 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>📝</Text>
          <Text style={styles.title}>TẠO TÀI KHOẢN</Text>
          <Text style={styles.subtitle}>Nhanh chóng và miễn phí</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Họ tên</Text>
            <CustomInput
              placeholder="Nhập họ tên"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <CustomInput
              placeholder="example@email.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu</Text>
            <CustomInput
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nhập lại mật khẩu</Text>
            <CustomInput
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <CustomButton
            title={isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
            onPress={handleRegister}
            disabled={isLoading}
            variant="primary"
            style={styles.registerButton}
          />

          {isLoading && (
            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={styles.loader}
            />
          )}

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Đã có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={styles.footerLink}> Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  logo: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: colors.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: colors.textLight,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: colors.text,
    marginBottom: SPACING.sm,
  },
  registerButton: {
    marginTop: SPACING.md,
  },
  loader: {
    marginVertical: SPACING.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: colors.textLight,
  },
  footerLink: {
    fontSize: FONT_SIZES.sm,
    color: colors.primary,
    fontWeight: FONT_WEIGHTS.semibold,
  },
});

export default RegisterScreen;
