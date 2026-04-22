import { Spacing } from '@/src/constants/spacing';
import { Colors } from '@constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Typography } from '@/src/constants/typography';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  showNotification?: boolean
  onNotificationPress?: () => void
}

export default function AppHeader({
    showNotification = true,
    onNotificationPress
}: Props) {
    return (
        <View style={styles.container}>
      <View style={styles.logoRow}>
        <View style={styles.logoIcon}>
          <Ionicons name="shield-checkmark" size={18} color={Colors.white} />
        </View>
        <Text style={styles.logoText}>Sovereign Ledger</Text>
      </View>

      {showNotification && (
        <TouchableOpacity
          style={styles.bellButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      )}
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.navy,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  bellButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
})