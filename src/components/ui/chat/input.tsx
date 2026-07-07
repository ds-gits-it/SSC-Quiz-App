import styles from '@/style/chat/input';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
export default function Input({ setChat }) {
  const [newMessage, setNewMessage] = useState('');
  const handleUpdate = () => {
    setChat((oldChat) => [...oldChat, { type: 'user', text: newMessage }]);
    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your answer"
        placeholderTextColor="#9CA3AF"
        value={newMessage}
        onChangeText={setNewMessage}
      />
      <Pressable
        style={styles.button}
        accessibilityRole="button"
        onPress={handleUpdate}
      >
        <View style={styles.arrow} />
      </Pressable>
    </View>
  );
}
