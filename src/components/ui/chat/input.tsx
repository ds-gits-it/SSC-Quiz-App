import { useBot } from '@/hooks/useBot';
import styles from '@/style/chat/input';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
export default function Input({ setChat }) {
  const [newMessage, setNewMessage] = useState('');
  const { generateBotResponse, loading, downloadProgress, isGenerating } =
    useBot();
  const handleUpdate = async () => {
    if (!newMessage.trim()) return;
    setChat((oldChat) => [...oldChat, { type: 'user', text: newMessage }]);
    try {
      const response = await generateBotResponse(newMessage);
      setChat((oldChat) => [...oldChat, { type: 'bot', text: response }]);
    } catch {
      console.log('Error generating bot response');
    }
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
      <View style={{ alignItems: 'center', marginRight: 8 }}>
        {loading ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ActivityIndicator size="small" />
            <Text style={{ marginLeft: 6, color: '#4B5563' }}>
              Loading model... {Math.round((downloadProgress || 0) * 100)}%
            </Text>
          </View>
        ) : isGenerating ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ActivityIndicator size="small" />
            <Text style={{ marginLeft: 6, color: '#4B5563' }}>
              Generating response...
            </Text>
          </View>
        ) : null}
      </View>

      <Pressable
        style={styles.button}
        accessibilityRole="button"
        onPress={handleUpdate}
        disabled={loading || isGenerating}
      >
        <View style={styles.arrow} />
      </Pressable>
    </View>
  );
}
