import { useBot } from '@/hooks/useBot';
import styles from '@/style/chat/input';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
export default async function Input({ setChat }) {
  const [newMessage, setNewMessage] = useState('');
  const generateBotResponse = useBot();
  const handleUpdate = async () => {
    setChat((oldChat) => [...oldChat, { type: 'user', text: newMessage }]);
    await generateBotResponse(newMessage);
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
