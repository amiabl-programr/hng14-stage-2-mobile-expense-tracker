import { Colors } from '@constants/colors'
import { Spacing } from '@constants/spacing'
import { Typography } from '@constants/typography'
import { Ionicons } from '@expo/vector-icons'
import { VerificationStatus } from '@services/livenessService'
import { StyleSheet, Text, View } from 'react-native'
import { Camera, useCameraDevice } from 'react-native-vision-camera'

interface Props {
  instruction: string
  isFaceObscured: boolean
  isLightingOptimal: boolean
  step: VerificationStatus
}

export default function LivenessCameraView({
  instruction,
  isFaceObscured,
  isLightingOptimal,
  step,
}: Props) {
  const device = useCameraDevice('front')

  if (!device) {
    return (
      <View style={[styles.wrapper, styles.noCamera]}>
        <Ionicons name="camera-outline" size={40} color={Colors.textMuted} />
        <Text style={styles.noCameraText}>Camera unavailable</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />

      {/* Corner frame */}
      <View style={styles.frameWrapper} pointerEvents="none">
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      {/* Status badges */}
      <View style={styles.statusRow} pointerEvents="none">
        <View style={styles.statusBadge}>
          <Ionicons
            name={isLightingOptimal ? 'sunny' : 'warning'}
            size={12}
            color={isLightingOptimal ? Colors.green : Colors.orange}
          />
          <Text
            style={[
              styles.statusText,
              { color: isLightingOptimal ? Colors.green : Colors.orange },
            ]}
          >
            {isLightingOptimal ? 'Lighting conditions optimal' : 'Poor lighting'}
          </Text>
        </View>

        {isFaceObscured && (
          <View style={[styles.statusBadge, styles.warnBadge]}>
            <Ionicons name="warning" size={12} color={Colors.red} />
            <Text style={[styles.statusText, { color: Colors.red }]}>
              Face partially obscured
            </Text>
          </View>
        )}
      </View>

      {/* Instruction pill */}
      {(step === 'CHALLENGE' || step === 'POSITION_FACE') && (
        <View style={styles.instructionPill} pointerEvents="none">
          <Ionicons
            name={step === 'POSITION_FACE' ? 'person-outline' : 'eye'}
            size={16}
            color={Colors.navy}
          />
          <Text style={styles.instructionText}>{instruction}</Text>
        </View>
      )}

      {/* System check overlay */}
      {step === 'SYSTEM_CHECK' && (
        <View style={styles.systemCheckOverlay} pointerEvents="none">
          <Ionicons name="shield-checkmark" size={40} color={Colors.white} />
          <Text style={styles.systemCheckText}>Verifying...</Text>
        </View>
      )}
    </View>
  )
}

const CORNER_SIZE = 28
const CORNER_THICKNESS = 3

const styles = StyleSheet.create({
  wrapper: {
    height: 320,
    marginHorizontal: Spacing.base,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.textPrimary,
  },
  noCamera: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  noCameraText: {
    fontSize: Typography.sizes.base,
    color: Colors.textMuted,
  },
  frameWrapper: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    bottom: 70,
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: Colors.green,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderTopLeftRadius: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderTopRightRadius: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderBottomLeftRadius: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderBottomRightRadius: 4,
  },
  statusRow: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    gap: Spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  warnBadge: {
    marginTop: 4,
  },
  statusText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  instructionPill: {
    position: 'absolute',
    bottom: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingVertical: Spacing.md,
    borderRadius: 14,
  },
  instructionText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.navy,
  },
  systemCheckOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,33,89,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  systemCheckText: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
})