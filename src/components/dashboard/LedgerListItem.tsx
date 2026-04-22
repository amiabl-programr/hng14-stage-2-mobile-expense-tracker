import { Transaction } from '@app-types/transaction'
import { Colors } from '@constants/colors'
import { Spacing } from '@constants/spacing'
import { Typography } from '@constants/typography'
import { Ionicons } from '@expo/vector-icons'
import { CATEGORY_CONFIG } from '@utils/categoryConfig'
import { formatCurrency } from '@utils/formatCurrency'
import {
    formatTransactionDate,
    formatTransactionTime,
} from '@utils/formatDate'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  transaction: Transaction
}

export default function LedgerListItem({ transaction }: Props) {
  const config = CATEGORY_CONFIG[transaction.category]
  const isIncome = transaction.type === 'income'

  return (
    <View style={styles.row}>
      <View style={[styles.iconBox, { backgroundColor: config.background }]}>
        <Ionicons name={config.icon as any} size={18} color={config.color} />
      </View>

      <View style={styles.middle}>
        <Text style={styles.name} numberOfLines={1}>
          {transaction.notes || config.label}
        </Text>
        <Text style={styles.meta}>
          {config.label.toUpperCase()} • {formatTransactionTime(transaction.date)}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </Text>
        <Text style={styles.date}>
          {formatTransactionDate(transaction.date)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    gap: Spacing.md,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
  },
  name: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  meta: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 0.3,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    marginBottom: 2,
  },
  income: {
    color: Colors.green,
  },
  expense: {
    color: Colors.red,
  },
  date: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
})