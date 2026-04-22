import { formatCurrency } from '@/src/utils/formatCurrency';
import { Colors } from '@constants/colors';
import { Spacing } from '@constants/spacing';
import { Typography } from '@constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface Props{
    balance: number
    changePercent: number
    onDeposit: ()=> void
    onWithdraw: ()=> void
}


export default function PortfolioCard({
    balance,
    changePercent,
    onDeposit,
    onWithdraw,
} : Props) {

    const isPositive = changePercent > 0;

    return (
        <View style={styles.card}>
            <Text style={styles.label}>LIQUID WEALTH PORTFOLIO</Text>
            
      <View style={styles.changeRow}>
        <Ionicons
          name={isPositive ? 'trending-up' : 'trending-down'}
          size={14}
          color={Colors.green}
        />
        <Text style={styles.changeText}>
          {isPositive ? '+' : ''}{changePercent}%
        </Text>
      </View>

        <Text style={styles.balance}>{formatCurrency(balance)}</Text>
      <Text style={styles.subLabel}>Market valuation as of today</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={onDeposit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>DEPOSIT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={onWithdraw}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>WITHDRAW</Text>
        </TouchableOpacity>
      </View>

        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.navy,
    borderRadius: 20,
    padding: Spacing.xl,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.sm,
  },
  label: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.xs,
  },
  changeText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.chartGreen,
  },
  balance: {
    fontSize: Typography.sizes['5xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.white,
    letterSpacing: -1,
    marginBottom: 4,
  },
  subLabel: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.5)',
    fontStyle: 'italic',
    marginBottom: Spacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    letterSpacing: 1,
  },
})
