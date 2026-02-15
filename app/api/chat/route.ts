import { CohereClientV2 } from 'cohere-ai';
import { NextResponse } from 'next/server';

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }));

    const response = await cohere.chat({
      // UPDATE THIS LINE BELOW
      model: 'command-a-03-2025', 
      messages: [
        {
          role: 'system',
          content: "You are a Manchester City chatbot. Do answer and response to questions about Man City, if things out of context then tell them you dont know."
        },
        ...formattedHistory,
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      maxTokens: 200,
    });

    const botReply = response.message.content[0].text;
    return NextResponse.json({ reply: botReply });
  } catch (error) {
    console.error('Cohere API Error:', error);
    // This will help you see the specific error in your terminal if it happens again
    return NextResponse.json({ reply: "ERROR: NEURAL LINK INTERRUPTED." }, { status: 500 });
  }
}