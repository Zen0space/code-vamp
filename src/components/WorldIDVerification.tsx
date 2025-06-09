import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
import { verify } from '../api/verify'
import { useVerification } from '../utils/VerificationContext'

const WorldIDVerification = () => {
  const { setVerified } = useVerification()

  const handleVerify = async (proof: ISuccessResult) => {
    const result = await verify(proof)
    if (result.success) {
      console.log('Verification successful!')
      return Promise.resolve()
    } else {
      throw new Error('Verification failed')
    }
  }

  const handleSuccess = (result: ISuccessResult) => {
    console.log('World ID verification successful:', result)
    setVerified(result)
  }

  const onError = (error: any) => {
    console.error('World ID verification error:', error)
  }

  return (
    <IDKitWidget
      app_id={import.meta.env.VITE_PUBLIC_WLD_APP_ID as `app_${string}`} // Your app ID from Developer Portal
      action={import.meta.env.VITE_PUBLIC_WLD_ACTION!} // Your action identifier
      onSuccess={handleSuccess}
      handleVerify={handleVerify}
      verification_level={VerificationLevel.Device}
      onError={onError}
    >
      {({ open }) => (
        <button 
          onClick={open}
          className="bg-red-gradient text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-md hover:shadow-red-500/25"
        >
          Sign in with World ID
        </button>
      )}
    </IDKitWidget>
  )
}

export default WorldIDVerification 