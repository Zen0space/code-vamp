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
          className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/30 border border-red-500/50"
        >
          <span className="relative z-10 flex items-center">
            <span className="mr-2">🌍</span>
            Verify with World ID
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
      )}
    </IDKitWidget>
  )
}

export default WorldIDVerification 