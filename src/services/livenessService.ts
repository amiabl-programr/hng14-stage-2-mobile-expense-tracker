export type LivenessChallenge = 'BLINK' | 'SMILE' | 'TURN_LEFT' | 'TURN_RIGHT'
export type VerificationStatus = 'POSITION_FACE' | 'CHALLENGE' | 'SYSTEM_CHECK' | 'SUCCESS' | 'FAILED'

export function getChallengeInstruction(challenge: LivenessChallenge): string {
  switch (challenge) {
    case 'BLINK':      return 'Please blink twice'
    case 'SMILE':      return 'Please smile naturally'
    case 'TURN_LEFT':  return 'Slowly turn your head left'
    case 'TURN_RIGHT': return 'Slowly turn your head right'
  }
}

export function getRandomChallenges(): LivenessChallenge[] {
  const all: LivenessChallenge[] = ['BLINK', 'SMILE', 'TURN_LEFT', 'TURN_RIGHT']
  return all.sort(() => Math.random() - 0.5).slice(0, 2)
}