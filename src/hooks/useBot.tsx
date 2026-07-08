import { useEffect, useRef, useState } from 'react';
import { Message, models, useLLM } from 'react-native-executorch';

export const useBot = () => {
  const [loading, setLoading] = useState(true);
  const llm = useLLM({ model: models.llm.qwen3_5_0_8b() });

  // Promise that resolves when model is ready
  const readyResolveRef = useRef<(() => void) | null>(null);
  const readyPromiseRef = useRef<Promise<void>>(
    new Promise((resolve) => {
      readyResolveRef.current = resolve;
    }),
  );

  // Load / warm the model when the hook initializes
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        if (typeof llm.load === 'function') {
          await llm.load();
        } else {
          // fallback: warm with a tiny generate call
          const warm: Message[] = [
            { role: 'system', content: 'Warm up' },
            { role: 'user', content: 'Hello' },
          ];
          await llm.generate(warm);
        }

        if (mounted) {
          setLoading(false);
          readyResolveRef.current?.();
          console.log('LLM loaded/warmed');
        }
      } catch (err) {
        console.warn('LLM load/warm failed', err);
        if (mounted) {
          setLoading(false);
          readyResolveRef.current?.();
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [llm]);

  const generateBotResponse = async (userMessage: string) => {
    // wait for model to be ready
    await readyPromiseRef.current;

    const chat: Message[] = [
      { role: 'system', content: 'You are a helpful assistant' },
      { role: 'user', content: userMessage },
    ];

    await llm.generate(chat);
    console.log('Qwen3.5 says:', llm.response);
    return llm.response ?? '';
  };

  return { generateBotResponse, loading };
};
