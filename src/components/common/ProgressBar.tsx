import { Colors } from '@constants/colors'
import { StyleSheet, View } from 'react-native'

interface Props {
  percent: number       
  height?: number
}

function getBarColor(percent: number): string {
  if (percent >= 100) return Colors.red
  if (percent >= 90) return Colors.red
  if (percent >= 70) return Colors.navyLight
  return Colors.green
}

export default function ProgressBar({ percent, height = 6 }: Props) {
  const clamped = Math.min(percent, 100)
  const color = getBarColor(percent)

  return (
    <View style={[styles.track, { height }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clamped}%`,
            height,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: Colors.chartGray,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 999,
  },
})