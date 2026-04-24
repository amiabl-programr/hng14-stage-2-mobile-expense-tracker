
import { RootStackParamList } from '@app-types/navigation'
import { Colors } from '@constants/colors'
import { Spacing } from '@constants/spacing'
import { Typography } from '@constants/typography'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

type Nav = NativeStackNavigationProp<RootStackParamList>

interface Allocation {
    id: string
    categoryId: string
    name: string
    limit: number
    spent: number
    status: string
    isRecurring: boolean,
    notificationsEnabled: boolean,
    createdAt: string
}

// ── Mock data ────────────────────────────────────────────────────────────────
const FILTER_TABS = ['All', 'Food', 'Travel', 'Shop', 'Home', 'Other']

const MOCK_ALLOCATIONS: Allocation[] = [
  {
    id: '1',
    categoryId: 'cat1',
    name: 'Housing',
    limit: 2500,
    spent: 2450,
    status: 'AT_LIMIT',
    isRecurring: false,
    notificationsEnabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    categoryId: 'cat2',
    name: 'Dining Out',
    limit: 850,
    spent: 420,
    status: 'HEALTHY',
    isRecurring: false,
    notificationsEnabled: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    categoryId: 'cat1',
    name: 'Groceries',
    limit: 1200,
    spent: 680,
    status: 'ON_TRACK',
    isRecurring: false,
    notificationsEnabled: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    categoryId: 'cat3',
    name: 'Tickets',
    limit: 400,
    spent: 215,
    status: 'ON_TRACK',
    isRecurring: false,
    notificationsEnabled: false,
    createdAt: new Date().toISOString(),
  },
]
// ─────────────────────────────────────────────────────────────────────────────

export default function AllocationListScreen() {
  const navigation = useNavigation<Nav>()
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Allocation</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.filterTab,
              activeFilter === tab && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === tab && styles.filterTabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Allocation list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_ALLOCATIONS.map((allocation) => (
          <AllocationCard
            key={allocation.id}
            allocation={allocation}
            onPress={() => {}}
          />
        ))}

        {/* New Allocation CTA */}
        <TouchableOpacity
          style={styles.newAllocation}
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <View style={styles.newAllocationIcon}>
            <Ionicons name="card" size={24} color={Colors.navyLight} />
            <View style={styles.newAllocationPlus}>
              <Ionicons name="add" size={10} color={Colors.white} />
            </View>
          </View>
          <Text style={styles.newAllocationTitle}>New Allocation</Text>
          <Text style={styles.newAllocationSub}>Record a new Allocation</Text>
        </TouchableOpacity>

        <View style={styles.bottomPad} />
      </ScrollView>

      {/* Quick Add button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.quickAddButton}
          activeOpacity={0.85}
          onPress={() => {}}
        >
          <Text style={styles.quickAddText}>Quick Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// ── Inline AllocationCard ─────────────────────────────────────────────────────
interface AllocationCardProps {
  allocation: Allocation
  onPress: () => void
}

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  Housing: 'home-outline',
  'Dining Out': 'restaurant-outline',
  Groceries: 'basket-outline',
  Tickets: 'car-outline',
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; barColor: string }> = {
  HEALTHY: { label: 'HEALTHY', color: Colors.green, bg: '#DCFCE7', barColor: Colors.green },
  ON_TRACK: { label: 'ON TRACK', color: Colors.navyLight, bg: 'transparent', barColor: Colors.navyLight },
  AT_LIMIT: { label: 'AT LIMIT', color: Colors.red, bg: Colors.redLight, barColor: Colors.red },
  OVER_LIMIT: { label: 'OVER LIMIT', color: Colors.red, bg: Colors.redLight, barColor: Colors.red },
}

function AllocationCard({ allocation, onPress }: AllocationCardProps) {
  const percent = Math.min((allocation.spent / allocation.limit) * 100, 100)
  const remaining = allocation.limit - allocation.spent
  const isOver = remaining < 0
  const config = STATUS_CONFIG[allocation.status]
  const icon = ICON_MAP[allocation.name] ?? 'wallet-outline'
  const showBadge = allocation.status !== 'ON_TRACK'

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardTop}>
        <View style={styles.cardIconBox}>
          <Ionicons name={icon} size={20} color={Colors.navyLight} />
        </View>

        {showBadge && (
          <View style={[styles.badge, { backgroundColor: config.bg }]}>
            <Text style={[styles.badgeText, { color: config.color }]}>
              {config.label}
            </Text>
          </View>
        )}

        {allocation.status === 'ON_TRACK' && (
          <Text style={styles.onTrackText}>ON TRACK</Text>
        )}
      </View>

      <Text style={styles.cardName}>{allocation.name}</Text>

      <View style={styles.cardAmountRow}>
        <Text style={styles.cardAmount}>
          ${allocation.spent.toLocaleString()}
        </Text>
        <Text style={styles.cardLimit}>
          / ${allocation.limit.toLocaleString()}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressRow}>
        <Text style={styles.usedText}>USED {Math.round(percent)}%</Text>
        <Text
          style={[
            styles.remainingText,
            isOver ? styles.remainingOver : styles.remainingOk,
          ]}
        >
          {isOver
            ? `-$${Math.abs(remaining)} LEFT`
            : `+$${remaining.toLocaleString()} LEFT`}
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percent}%`,
              backgroundColor: config.barColor,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  headerRight: {
    width: 36,
  },
  filterScroll: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    backgroundColor: Colors.white,
  },
  filterTab: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    borderRadius: 999,
    backgroundColor: Colors.background,
  },
  filterTabActive: {
    backgroundColor: Colors.navy,
  },
  filterTabText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.textSecondary,
  },
  filterTabTextActive: {
    color: Colors.white,
    fontWeight: Typography.weights.semibold,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.base,
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.base,
    gap: Spacing.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.blueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.5,
  },
  onTrackText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  cardName: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  cardAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  cardAmount: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.textPrimary,
  },
  cardLimit: {
    fontSize: Typography.sizes.base,
    color: Colors.textSecondary,
    fontWeight: Typography.weights.medium,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  usedText: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    fontWeight: Typography.weights.medium,
    letterSpacing: 0.3,
  },
  remainingText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    letterSpacing: 0.3,
  },
  remainingOk: {
    color: Colors.green,
  },
  remainingOver: {
    color: Colors.red,
  },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.chartGray,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
  },
  newAllocation: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.xs,
  },
  newAllocationIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.blueLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newAllocationPlus: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.navyLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newAllocationTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  newAllocationSub: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
  },
  bottomPad: {
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.base,
    paddingBottom: Spacing.xl,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  quickAddButton: {
    backgroundColor: Colors.navy,
    borderRadius: 16,
    paddingVertical: Spacing.base,
    alignItems: 'center',
  },
  quickAddText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
})