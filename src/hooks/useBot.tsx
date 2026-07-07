import { Message, models, useLLM } from 'react-native-executorch';

export const useBot = async (userMessage: string) => {
  const botMessage: string = '';
  const llm = useLLM({ model: models.llm.qwen3_5_0_8b() });
  const chat: Message[] = [
    { role: 'system', content: 'You are a helpful assistant' },
    { role: 'user', content: userMessage },
  ];

  await llm.generate(chat);
  console.log('Qwen3.5 says:', llm.response);
  //process with executorch
  return botMessage;
};
