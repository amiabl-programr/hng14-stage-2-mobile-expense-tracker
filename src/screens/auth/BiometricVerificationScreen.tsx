import LivenessCameraView from "@components/auth/LivenessCameraView";
import useLivenessVerification from "@hooks/useLivenessVerification";
import useAuthStore from '@store/useAuthStore';

export default function BiometricVerificationScreen() {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated)
  const {
    step,
    instruction,
    isFaceObscured,
    retry,
  } = useLivenessVerification(() => {
    setAuthenticated(true);
  })
  return (
      <LivenessCameraView
        instruction={instruction}
        isFaceObscured={isFaceObscured}
        isLightingOptimal={true}
        step={step}
      />

  )
}
