import ChatHistory from '@/components/ui/chat/chat-history';
import Input from '@/components/ui/chat/input';
import TopBar from '@/components/ui/chat/topbar';
import { View } from 'react-native';

export default function ChatUI() {
  const eventHandler = () => {
    console.log('Reset button pressed');
  };
  return (
    <View>
      {/* <Text>Chat UI</Text> */}
      <TopBar eventHandler={eventHandler} />
      <ChatHistory />
      <Input />
    </View>
  );
}
