import { ChatMessage } from '../types';

interface ChatResponse {
  message: string;
  error?: string;
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyD_xYEu6DZ2JNEMx4PDttp-5PSV_pFbk_A';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function sendChatMessage(messages: ChatMessage[]): Promise<ChatResponse> {
  const systemPrompt = `You are Roxone AI, a friendly and knowledgeable digital marketing assistant developed by Mr. Prabal Jaat. You specialize in:

- Digital marketing strategies and best practices
- Meta (Facebook/Instagram) advertising optimization
- Social media marketing campaigns
- ROI analysis and performance tracking
- Creative content suggestions
- Audience targeting strategies

Always provide helpful, actionable advice in a conversational tone. Use emojis appropriately and format your responses with clear headings and bullet points when helpful.`;

  try {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const conversationContext = messages.slice(-5).map(msg =>
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n\n');

    const lastMessage = messages[messages.length - 1];
    const fullPrompt = `${systemPrompt}

Recent conversation:
${conversationContext}

Current question: ${lastMessage?.content || ''}

Please provide a helpful response as Roxone AI.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response from Gemini API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    return { message: generatedText };

  } catch (error) {
    console.error('Chat API error:', error);

    const fallbackMessage = "# Connection Issue\n\nI'm sorry, but I'm having trouble connecting right now. Please try again in a moment.";

    return {
      message: fallbackMessage,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}