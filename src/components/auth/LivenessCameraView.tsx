import { Colors } from '@constants/colors'
import { Spacing } from '@constants/spacing'
import { Typography } from '@constants/typography'
import { Ionicons } from '@expo/vector-icons'
import { VerificationStep } from '@hooks/useLivenessVerification'
import { FACE_DETECTOR_OPTIONS } from '@services/livenessService'
import { CameraView } from 'expo-camera'
import * as FaceDetector from 'expo-face-detector'
import { useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  onFacesDetected: (result: { faces: FaceDetector.FaceFeature[] }) => void
  instruction: string
  isFaceObscured: boolean
  isLightingOptimal: boolean
  step: VerificationStep
}

export default function LivenessCameraView({
  onFacesDetected,
  instruction,
  isFaceObscured,
  isLightingOptimal,
  step,
}: Props) {
  const cameraRef = useRef<CameraView>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isProcessing = useRef(false)

  useEffect(() => {
    // Poll every 300ms — take a picture and run face detection on it
    intervalRef.current = setInterval(async () => {
      if (!cameraRef.current || isProcessing.current) return
      isProcessing.current = true

      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.9,        // low quality — we only need face data, not a real photo
          base64: false,
          skipProcessing: true,
        })

        if (!photo?.uri) return

        const result = await FaceDetector.detectFacesAsync(
          photo.uri,
          FACE_DETECTOR_OPTIONS
        )

        onFacesDetected({ faces: result.faces })
      } catch {
        // camera not ready yet — ignore
      } finally {
        isProcessing.current = false
      }
    }, 300)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [onFacesDetected])

  return (
    <View style={styles.wrapper}>
      {/* Camera preview */}
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="front"
      />

      {/* Corner frame overlay */}
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
      {step === 'CHALLENGE' && (
        <View style={styles.instructionPill} pointerEvents="none">
          <Ionicons name="eye" size={16} color={Colors.navy} />
          <Text style={styles.instructionText}>{instruction}</Text>
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
})