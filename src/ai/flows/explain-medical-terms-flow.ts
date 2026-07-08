'use server';
/**
 * @fileOverview A Genkit flow for explaining complex medical terms found in a report.
 *
 * - explainMedicalTerms - A function that handles the explanation of medical terms.
 * - ExplainMedicalTermsInput - The input type for the explainMedicalTerms function.
 * - ExplainMedicalTermsOutput - The return type for the explainMedicalTerms function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExplainMedicalTermsInputSchema = z.object({
  medicalTerms: z.array(z.string()).describe('An array of complex medical terms found in a report.'),
});
export type ExplainMedicalTermsInput = z.infer<typeof ExplainMedicalTermsInputSchema>;

const MedicalTermExplanationSchema = z.object({
  term: z.string().describe('The medical term that was explained.'),
  definition: z.string().describe('A concise definition of the medical term.'),
  meaning: z.string().describe('The practical meaning or implication of the term in a medical context.'),
  whyImportant: z.string().describe('Explanation of why this term is important in understanding a medical report or condition.'),
  normalRange: z.string().describe('The typical or healthy range for this specific medical parameter, if applicable. State "N/A" if not applicable.'),
});

const ExplainMedicalTermsOutputSchema = z.object({
  explanations: z.array(MedicalTermExplanationSchema).describe('An array of detailed explanations for each medical term provided.'),
});
export type ExplainMedicalTermsOutput = z.infer<typeof ExplainMedicalTermsOutputSchema>;

export async function explainMedicalTerms(input: ExplainMedicalTermsInput): Promise<ExplainMedicalTermsOutput> {
  return explainMedicalTermsFlow(input);
}

const explainMedicalTermsPrompt = ai.definePrompt({
  name: 'explainMedicalTermsPrompt',
  input: { schema: ExplainMedicalTermsInputSchema },
  output: { schema: ExplainMedicalTermsOutputSchema },
  prompt: `You are an expert medical lexicographer. For each medical term provided, generate a detailed explanation including its definition, meaning, why it is important in a medical context, and its normal range (if applicable). If a normal range is not applicable for a term, state "N/A".

Return the output as a JSON object with a single field 'explanations', which is an array of objects. Each object in the array should have the following fields: 'term', 'definition', 'meaning', 'whyImportant', and 'normalRange'.

Medical Terms to explain:
{{#each medicalTerms}}
- {{this}}
{{/each}}

`,
});

const explainMedicalTermsFlow = ai.defineFlow(
  {
    name: 'explainMedicalTermsFlow',
    inputSchema: ExplainMedicalTermsInputSchema,
    outputSchema: ExplainMedicalTermsOutputSchema,
  },
  async (input) => {
    const { output } = await explainMedicalTermsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate explanations for medical terms.');
    }
    return output;
  }
);
