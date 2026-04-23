import {
    LivenessChallenge,
    evaluateChallenge,
    getChallengeInstruction,
    getRandomChallenge,
    isFaceCentered,
} from '@services/livenessService'
import * as FaceDetector from 'expo-face-detector'
import { useCallback, useRef, useState } from 'react'

export type VerificationStep = 'POSITION_FACE' | 'CHALLENGE' | 'SYSTEM_CHECK' | 'SUCCESS' | 'FAILED'

interface LivenessState {
  step: VerificationStep
  challenge: LivenessChallenge
  instruction: string
  isFaceDetected: boolean
  isFaceObscured: boolean
  isLightingOptimal: boolean
  attemptCount: number
}

const MAX_ATTEMPTS = 3

export default function useLivenessVerification(onSuccess: () => void) {
  const challenge = useRef<LivenessChallenge>(getRandomChallenge())
  const challengePassed = useRef(false)

  const [state, setState] = useState<LivenessState>({
    step: 'POSITION_FACE',
    challenge: challenge.current,
    instruction: getChallengeInstruction(challenge.current),
    isFaceDetected: false,
    isFaceObscured: false,
    isLightingOptimal: true,
    attemptCount: 0,
  })

  const handleFacesDetected = useCallback(
    ({ faces }: { faces: FaceDetector.FaceFeature[] }) => {
      if (challengePassed.current) return

      // No face detected
      if (faces.length === 0) {
        setState((prev) => ({
          ...prev,
          isFaceDetected: false,
          isFaceObscured: false,
        }))
        return
      }

      const face = faces[0]
      const centered = isFaceCentered(face)

      setState((prev) => ({
        ...prev,
        isFaceDetected: true,
        isFaceObscured: !centered,
      }))

      // Step 1 — wait for face to be centered before starting challenge
      if (state.step === 'POSITION_FACE' && centered) {
        setState((prev) => ({ ...prev, step: 'CHALLENGE' }))
        return
      }

      // Step 2 — evaluate challenge
      if (state.step === 'CHALLENGE' && centered) {
        const passed = evaluateChallenge(face, challenge.current)
        if (passed) {
          challengePassed.current = true
          setState((prev) => ({ ...prev, step: 'SYSTEM_CHECK' }))

          // simulate system check then succeed
          setTimeout(() => {
            setState((prev) => ({ ...prev, step: 'SUCCESS' }))
            setTimeout(onSuccess, 800)
          }, 1500)
        }
      }
    },
    [state.step, onSuccess]
  )

  const retry = useCallback(() => {
    if (state.attemptCount >= MAX_ATTEMPTS - 1) {
      setState((prev) => ({ ...prev, step: 'FAILED' }))
      return
    }
    challengePassed.current = false
    challenge.current = getRandomChallenge()
    setState({
      step: 'POSITION_FACE',
      challenge: challenge.current,
      instruction: getChallengeInstruction(challenge.current),
      isFaceDetected: false,
      isFaceObscured: false,
      isLightingOptimal: true,
      attemptCount: state.attemptCount + 1,
    })
  }, [state.attemptCount])

  return {
    ...state,
    handleFacesDetected,
    retry,
  }
}
