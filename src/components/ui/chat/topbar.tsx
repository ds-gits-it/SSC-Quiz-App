import styles from '@/style/chat/topbar';
import { Pressable, Text, View } from 'react-native';

export default function TopBar({ eventHandler }: { eventHandler: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat UI</Text>
      <View style={styles.spacer} />
      <Pressable
        style={styles.resetButton}
        accessibilityRole="button"
        onPress={eventHandler}
      >
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>
    </View>
  );
}
