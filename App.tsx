/**

 * ROOT ENTRY POINT - Wraps entire application with providers and navigation
 * 
 * This is the main file that starts the application. Think of it like the
 * "wrapper" that enables all features (state management, navigation, etc.)
 * to work throughout the entire app.
 * 
 * EXPLANATION FOR BEGINNERS:
 * - We import all our Context providers (CartProvider, FavoritesProvider, UserProvider)
 * - We wrap the RootNavigator with these providers in nested order
 * - This allows any screen/component to access useCart, useFavorites, useUser hooks
 * - SafeAreaView handles iPhone notches and safe zones on different devices
 */

import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

// Import all providers (Context wrappers)
import { CartProvider } from './src/state/CartContext';
import { FavoritesProvider } from './src/state/FavoritesContext';
import { UserProvider } from './src/state/UserContext';
import { ThemeProvider, useTheme } from './src/state/ThemeContext';

// Import main navigation setup
import RootNavigator from './src/navigation/RootNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';

type GestureRootProps = React.ComponentProps<typeof GestureHandlerRootView> & {
  style?: any;
};

const GHRoot = GestureHandlerRootView as React.ComponentType<GestureRootProps>;

const AppContent: React.FC = () => {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Status bar configuration - controls top status bar appearance */}
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
        translucent={false}
      />

      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const App: React.FC = () => {
  return (
    <GHRoot style={styles.container}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <CartProvider>
            <FavoritesProvider>
              <UserProvider>
                <ThemeProvider>
                  <AppContent />
                </ThemeProvider>
              </UserProvider>
            </FavoritesProvider>
          </CartProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GHRoot>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
