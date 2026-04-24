import { Allocation } from '@app-types/budget'
import { RootStackParamList } from '@app-types/navigation'
import { Transaction } from '@app-types/transaction'
import AppHeader from '@components/common/AppHeader'
import SectionHeader from '@components/common/SectionHeader'
import AllocationCard from '@components/dashboard/AllocationCard'
import LedgerListItem from '@components/dashboard/LedgerListItem'
import PortfolioCard from '@components/dashboard/PortfolioCard'
import SpendingTrendChart from '@components/dashboard/SpendingTrendChart'
import { Colors } from '@constants/colors'
import { Spacing } from '@constants/spacing'
import { Typography } from '@constants/typography'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

type Nav = NativeStackNavigationProp<RootStackParamList>

// ─── Mock data (replace with store data later) ───────────────────────────────

const MOCK_ALLOCATIONS: Allocation[] = [
  { id: '1', category: 'TRANSPORT', spent: 320, limit: 700, status: 'HEALTHY' },
  { id: '2', category: 'FOOD', spent: 485, limit: 500, status: 'AT_LIMIT' },
  { id: '3', category: 'SHOP', spent: 250, limit: 300, status: 'ON_TRACK' },
  { id: '4', category: 'UTILITIES', spent: 150, limit: 250, status: 'HEALTHY' },
  { id: '5', category: 'ENTERTAINMENT', spent: 200, limit: 300, status: 'HEALTHY' },
]

const MOCK_CHART_DATA = [
  { value: 1200 },
  { value: 2800 },
  { value: 1900 },
  { value: 3400 },
  { value: 2100 },
  { value: 3800 },
  { value: 3200 },
]

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 1299,
    category: 'SHOP',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    notes: 'Apple Store',
    isRecurring: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'income',
    amount: 450.25,
    category: 'INVESTMENT',
    date: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    notes: 'Dividend Payout',
    isRecurring: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    type: 'expense',
    amount: 240.5,
    category: 'FOOD',
    date: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    notes: 'The Gilded Fork',
    isRecurring: false,
    createdAt: new Date().toISOString(),
  },
]

const MOCK_SAVINGS = [
  { label: 'INVESTMENTS', percent: 65, color: Colors.navyLight },
  { label: 'CASH SAVINGS', percent: 25, color: Colors.blue },
  { label: 'CRYPTO VAULT', percent: 10, color: Colors.green },
]

// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardOverviewScreen() {
  const navigation = useNavigation<Nav>()

  return (
    <View style={styles.root}>
      <AppHeader onNotificationPress={() => {}} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Portfolio Card */}
        <PortfolioCard
          balance={42950.40}
          changePercent={12.5}
          onDeposit={() => {}}
          onWithdraw={() => {}}
        />

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionButton}
              activeOpacity={0.7}
              onPress={action.onPress}
            >
              <Ionicons name={action.icon as any} size={20} color={Colors.navyLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Allocations */}
        <View style={styles.section}>
          <SectionHeader
            title="Allocations"
            onViewAll={() => navigation.navigate('AllocationList')}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.allocationScroll}
        >
          {MOCK_ALLOCATIONS.map((allocation) => (
            <AllocationCard key={allocation.category} allocation={allocation} />
          ))}
        </ScrollView>

        {/* Spending Trend */}
        <View style={styles.sectionSpacing}>
          <SpendingTrendChart
            startDate="Oct 1"
            endDate="Oct 15, 2023"
            data={MOCK_CHART_DATA}
          />
        </View>

        {/* Savings Breakdown */}
        <View style={styles.savingsCard}>
          <View style={styles.savingsHeader}>
            <Text style={styles.savingsTitle}>Savings</Text>
            <Ionicons name="settings-outline" size={18} color={Colors.textMuted} />
          </View>
          {MOCK_SAVINGS.map((item) => (
            <View key={item.label} style={styles.savingsRow}>
              <Text style={styles.savingsLabel}>{item.label}</Text>
              <View style={styles.savingsBarTrack}>
                <View
                  style={[
                    styles.savingsBarFill,
                    {
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.savingsPercent}>{item.percent}%</Text>
            </View>
          ))}
        </View>

        {/* Recent Ledger */}
        <View style={[styles.section, styles.sectionSpacing]}>
          <SectionHeader
            title="Recent Ledger"
            onViewAll={() => navigation.navigate('Ledgers')}
          />
          <View style={styles.ledgerCard}>
            {MOCK_TRANSACTIONS.map((tx) => (
              <LedgerListItem key={tx.id} transaction={tx} />
            ))}
          </View>
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  )
}

// ─── Quick action buttons (row of 4 below portfolio card) ────────────────────

const QUICK_ACTIONS = [
  { label: 'Ledger', icon: 'receipt-outline', onPress: () => {} },
  { label: 'Edit', icon: 'create-outline', onPress: () => {} },
  { label: 'Card', icon: 'card-outline', onPress: () => {} },
  { label: 'Transfer', icon: 'swap-horizontal-outline', onPress: () => {} },
]

// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: Spacing['4xl'],
  },
  section: {
    paddingHorizontal: Spacing.base,
  },
  sectionSpacing: {
    marginTop: Spacing.xl,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.sm,
    borderRadius: 16,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allocationScroll: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xs,
    gap: Spacing.md,
  },
  savingsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.base,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  savingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingsTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.textPrimary,
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  savingsLabel: {
    fontSize: Typography.sizes.xs,
    color: Colors.textMuted,
    letterSpacing: 0.3,
    width: 90,
  },
  savingsBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.chartGray,
    borderRadius: 999,
    overflow: 'hidden',
  },
  savingsBarFill: {
    height: 6,
    borderRadius: 999,
  },
  savingsPercent: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.textSecondary,
    width: 32,
    textAlign: 'right',
  },
  ledgerCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: Spacing.base,
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.navy,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomPad: {
    height: Spacing['3xl'],
  },
})