
'use server';

import { summarizeVerifiedAssets } from '@/ai/flows/summarize-verified-assets';

/**
 * Calls the GenAI flow to summarize asset data.
 * @param assetData A string containing the financial data to be summarized.
 * @returns An object with the summary on success, or an error message on failure.
 */
export async function getSummary(assetData: string): Promise<{
  success: boolean;
  summary?: string;
  error?: string;
}> {
  if (!assetData) {
    return { success: false, error: 'Asset data cannot be empty.' };
  }

  try {
    const result = await summarizeVerifiedAssets({ assetData });
    return { success: true, summary: result.summary };
  } catch (error) {
    console.error('Error in getSummary server action:', error);
    return { success: false, error: 'Failed to generate summary due to a server error.' };
  }
}
