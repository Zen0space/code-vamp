import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
import { verify } from '../utils/verify'

interface WorldIDVerificationProps {
  onSuccess?: (result: ISuccessResult) => void;
  onError?: (error: Error | string) => void;
}

export default function WorldIDVerification({ onSuccess, onError }: WorldIDVerificationProps) {
  const handleVerify = async (proof: ISuccessResult) => {
    try {
      const response = await verify(proof);
      if (response.success) {
        console.log('World ID verification successful!');
        onSuccess?.(proof);
      } else {
        console.error('World ID verification failed:', response.error);
        onError?.(typeof response.error === 'string' ? response.error : 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      onError?.(error instanceof Error ? error : String(error));
    }
  };

  return (
    <IDKitWidget
      app_id={process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`} // Your app ID from Developer Portal
      action={process.env.NEXT_PUBLIC_WLD_ACTION!} // Your action identifier
      onSuccess={onSuccess || (() => {})}
      handleVerify={handleVerify}
      verification_level={VerificationLevel.Orb} // or VerificationLevel.Device for testing
    >
      {({ open }) => (
        <button 
          onClick={open}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Verify with World ID
        </button>
      )}
    </IDKitWidget>
  );
} 