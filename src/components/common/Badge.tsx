import { BudgetStatus } from '@app-types/budget'
import { Colors } from '@constants/colors'
import { Spacing } from '@constants/spacing'
import { Typography } from '@constants/typography'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  status: BudgetStatus
}

const STATUS_CONFIG: Record<
  BudgetStatus,
  { label: string; color: string; background: string }
> = {
  HEALTHY: {
    label: 'HEALTHY',
    color: Colors.green,
    background: Colors.greenLight,
  },
  ON_TRACK: {
    label: 'ON TRACK',
    color: Colors.navyLight,
    background: Colors.blueLight,
  },
  AT_LIMIT: {
    label: 'AT LIMIT',
    color: Colors.orange,
    background: '#FFF7ED',
  },
  OVER_LIMIT: {
    label: 'OVER LIMIT',
    color: Colors.red,
    background: Colors.redLight,
  },
}

export default function Badge({ status }: Props) {
  const config = STATUS_CONFIG[status]
  return (
    <View style={[styles.badge, { backgroundColor: config.background }]}>
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.5,
  },
})