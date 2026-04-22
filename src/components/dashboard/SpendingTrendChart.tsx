import { Colors } from '@constants/colors'
import { Spacing } from '@constants/spacing'
import { Typography } from '@constants/typography'
import { StyleSheet, Text, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'

interface Props {
  startDate: string
  endDate: string
  data: { value: number }[]
}

export default function SpendingTrendChart({
  startDate,
  endDate,
  data,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Spending Trend</Text>
          <Text style={styles.subtitle}>
            {startDate} – {endDate}
          </Text>
        </View>
      </View>

      <LineChart
        data={data}
        width={260}
        height={120}
        color={Colors.navyLight}
        thickness={2.5}
        hideDataPoints
        curved
        areaChart
        startFillColor={Colors.navyLight}
        endFillColor="rgba(30,58,138,0.02)"
        startOpacity={0.15}
        endOpacity={0.01}
        hideYAxisText
        hideAxesAndRules
        xAxisLabelTexts={['W1', 'W2', 'W3', 'W4']}
        xAxisLabelTextStyle={styles.axisLabel}
        noOfSections={3}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.base,
    marginHorizontal: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  axisLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
  },
})