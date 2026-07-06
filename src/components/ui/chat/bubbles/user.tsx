import styles from '@/style/chat/user-bubble';
import { Text } from 'react-native';
export default function UserChatBubble({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Text style={styles.text}>{children}</Text>;
}
