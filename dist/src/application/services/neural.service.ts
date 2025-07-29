import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import { createInterface } from 'readline';

@Injectable()
export class NeuralService {
  constructor(private configService: ConfigService) {}

  async getAnswerStream(
    prompt: string,
    onChunk: (chunk: string, isEnd: boolean) => Promise<void> | void,
  ): Promise<void> {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    const model = this.configService.get<string>('OPENAI_MODEL') ?? 'openai/gpt-4.o';
    const maxTokens = parseInt(this.configService.get<string>('MAX_TOKENS') || '500');
    const referer = 'http://localhost:3000';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': referer,
        'X-Title': 'TIKEE Neural',
      },
      body: JSON.stringify({
        model,
        stream: true,
        max_tokens: maxTokens,
        messages: [
          { role: 'system', content: 'Eres un asistente util' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      console.error('❌ Error en respuesta streaming:', errorText);
      throw new InternalServerErrorException('Error en stream IA');
    }

    const rl = createInterface({
      input: response.body as NodeJS.ReadableStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const trimmed = line.trim();
      if (trimmed === '' || trimmed === 'data: [DONE]') {
        await onChunk('', true);
        break;
      }

      if (!trimmed.startsWith('data: ')) continue;

      const json = trimmed.replace(/^data: /, '');
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          console.log('[STREAM-CHUNK]', content); // prueba
          await onChunk(content, false);
        }
      } catch (err) {
        console.error('❌ Error parseando chunk:', err);
      }
    }
  }

  async getAnswer(prompt: string): Promise<string> {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    const model = this.configService.get<string>('OPENAI_MODEL') ?? 'openai/gpt 0';
    const maxTokens = parseInt(this.configService.get<string>('MAX_TOKENS') || '500');
    const referer = 'http://localhost:3000';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': referer,
        'X-Title': 'TIKEE Neural',
      },
      body: JSON.stringify({
        model,
        stream: false,
        max_tokens: maxTokens,
        messages: [
          { role: 'system', content: 'Eres un asistente util' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error en respuesta directa:', errorText);
      throw new InternalServerErrorException('Error al obtener respuesta de la IA');
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    return answer?.trim() ?? '❌ No se obtuvo respuesta';
  }
}
