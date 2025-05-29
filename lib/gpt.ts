import OpenAI from 'openai';
import { ImageGenerateParams } from 'openai/resources';
import { realMerge } from 'utils';

let gpt: OpenAI | undefined;
try {
  gpt = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });
} catch (e) {
  console.log(`gpt init error: `, e);
}

/**
 *
 * make sure you are using paid Vercel plan ($20/mo) or other platforms like Heroku.
 * Vercel cuts requests after 10s timeout on free plan (UPDATE: can be increased in vercel.json up to 59s on FREE plan),
 * which is not enough
 * to get gpt response in some cases.
 * heroku does not have this timeout cuts, and costs $5-$7/mo.
 *
 */
export const generateJSONCompletions = async (prompt: string) => {
  const response = await gpt?.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    // model: 'gpt-4',
    // model: 'gpt-4-1106-preview',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt,
          },
        ],
      },
    ],
  });

  if (response?.choices?.[0]?.finish_reason !== 'stop') {
    throw new Error();
  }

  return response?.choices?.[0]?.message?.content
    ?.replaceAll('```json', '')
    .replaceAll('```', '') as string;
};

export const generateImages = async (params: ImageGenerateParams) => {
  if ([params.user, params.prompt].some(p => !p)) {
    throw new Error('generateImages: missing required params, see lib/gpt.ts');
  }

  const response = await gpt?.images.generate(
    realMerge(
      {
        model: 'dall-e-2', // dall-e-3,
        prompt: '',
        n: 1,
        response_format: 'b64_json',
        size: '512x512',
        style: 'vivid',
        user: '',
      } as ImageGenerateParams,
      params
    ) as ImageGenerateParams
  );

  return response;
};

export const generateEembedding = async (text: string) => {
  const response = await gpt?.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  return response?.data[0].embedding;
};

export const cosineSimilarity = (vecA: number[], vecB: number[]) => {
  return dotProduct(vecA, vecB) / (norm(vecA) * norm(vecB));
};

const norm = (vec: number[]) => {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
};

const dotProduct = (vecA: number[], vecB: number[]) => {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
};

export const analyzeImage = async (base64Image: string, prompt: string) => {
  if (!base64Image || !prompt) {
    throw new Error('Missing base64 image or prompt');
  }

  const response = await gpt?.chat.completions.create({
    model: 'gpt-4.1-mini',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt,
          },
          {
            type: 'image_url',
            image_url: {
              url: base64Image.includes('base64,')
                ? base64Image
                : `data:image/png;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });

  if (response?.choices?.[0]?.finish_reason !== 'stop') {
    throw new Error();
  }

  return response?.choices?.[0]?.message?.content
    ?.replaceAll('```json', '')
    .replaceAll('```', '') as string;
};

export default gpt;
