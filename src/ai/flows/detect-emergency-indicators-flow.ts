'use server';
/**
 * @fileOverview A Genkit flow to detect potentially dangerous indicators in a medical report.
 *
 * - detectEmergencyIndicators - A function that processes medical report text to determine if an emergency warning is required.
 * - DetectEmergencyIndicatorsInput - The input type for the detectEmergencyIndicators function.
 * - DetectEmergencyIndicatorsOutput - The return type for the detectEmergencyIndicators function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectEmergencyIndicatorsInputSchema = z.object({
  reportText: z.string().describe('The full text content of the medical report.'),
});
export type DetectEmergencyIndicatorsInput = z.infer<typeof DetectEmergencyIndicatorsInputSchema>;

const DetectEmergencyIndicatorsOutputSchema = z.object({
  emergencyWarning: z.boolean().describe('True if the report contains findings requiring urgent medical attention, false otherwise.'),
});
export type DetectEmergencyIndicatorsOutput = z.infer<typeof DetectEmergencyIndicatorsOutputSchema>;

export async function detectEmergencyIndicators(input: DetectEmergencyIndicatorsInput): Promise<DetectEmergencyIndicatorsOutput> {
  return detectEmergencyIndicatorsFlow(input);
}

const detectEmergencyIndicatorsPrompt = ai.definePrompt({
  name: 'detectEmergencyIndicatorsPrompt',
  input: {schema: DetectEmergencyIndicatorsInputSchema},
  output: {schema: DetectEmergencyIndicatorsOutputSchema},
  prompt: `You are an AI assistant designed to identify potentially dangerous indicators in medical reports.
Your task is to review the provided medical report text and determine if it contains any findings that would typically require urgent medical attention.
Do NOT diagnose any condition. Do NOT offer medical advice or recommendations.
Simply evaluate if the text suggests an immediate need to consult a healthcare professional based on common medical urgency indicators (e.g., critical values, signs of acute conditions, or terms indicating severe findings).
The response MUST be a JSON object with a single boolean field 'emergencyWarning'.

Medical Report Text:
{{{reportText}}}`,
});

const detectEmergencyIndicatorsFlow = ai.defineFlow(
  {
    name: 'detectEmergencyIndicatorsFlow',
    inputSchema: DetectEmergencyIndicatorsInputSchema,
    outputSchema: DetectEmergencyIndicatorsOutputSchema,
  },
  async input => {
    const {output} = await detectEmergencyIndicatorsPrompt(input);
    if (!output) {
      throw new Error('Failed to get output from emergency indicators prompt.');
    }
    return output;
  }
);
