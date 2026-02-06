import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.setState({ error, errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Đã xảy ra lỗi!</Text>
                    <Text style={styles.subtitle}>Ứng dụng gặp sự cố không mong muốn.</Text>
                    <ScrollView style={styles.scroll}>
                        <Text style={styles.errorText}>
                            {this.state.error && this.state.error.toString()}
                        </Text>
                        {this.state.errorInfo && (
                            <Text style={styles.errorInfo}>
                                {this.state.errorInfo.componentStack}
                            </Text>
                        )}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                    >
                        <Text style={styles.buttonText}>Thử lại</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#D8000C',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    scroll: {
        maxHeight: 400,
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 5,
    },
    errorText: {
        color: '#D8000C',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    errorInfo: {
        color: '#666',
        fontFamily: 'monospace',
        fontSize: 12,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ErrorBoundary;
