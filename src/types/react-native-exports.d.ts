declare module 'react-native' {
  import * as React from 'react';

  export const View: React.ComponentType<any>;
  export const Text: React.ComponentType<any>;
  export const StyleSheet: { create: (styles: any) => any };
  export const ScrollView: React.ComponentType<any>;
  export const TextInput: React.ComponentType<any>;
  export const Image: React.ComponentType<any>;
  export const TouchableOpacity: React.ComponentType<any>;
  export const SafeAreaView: React.ComponentType<any>;
  export const FlatList: React.ComponentType<any>;
  export const KeyboardAvoidingView: React.ComponentType<any>;
  export const Platform: { OS: string; select: (options: Record<string, any>) => any };
  export const Alert: { alert: (...args: any[]) => void };
  export const ActivityIndicator: React.ComponentType<any>;
  export const StatusBar: React.ComponentType<any>;
  export const Dimensions: { get: (dim: 'window' | 'screen') => { width: number; height: number } };
}

declare module 'react-native-safe-area-context' {
  import * as React from 'react';

  export const SafeAreaProvider: React.ComponentType<{ children?: React.ReactNode }>;
  export const SafeAreaView: React.ComponentType<{ style?: any; children?: React.ReactNode }>;
}
