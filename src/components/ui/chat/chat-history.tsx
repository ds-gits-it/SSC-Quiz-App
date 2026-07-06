import styles from '@/style/chat/chat-history';
import { View } from 'react-native';
import BotChatBubble from './bubbles/bot';
import UserChatBubble from './bubbles/user';

const chat = [
  { type: 'bot', text: 'Hello, how can I help you today?' },
  { type: 'user', text: 'I have a question about the quiz.' },
];

export default function ChatHistory() {
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
