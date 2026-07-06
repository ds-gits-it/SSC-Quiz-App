import styles from '@/style/chat/bot-bubble';
import { Text } from 'react-native';
export default function BotChatBubble({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Text style={styles.text}>{children}</Text>;
}
