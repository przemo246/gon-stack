import Anthropic from '@anthropic-ai/sdk';
import { schema } from '@schemas/event-suggest-keywords';
import { InternalServer } from '../../core/error-handling';
import { withZodSchema } from '../../adapter/zod';
import { privateProcedure } from '../../core/procedure';

export const eventSuggestKeywords = privateProcedure({
  schema: withZodSchema({ schema }),
})({
  handler: async (input) => {
    const apiKey = import.meta.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new InternalServer('LLM not configured');

    const client = new Anthropic({ apiKey });

    const contextParts = [
      `Event name: ${input.name}`,
      `Category: ${input.category}`,
      input.description ? `Description: ${input.description}` : null,
      input.address ? `Location: ${input.address}` : null,
    ].filter(Boolean);

    let message;
    try {
      message = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Generate 5–10 short, searchable keywords (single words or two-word phrases) for the following event. Return only a JSON array of strings, nothing else.\n\n${contextParts.join('\n')}`,
              },
            ],
          },
        ],
      });
    } catch {
      throw new InternalServer('LLM call failed');
    }

    const text = message.content.find((b) => b.type === 'text')?.text ?? '[]';

    let suggestions: string[];
    try {
      const parsed: unknown = JSON.parse(text);
      if (!Array.isArray(parsed)) throw new Error();
      suggestions = parsed.filter((s): s is string => typeof s === 'string');
    } catch {
      throw new InternalServer('Failed to parse LLM response');
    }

    return { code: 200 as const, suggestions };
  },
});
