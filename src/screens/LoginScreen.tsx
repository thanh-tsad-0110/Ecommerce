/**
 * FILE: screens/LoginScreen.tsx
 * GIẢI THÍCH:
 * - Màn hình đăng nhập cho người dùng
 * - Có form nhập email và password
 * - Có nút đăng ký và quên mật khẩu
 */

import React, { useState } from 'react';
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
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../constants';
import { RootStackParamList } from '../types';
import { useUser } from '../state/UserContext';
import { useTheme } from '../state/ThemeContext';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    // ============================================================
    // STATE
    // ============================================================
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { loginSuccess } = useUser();
    const { colors } = useTheme();

    // ============================================================
    // FUNCTIONS
    // ============================================================

    /**
     * handleLogin: Xử lý đăng nhập
     */
    const handleLogin = async () => {
        // Validate input - CHỈ CẦN NHẬP BẤT KỲ EMAIL VÀ PASSWORD NÀO
        if (!email || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu');
            return;
        }

        // Kiểm tra password có ít nhất 1 ký tự
        if (password.length < 1) {
            Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 1 ký tự');
            return;
        }

        try {
            setIsLoading(true);

            // Giả lập API call (1 giây)
            await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

            // Mock login - CHẤP NHẬN BẤT KỲ EMAIL/PASSWORD NÀO
            // Ví dụ: email: "test@gmail.com", password: "123"
            const mockUser = {
                id: '1',
                email: email,
                name: 'Nguyễn Văn A',
                phone: '0123456789',
                avatar: 'https://picsum.photos/100/100?random=999',
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

            // Lưu user vào context
            loginSuccess(mockUser);

            Alert.alert('Thành công', 'Đăng nhập thành công!', [
                {
                    text: 'OK',
                    onPress: () => {
                        // Navigate to main app
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'MainTabs' }],
                        });
                    },
                },
            ]);
        } catch (error) {
            console.error('Login error', error);
            Alert.alert('Lỗi', 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * handleRegister: Chuyển đến màn hình đăng ký
     */
    const handleRegister = () => {
        navigation.navigate('Register');
    };

    /**
     * handleGoogleLogin: Giả lập đăng nhập bằng Google (mock)
     * Lưu user vào context và chuyển sang MainTabs
     */
    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            await new Promise<void>((resolve) => setTimeout(() => resolve(), 600));

            const googleUser = {
                id: `google-${Date.now()}`,
                email: 'user.google@example.com',
                name: 'Google User',
                phone: '',
                avatar: 'https://picsum.photos/100/100?random=321',
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

            loginSuccess(googleUser);
            navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
        } catch (error) {
            console.error('Google login error', error);
            Alert.alert('Lỗi', 'Đăng nhập Google thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * handleForgotPassword: Quên mật khẩu
     */
    const handleForgotPassword = () => {
        Alert.alert('Quên mật khẩu', 'Chức năng quên mật khẩu - TODO');
    };

    // ============================================================
    // RENDER
    // ============================================================

    const styles = getStyles(colors);

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* LOGO / HEADER */}
                <View style={styles.header}>
                    <Text style={styles.logo}>🛍️</Text>
                    <Text style={styles.title}>ECOMMERCE APP</Text>
                    <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>

                    {/* HƯỚNG DẪN ĐĂNG NHẬP */}
                    <View style={styles.demoHint}>
                        <Text style={styles.demoHintTitle}>💡 Demo - Nhập bất kỳ:</Text>
                        <Text style={styles.demoHintText}>Email: test@gmail.com</Text>
                        <Text style={styles.demoHintText}>Password: 123</Text>
                    </View>
                </View>

                {/* FORM */}
                <View style={styles.form}>
                    {/* EMAIL INPUT */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <CustomInput
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* PASSWORD INPUT */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <CustomInput
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                    </View>

                    {/* SHOW PASSWORD TOGGLE */}
                    <TouchableOpacity
                        style={styles.showPasswordContainer}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text style={styles.showPasswordText}>
                            {showPassword ? '🙈 Ẩn mật khẩu' : '👁️ Hiện mật khẩu'}
                        </Text>
                    </TouchableOpacity>

                    {/* FORGOT PASSWORD */}
                    <TouchableOpacity
                        style={styles.forgotPasswordContainer}
                        onPress={handleForgotPassword}
                    >
                        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    {/* LOGIN BUTTON */}
                    <CustomButton
                        title={isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        onPress={handleLogin}
                        disabled={isLoading}
                        variant="primary"
                        style={styles.loginButton}
                    />

                    <CustomButton
                        title={isLoading ? 'Đang xử lý...' : 'Đăng nhập với Google'}
                        onPress={handleGoogleLogin}
                        disabled={isLoading}
                        variant="secondary"
                        style={styles.googleButton}
                        icon={<Text style={{ fontSize: 16 }}>🟢</Text>}
                    />

                    {isLoading && (
                        <ActivityIndicator
                            size="small"
                            color={colors.primary}
                            style={styles.loader}
                        />
                    )}

                    {/* DIVIDER */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>HOẶC</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* REGISTER BUTTON */}
                    <CustomButton
                        title="Tạo tài khoản mới"
                        onPress={handleRegister}
                        variant="secondary"
                        style={styles.registerButton}
                    />
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Bằng cách đăng nhập, bạn đồng ý với{' '}
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.footerLink}>Điều khoản dịch vụ</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}> và </Text>
                    <TouchableOpacity>
                        <Text style={styles.footerLink}>Chính sách bảo mật</Text>
                    </TouchableOpacity>
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

    // HEADER
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

    // DEMO HINT
    demoHint: {
        marginTop: SPACING.lg,
        padding: SPACING.md,
        backgroundColor: colors.primaryLight,
        borderRadius: BORDER_RADIUS.md,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    demoHintTitle: {
        fontSize: FONT_SIZES.sm,
        fontWeight: FONT_WEIGHTS.bold,
        color: colors.primary,
        marginBottom: SPACING.xs,
    },
    demoHintText: {
        fontSize: FONT_SIZES.xs,
        color: colors.text,
        marginLeft: SPACING.sm,
    },

    // FORM
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

    // SHOW PASSWORD
    showPasswordContainer: {
        alignSelf: 'flex-start',
        marginBottom: SPACING.md,
    },
    showPasswordText: {
        fontSize: FONT_SIZES.sm,
        color: colors.primary,
    },

    // FORGOT PASSWORD
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.xl,
    },
    forgotPasswordText: {
        fontSize: FONT_SIZES.sm,
        color: colors.primary,
        fontWeight: FONT_WEIGHTS.semibold,
    },

    // BUTTONS
    loginButton: {
        marginBottom: SPACING.md,
    },
    googleButton: {
        marginBottom: SPACING.md,
    },
    registerButton: {
        marginTop: SPACING.md,
    },

    // LOADER
    loader: {
        marginVertical: SPACING.md,
    },

    // DIVIDER
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.xl,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        marginHorizontal: SPACING.md,
        fontSize: FONT_SIZES.xs,
        color: colors.textLight,
        fontWeight: FONT_WEIGHTS.semibold,
    },

    // FOOTER
    footer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: SPACING.xxxl,
    },
    footerText: {
        fontSize: FONT_SIZES.xs,
        color: colors.textLight,
    },
    footerLink: {
        fontSize: FONT_SIZES.xs,
        color: colors.primary,
        fontWeight: FONT_WEIGHTS.semibold,
    },
});

export default LoginScreen;
