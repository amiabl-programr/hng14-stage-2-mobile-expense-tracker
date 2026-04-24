import { useState, useEffect, useRef, useCallback } from 'react'
import {
  LivenessChallenge,
  VerificationStatus,
  getChallengeInstruction,
  getRandomChallenges,
} from '@services/livenessService'

const POSITION_DURATION = 2000
const CHALLENGE_DURATION = 3000
const SYSTEM_CHECK_DURATION = 1500
const MAX_ATTEMPTS = 3

export default function useLivenessVerification(onSuccess: () => void) {
  const challenges = useRef<LivenessChallenge[]>(getRandomChallenges())
  const challengeIndex = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const attemptCount = useRef(0)

  const [step, setStep] = useState<VerificationStatus>('POSITION_FACE')
  const [currentChallenge, setCurrentChallenge] = useState<LivenessChallenge>(
    challenges.current[0]
  )
  const [instruction, setInstruction] = useState('Position your face in the frame')
  const [isFaceObscured, setIsFaceObscured] = useState(false)

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const runNextChallenge = useCallback(() => {
    const idx = challengeIndex.current
    if (idx >= challenges.current.length) {
      setStep('SYSTEM_CHECK')
      setInstruction('Verifying identity...')
      timerRef.current = setTimeout(() => {
        setStep('SUCCESS')
        setTimeout(onSuccess, 600)
      }, SYSTEM_CHECK_DURATION)
      return
    }

    const challenge = challenges.current[idx]
    setCurrentChallenge(challenge)
    setInstruction(getChallengeInstruction(challenge))
    setStep('CHALLENGE')

    timerRef.current = setTimeout(() => {
      challengeIndex.current += 1
      runNextChallenge()
    }, CHALLENGE_DURATION)
  }, [onSuccess])

  const start = useCallback(() => {
    clearTimer()
    challengeIndex.current = 0
    challenges.current = getRandomChallenges()
    setStep('POSITION_FACE')
    setInstruction('Position your face in the frame')
    setIsFaceObscured(false)

    timerRef.current = setTimeout(() => {
      runNextChallenge()
    }, POSITION_DURATION)
  }, [runNextChallenge])

  const retry = useCallback(() => {
    if (attemptCount.current >= MAX_ATTEMPTS - 1) {
      setStep('FAILED')
      setInstruction('Verification failed. Please try again later.')
      return
    }
    attemptCount.current += 1
    start()
  }, [start])

  useEffect(() => {
    start()
    return clearTimer
  }, [])

  return {
    step,
    currentChallenge,
    instruction,
    isFaceObscured,
    retry,
  }
}