import { Configuration, OpenAIApi } from 'openai';
import { AiPayClient, imageGeneration } from 'ai-pay';

export const dalle = async (prompt, key) => {
  const AiPaySessionId = AiPayClient.getInstance().getClientSessionId();

  if (AiPaySessionId) {
    const {
      error,
      data,
    } = await imageGeneration({
      prompt: `${prompt}`,
      imageModel: "dall-e-2",
      size: '512x512',
    });

    if (!data) {
      throw new Error(error);
    }
    return data.imageUrls[0]
  }

  const configuration = new Configuration({
    apiKey: key,
  });

  const openai = new OpenAIApi(configuration);
  const response = await openai.createImage({
    prompt: `${prompt}`,
    n: 1,
    size: '512x512',
  });

  return response.data.data[0].url;
};
