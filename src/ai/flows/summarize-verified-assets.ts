'use server';

/**
 * @fileOverview A flow that uses a generative AI tool to summarize verified assets and financial transactions.
 *
 * - summarizeVerifiedAssets - A function that handles the summarization process.
 * - SummarizeVerifiedAssetsInput - The input type for the summarizeVerifiedAssets function.
 * - SummarizeVerifiedAssetsOutput - The return type for the summarizeVerifiedAssets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeVerifiedAssetsInputSchema = z.object({
  assetData: z.string().describe('A string containing verified asset data and financial transactions for an individual or organization.'),
});
export type SummarizeVerifiedAssetsInput = z.infer<typeof SummarizeVerifiedAssetsInputSchema>;

const SummarizeVerifiedAssetsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the verified assets and financial transactions, highlighting key information relevant to assessing financial health.'),
});
export type SummarizeVerifiedAssetsOutput = z.infer<typeof SummarizeVerifiedAssetsOutputSchema>;

export async function summarizeVerifiedAssets(input: SummarizeVerifiedAssetsInput): Promise<SummarizeVerifiedAssetsOutput> {
  return summarizeVerifiedAssetsFlow(input);
}

const summarizeVerifiedAssetsPrompt = ai.definePrompt({
  name: 'summarizeVerifiedAssetsPrompt',
  input: {schema: SummarizeVerifiedAssetsInputSchema},
  output: {schema: SummarizeVerifiedAssetsOutputSchema},
  prompt: `You are an expert financial analyst tasked with summarizing verified assets and financial transactions for risk assessment.

  Given the following asset data and financial transactions, provide a concise summary that highlights key information relevant to assessing the financial health of the individual or organization.
  Prioritize information that indicates financial stability, potential risks, and overall creditworthiness.

  Asset Data and Transactions:
  {{assetData}}
  `,
});

const summarizeVerifiedAssetsFlow = ai.defineFlow(
  {
    name: 'summarizeVerifiedAssetsFlow',
    inputSchema: SummarizeVerifiedAssetsInputSchema,
    outputSchema: SummarizeVerifiedAssetsOutputSchema,
  },
  async input => {
    const {output} = await summarizeVerifiedAssetsPrompt(input);
    return output!;
  }
);
