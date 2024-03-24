import { ConversationChain } from 'langchain/chains';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
} from 'langchain/prompts';
import { BufferMemory } from 'langchain/memory';
import { AiPayClient } from 'ai-pay';

const memory = new BufferMemory({
  returnMessages: true,
  memoryKey: 'history',
});

export const davinci = async (prompt, key, gptVersion) => {
  const chatPrompt = ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(
      'The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context and always responds in markdown format. If the AI does not know the answer to a question, it truthfully says it does not know.'
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
  ]);

  const aiPaySessionId = AiPayClient.getInstance().getClientSessionId();

  const model = new ChatOpenAI(aiPaySessionId ? {
    openAIApiKey: aiPaySessionId,
    model: gptVersion,
    temperature: 0.3,
    configuration: {
      baseURL: 'https://api.joinaipay.com/api/openai-compatible'
    }
  } : {
    openAIApiKey: key,
    model: gptVersion,
    temperature: 0.3,
  });

  const chain = new ConversationChain({
    memory: memory,
    prompt: chatPrompt,
    llm: model,
  });

  const response = await chain.call({ input: prompt });
  console.log(response);

  return response.response;
};
