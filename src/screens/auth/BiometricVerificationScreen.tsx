import LivenessCameraView from "@components/auth/LivenessCameraView";
import useLivenessVerification from "@hooks/useLivenessVerification";

export default function BiometricVerificationScreen() {
  const {
    step,
    instruction,
    isFaceObscured,
    retry,
  } = useLivenessVerification(() => {
    // set auth on success
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
