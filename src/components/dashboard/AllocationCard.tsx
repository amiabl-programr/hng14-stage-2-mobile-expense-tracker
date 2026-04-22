import { Allocation } from '@app-types/budget'
import ProgressBar from '@components/common/ProgressBar'
import { Colors } from '@constants/colors'
import { Spacing } from '@constants/spacing'
import { Typography } from '@constants/typography'
import { Ionicons } from '@expo/vector-icons'
import { CATEGORY_CONFIG } from '@utils/categoryConfig'
import { formatCurrency } from '@utils/formatCurrency'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  allocation: Allocation
}

export default function AllocationCard({ allocation }: Props) {
  const config = CATEGORY_CONFIG[allocation.category]
  const percent = (allocation.spent / allocation.limit) * 100
  const remaining = allocation.limit - allocation.spent
  const isOver = remaining < 0

  return (
    <View style={styles.card}>
      <Ionicons
        name={config.icon as any}
        size={20}
        color={Colors.navyLight}
      />
      <Text style={styles.label}>{config.label}</Text>
      <Text style={styles.amount}>{formatCurrency(allocation.spent)}</Text>
      <ProgressBar percent={percent} height={4} />
      <Text style={[styles.remaining, isOver && styles.over]}>
        {isOver
          ? `$${Math.abs(remaining).toFixed(0)} OVER`
          : `$${remaining.toFixed(0)} LEFT`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.md,
    width: 110,
    gap: Spacing.xs,
  },
  label: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  amount: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  remaining: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
  },
  over: {
    color: Colors.red,
  },
})