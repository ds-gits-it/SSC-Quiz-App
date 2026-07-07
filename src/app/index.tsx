import ChatUI from '@/components/ui/chat';
import Store from '@/store';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {
  useEffect(() => {
    Store.setItem(
      'chat-history',
      JSON.stringify([
        { type: 'bot', text: 'Hello User!' },
        { type: 'user', text: 'Hello Bot!' },
      ]),
    );
    return () => {
      Store.removeItem('chat-history');
    };
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ChatUI />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.72,
  },
});
