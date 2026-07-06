import styles from '@/style/chat/chat-history';
import { View } from 'react-native';
import BotChatBubble from './bubbles/bot';
import UserChatBubble from './bubbles/user';

export default function ChatHistory() {
  return (
    <View style={styles.container}>
      <BotChatBubble>
        Added a simple chat topbar in topbar.tsx with a right-aligned Reset
        button. I also fixed index.tsx so the chat input comes from the correct
        component file instead of the topbar module.
      </BotChatBubble>
      <UserChatBubble>
        Added a simple chat topbar in topbar.tsx with a right-aligned Reset
        button. I also fixed index.tsx so the chat input comes from the correct
        component file instead of the topbar module.
      </UserChatBubble>
    </View>
  );
}
