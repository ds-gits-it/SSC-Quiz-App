import Store from '@/store';
import styles from '@/style/chat/chat-history';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import BotChatBubble from './bubbles/bot';
import UserChatBubble from './bubbles/user';

export default function ChatHistory() {
  const [chat, setChat] = useState([]);
  useEffect(async () => {
    const rawChatHistory = await Store.getItem('chat-history');
    const chatHistory = JSON.parse(rawChatHistory) || [];
    setChat(chatHistory);
    return () => setChat([]);
  }, []);
  console.log(chat);
  return (
    <View style={styles.container}>
      <View id="chat-container" style={styles.chatContainer}>
        {chat.map((message, index) =>
          message.type === 'bot' ? (
            <BotChatBubble key={index}>{message.text}</BotChatBubble>
          ) : (
            <UserChatBubble key={index}>{message.text}</UserChatBubble>
          ),
        )}
      </View>
    </View>
  );
}
