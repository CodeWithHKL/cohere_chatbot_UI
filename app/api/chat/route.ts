import { CohereClientV2 } from 'cohere-ai';
import { NextResponse } from 'next/server';

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    if (!message || message.length > 400) {
      return NextResponse.json(
        { reply: "SYSTEM_ERROR: INPUT_OVERLOAD. PLEASE LIMIT QUERY TO 400 CHARACTERS." }, 
        { status: 400 }
      );
    }
    
    const response = await cohere.chat({
      model: 'command-r7b-12-2024', 
      messages: [
        {
          role: 'system',
          content: "You are a chatbot for Universiti Tenaga Nasional (UNITEN), Malaysia; answer only UNITEN-related questions, and if unsure or out of scope, say you don’t know and do not fabricate information. UNITEN is a private universiti owned by TNB Tenaga Nasional Berhad. Answer with 100 words maximum, answer with less if possible."
        },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      maxTokens: 100,
    });

    // Safer extraction: Find the first content block that is a text type
    const content = response.message.content;
    let botReply = "ERROR: EMPTY RESPONSE FROM AI.";

    if (Array.isArray(content) && content.length > 0) {
      const textBlock = content.find(block => block.type === 'text');
      if (textBlock && 'text' in textBlock) {
        botReply = textBlock.text;
      }
    }

    return NextResponse.json({ reply: botReply });
  } catch (error) {
    console.error('Cohere API Error:', error);
    return NextResponse.json({ reply: "ERROR: NEURAL LINK INTERRUPTED." }, { status: 500 });
  }
}