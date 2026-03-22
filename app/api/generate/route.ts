import OpenAI from 'openai';
const client = new OpenAI({ baseURL: 'https://api.deepseek.com/v1', apiKey: process.env.DEEPSEEK_API_KEY });

export async function POST(req: Request) {
  const { name, industry } = await req.json();
  const completion = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: `Analyze this business name: "${name}" for a ${industry} company. Check: domain availability guess, trademark risk, memorability, pronunciation, online presence. Provide a score 1-10 and brief analysis.` }],
    temperature: 0.3, max_tokens: 1000,
  });
  return Response.json({ analysis: completion.choices[0].message.content });
}
