import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ToastAndroid,
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import CustomInput from '../components/CustomInput';
import { RootStackParamList, User } from '../types';
import { useUser } from '../state/UserContext';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const { loginSuccess } = useUser();

    const isPasswordStrong = (pwd: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(pwd);

    const notify = (title: string, message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(`${title}: ${message}`, ToastAndroid.SHORT);
        }
        Alert.alert(title, message);
    };

    const buildDemoUser = (): User => ({
        id: 'demo-user',
        name: 'Demo User',
        email,
        phone: '0000000000',
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
    });

    const validate = () => {
        const next: { email?: string; password?: string } = {};
        if (!email.trim()) next.email = 'Vui lòng nhập email';
        else if (!email.includes('@')) next.email = 'Email chưa đúng định dạng';
        if (!password.trim()) next.password = 'Mật khẩu không được để trống';
        else if (!isPasswordStrong(password)) next.password = 'Mật khẩu phải >=8 ký tự, gồm chữ thường, chữ hoa, số và ký tự đặc biệt';
        setErrors(next);
        const message = next.email || next.password;
        return { valid: Object.keys(next).length === 0, message };
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    const handleLogin = async () => {
        const { valid, message } = validate();
        if (!valid) {
            if (message) notify('Thiếu thông tin', message);
            return;
        }

        try {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 300));

            const isDemoUser =
                email.trim().toLowerCase() === 'pro8shat@gmail.com' && password === 'Tuanthanhpro8@';

            if (isDemoUser) {
                loginSuccess(buildDemoUser());
                navigation.navigate('MainTabs');
                return;
            }

            notify('Sai thông tin', 'Email hoặc mật khẩu chưa đúng. Vui lòng đăng ký nếu bạn chưa có tài khoản.');
        } catch (error) {
            notify('Lỗi', 'Không thể đăng nhập. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        notify('Quên mật khẩu', 'Tính năng đang được phát triển.');
    };

    const handleSocialComingSoon = (provider: string) => {
        notify(provider, 'Tính năng đang được thiết lập. Vui lòng đăng ký hoặc dùng tài khoản demo.');
    };

    return (
        <SafeAreaView style={styles.screen}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.flex}
            >
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.hero}>
                        <View style={styles.heroCard}>
                            <View style={[styles.blob, styles.blobBlue]} />
                            <View style={[styles.blob, styles.blobIndigo]} />
                            <View style={[styles.blob, styles.blobTeal]} />
                            <View style={styles.logoBox}>
                                <Text style={styles.logoEmoji}>💻</Text>
                            </View>
                        </View>
                        <Text style={styles.brand}>TECHNOLOGY STORE</Text>
                        <Text style={styles.tagline}>Smart tech for smart life</Text>
                        <View style={styles.heroBadge}>
                            <Text style={styles.heroBadgeText}>New drops weekly • Ưu đãi thành viên</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.title}>Sign In</Text>

                        <CustomInput
                            placeholder="ban@example.com"
                            value={email}
                            onChangeText={(v) => {
                                setEmail(v);
                                if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            inputClassName="bg-white border-[#E5E7EB]"
                        />
                        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

                        <CustomInput
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChangeText={(v) => {
                                setPassword(v);
                                if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
                            }}
                            secureTextEntry={!showPassword}
                            inputClassName="bg-white border-[#E5E7EB] mt-3"
                        />
                        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

                        <View style={styles.rowBetween}>
                            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                                <Text style={styles.link}>{showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleForgotPassword}>
                                <Text style={styles.link}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            onPress={handleLogin}
                            disabled={isLoading}
                            activeOpacity={0.9}
                            style={[styles.primaryBtn, isLoading && styles.disabled]}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.primaryText}>SIGN IN</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.dividerWrap}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>Hoặc</Text>
                            <View style={styles.divider} />
                        </View>

                        <View style={styles.socialColumn}>
                            <TouchableOpacity style={[styles.socialBtn, styles.socialOrange]} onPress={() => handleSocialComingSoon('Google')}>
                                <Text style={styles.socialTextRed}>GOOGLE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.socialBtn, styles.socialOrange]} onPress={() => handleSocialComingSoon('Facebook')}>
                                <Text style={styles.socialTextRed}>FACEBOOK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.socialBtn, styles.socialOrange]} onPress={() => handleSocialComingSoon('Apple')}>
                                <Text style={styles.socialTextRed}>APPLE</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footerRow}>
                            <Text style={styles.footerText}>Chưa có tài khoản?</Text>
                            <TouchableOpacity onPress={handleRegister}>
                                <Text style={styles.link}> Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    flex: { flex: 1 },
    scroll: {
        padding: 20,
        paddingTop: 40,
    },
    hero: {
        alignItems: 'center',
        marginBottom: 24,
        gap: 6,
    },
    heroCard: {
        width: 132,
        height: 132,
        borderRadius: 32,
        backgroundColor: '#E0F2FE',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#60A5FA',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 18,
        elevation: 8,
    },
    blob: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        opacity: 0.25,
    },
    blobBlue: {
        backgroundColor: '#60A5FA',
        top: -40,
        right: -30,
    },
    blobIndigo: {
        backgroundColor: '#A5B4FC',
        bottom: -50,
        left: -20,
    },
    blobTeal: {
        backgroundColor: '#6EE7B7',
        top: 10,
        left: 20,
    },
    logoBox: {
        width: 68,
        height: 68,
        borderRadius: 16,
        backgroundColor: '#E0F2FE',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563EB',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 16,
        elevation: 5,
    },
    logoEmoji: { fontSize: 30 },
    brand: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: 1,
        fontFamily: Platform.select({ ios: 'AvenirNext-Bold', android: 'sans-serif-medium', default: 'System' }),
    },
    tagline: {
        fontSize: 14,
        color: '#4B5563',
        textAlign: 'center',
        fontFamily: Platform.select({ ios: 'AvenirNext-Regular', android: 'sans-serif', default: 'System' }),
    },
    heroBadge: {
        marginTop: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: '#E0F2FE',
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },
    heroBadgeText: {
        fontSize: 12,
        color: '#1D4ED8',
        fontWeight: '700',
        letterSpacing: 0.3,
        fontFamily: Platform.select({ ios: 'AvenirNext-DemiBold', android: 'sans-serif-medium', default: 'System' }),
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 24,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
        textAlign: 'center',
        marginBottom: 18,
        fontFamily: Platform.select({ ios: 'AvenirNext-DemiBold', android: 'sans-serif-medium', default: 'System' }),
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 16,
    },
    link: {
        color: '#2563EB',
        fontSize: 13,
        fontWeight: '600',
    },
    primaryBtn: {
        height: 54,
        borderRadius: 999,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563EB',
        shadowOpacity: 0.22,
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 24,
        elevation: 6,
    },
    primaryText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: 0.4,
        fontFamily: Platform.select({ ios: 'AvenirNext-DemiBold', android: 'sans-serif-medium', default: 'System' }),
    },
    disabled: { opacity: 0.7 },
    dividerWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 18,
    },
    divider: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
    dividerText: { marginHorizontal: 10, color: '#9CA3AF', fontSize: 12 },
    socialColumn: {
        gap: 10,
        marginBottom: 12,
    },
    socialBtn: {
        height: 48,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FDBA74',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialTextRed: {
        fontSize: 14,
        fontWeight: '600',
        color: '#EF2B2B',
        textTransform: 'uppercase',
    },
    socialOrange: {
        backgroundColor: '#FDBA74',
        borderColor: '#FDBA74',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
    },
    footerText: { fontSize: 13, color: '#6B7280' },
    errorText: { fontSize: 12, color: '#F44336', marginTop: 4 },
});
