import { ISuccessResult } from '@worldcoin/idkit'

export async function verify(proof: ISuccessResult) {
  try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proof),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Verification failed:', error);
    return { success: false, error };
  }
} 