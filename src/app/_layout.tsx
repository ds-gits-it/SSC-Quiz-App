import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
