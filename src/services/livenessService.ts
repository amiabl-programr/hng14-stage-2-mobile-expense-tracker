import * as FaceDetector from 'expo-face-detector'

export interface FaceData {
  rollAngle: number
  yawAngle: number
  smilingProbability: number
  leftEyeOpenProbability: number
  rightEyeOpenProbability: number
}

export type LivenessChallenge = 'BLINK' | 'SMILE' | 'TURN_LEFT' | 'TURN_RIGHT'

export interface ChallengeResult {
  passed: boolean
  challenge: LivenessChallenge
}

// Thresholds
const BLINK_THRESHOLD = 0.3       // eye open probability below this = blinking
const SMILE_THRESHOLD = 0.7       // smiling probability above this = smiling
const TURN_THRESHOLD = 20         // yaw angle degrees for head turn

export const FACE_DETECTOR_OPTIONS: FaceDetector.DetectionOptions = {
  mode: FaceDetector.FaceDetectorMode.fast,
  detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
  runClassifications: FaceDetector.FaceDetectorClassifications.all,
  minDetectionInterval: 150,
  tracking: true,
}

export function isFaceCentered(face: FaceDetector.FaceFeature): boolean {
  const roll = Math.abs(face.rollAngle ?? 0)
  const yaw = Math.abs(face.yawAngle ?? 0)
  return roll < 15 && yaw < 15
}

export function isFaceObscured(face: FaceDetector.FaceFeature): boolean {
  return !isFaceCentered(face)
}

export function evaluateChallenge(
  face: FaceDetector.FaceFeature,
  challenge: LivenessChallenge
): boolean {
  const leftEye = face.leftEyeOpenProbability ?? 1
  const rightEye = face.rightEyeOpenProbability ?? 1
  const smiling = face.smilingProbability ?? 0
  const yaw = face.yawAngle ?? 0

  switch (challenge) {
    case 'BLINK':
      return leftEye < BLINK_THRESHOLD && rightEye < BLINK_THRESHOLD
    case 'SMILE':
      return smiling > SMILE_THRESHOLD
    case 'TURN_LEFT':
      return yaw > TURN_THRESHOLD
    case 'TURN_RIGHT':
      return yaw < -TURN_THRESHOLD
    default:
      return false
  }
}

export function getChallengeInstruction(challenge: LivenessChallenge): string {
  switch (challenge) {
    case 'BLINK':
      return 'Please blink now'
    case 'SMILE':
      return 'Please smile'
    case 'TURN_LEFT':
      return 'Turn your head left'
    case 'TURN_RIGHT':
      return 'Turn your head right'
  }
}

export function getRandomChallenge(): LivenessChallenge {
  const challenges: LivenessChallenge[] = ['BLINK', 'SMILE', 'TURN_LEFT', 'TURN_RIGHT']
  return challenges[Math.floor(Math.random() * challenges.length)]
}