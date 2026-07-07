import ChatHistory from '@/components/ui/chat/chat-history';
import Input from '@/components/ui/chat/input';
import TopBar from '@/components/ui/chat/topbar';
import { useBot } from '@/hooks/useBot';
import Store from '@/store';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
export default function HomeScreen() {
  const [chat, setChat] = useState([]);
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

  useEffect(() => {
    const run = async () => {
      const rawChatHistory: string | null = await Store.getItem('chat-history');
      const chatHistory = JSON.parse(rawChatHistory) || [];
      setChat(chatHistory);
    };
    run();
    return () => setChat([]);
  }, []);

  const eventHandler = () => {
    console.log('Reset button pressed');
    const run = async () => {
      await Store.setItem('chat-history', JSON.stringify([]));
    };
    run();
  };
  return (
    <View style={{ flex: 1 }}>
      <TopBar eventHandler={eventHandler} />
      <ChatHistory chat={chat} />
      <Input setChat={setChat} />
    </View>
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
