import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@constants/colors'
import { Typography } from '@constants/typography'
import { Spacing } from '@constants/spacing'
import { VerificationStep } from '@hooks/useLivenessVerification'

interface Step {
  key: VerificationStep
  label: string
  description: string
}

const STEPS: Step[] = [
  {
    key: 'POSITION_FACE',
    label: 'Position Face',
    description: 'Align your head within the square and stay still.',
  },
  {
    key: 'CHALLENGE',
    label: 'Follow Prompts',
    description: 'Blink or smile when requested to verify liveness.',
  },
  {
    key: 'SYSTEM_CHECK',
    label: 'System Check',
    description: 'Encryption and validity cross-reference.',
  },
]

const STEP_ORDER: VerificationStep[] = ['POSITION_FACE', 'CHALLENGE', 'SYSTEM_CHECK']

interface Props {
  currentStep: VerificationStep
}

export default function VerificationStepList({ currentStep }: Props) {
  const currentIndex = STEP_ORDER.indexOf(currentStep)

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verification Steps</Text>
      {STEPS.map((step, index) => {
        const isDone = currentIndex > index
        const isActive = currentIndex === index
        const isPending = currentIndex < index

        return (
          <View key={step.key} style={styles.row}>
            <View
              style={[
                styles.indicator,
                isDone && styles.indicatorDone,
                isActive && styles.indicatorActive,
                isPending && styles.indicatorPending,
              ]}
            >
              {isDone ? (
                <Ionicons name="checkmark" size={14} color={Colors.white} />
              ) : (
                <Text
                  style={[
                    styles.indexText,
                    isActive && styles.indexTextActive,
                  ]}
                >
                  {index + 1}
                </Text>
              )}
            </View>

            <View style={styles.textBlock}>
              <Text
                style={[
                  styles.label,
                  isPending && styles.labelPending,
                ]}
              >
                {step.label}
              </Text>
              <Text
                style={[
                  styles.description,
                  isPending && styles.descriptionPending,
                ]}
              >
                {step.description}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.base,
    gap: Spacing.md,
  },
  heading: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.navyLight,
    marginBottom: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  indicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  indicatorDone: {
    backgroundColor: Colors.green,
  },
  indicatorActive: {
    backgroundColor: Colors.navy,
  },
  indicatorPending: {
    backgroundColor: Colors.divider,
  },
  indexText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.textMuted,
  },
  indexTextActive: {
    color: Colors.white,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  labelPending: {
    color: Colors.textMuted,
  },
  description: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  descriptionPending: {
    color: Colors.textMuted,
  },
})