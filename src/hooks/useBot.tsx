import { useEffect, useState } from 'react';
import {
  initExecutorch,
  Message,
  models,
  useLLM,
} from 'react-native-executorch';
import { ExpoResourceFetcher } from 'react-native-executorch-expo-resource-fetcher';

export const useBot = () => {
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const llm = useLLM({ model: models.llm.qwen3_5_0_8b() });

  // start load/download when the hook initializes
  useEffect(() => {
    if (typeof initExecutorch === 'function') {
      // already initialized above, safe to call again
      try {
        initExecutorch({ resourceFetcher: ExpoResourceFetcher });
      } catch (e) {
        // ignore if already initialized
      }
    }

    if (typeof llm.load === 'function') {
      // trigger async load/download
      llm.load().catch((err: any) => console.warn('llm.load failed', err));
    }
  }, [llm]);

  // poll LLM state (downloadProgress, isReady, isGenerating)
  useEffect(() => {
    let mounted = true;
    const iv = setInterval(() => {
      try {
        if (!mounted) return;
        const dp =
          typeof llm.downloadProgress === 'number' ? llm.downloadProgress : 0;
        const ready = !!llm.isReady;
        const gen = !!llm.isGenerating;
        setDownloadProgress(dp);
        setIsReady(ready);
        setIsGenerating(gen);
      } catch (err) {
        // ignore polling errors
      }
    }, 200);

    // run once immediately
    try {
      const dp =
        typeof llm.downloadProgress === 'number' ? llm.downloadProgress : 0;
      const ready = !!llm.isReady;
      const gen = !!llm.isGenerating;
      setDownloadProgress(dp);
      setIsReady(ready);
      setIsGenerating(gen);
    } catch (err) {
      /* ignore */
    }

    return () => {
      mounted = false;
      clearInterval(iv);
    };
  }, [llm]);

  const waitForReady = async () => {
    if (llm.isReady) return;
    await new Promise<void>((resolve) => {
      const iv = setInterval(() => {
        if (llm.isReady) {
          clearInterval(iv);
          resolve();
        }
      }, 200);
    });
  };

  const generateBotResponse = async (userMessage: string) => {
    // wait for model to be ready
    await waitForReady();

    const chat: Message[] = [
      { role: 'system', content: 'You are a helpful assistant' },
      { role: 'user', content: userMessage },
    ];

    await llm.generate(chat);
    console.log('Prompt:', userMessage);
    console.log('Qwen3.5 says:', llm.response);
    return llm.response ?? '';
  };

  return {
    generateBotResponse,
    loading: !isReady,
    downloadProgress,
    isReady,
    isGenerating,
  };
};
