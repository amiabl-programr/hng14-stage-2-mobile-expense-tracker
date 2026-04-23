import ScreenWrapper from '@components/common/ScreenWrapper'
import { Colors } from '@constants/colors'
import { StyleSheet, Text, View } from 'react-native'

export default function SecurityGatewayScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.center}>
        <Text style={styles.text}>Security Gateway</Text>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: Colors.textSecondary },
})