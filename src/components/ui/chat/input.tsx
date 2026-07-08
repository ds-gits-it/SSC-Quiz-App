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
  const { generateBotResponse, loading } = useBot();
  const [generating, setGenerating] = useState(false);
  const handleUpdate = async () => {
    if (!newMessage.trim()) return;
    setChat((oldChat) => [...oldChat, { type: 'user', text: newMessage }]);
    setGenerating(true);
    try {
      await generateBotResponse(newMessage);
    } finally {
      setGenerating(false);
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
              Loading model...
            </Text>
          </View>
        ) : generating ? (
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
        disabled={loading || generating}
      >
        <View style={styles.arrow} />
      </Pressable>
    </View>
  );
}
