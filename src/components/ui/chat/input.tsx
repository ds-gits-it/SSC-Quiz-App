import styles from '@/style/chat/input';
import { Pressable, TextInput, View } from 'react-native';

export default function Input() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your answer"
        placeholderTextColor="#9CA3AF"
      />
      <Pressable style={styles.button} accessibilityRole="button">
        <View style={styles.arrow} />
      </Pressable>
    </View>
  );
}
