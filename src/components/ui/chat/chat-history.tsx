import styles from '@/style/chat/chat-history';
import { View } from 'react-native';
import BotChatBubble from './bubbles/bot';
import UserChatBubble from './bubbles/user';

export default function ChatHistory({ chat }) {
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
