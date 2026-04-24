import AppHeader from '@/src/components/common/AppHeader'
import PortfolioCard from '@/src/components/dashboard/PortfolioCard'
import { Spacing } from '@/src/constants/spacing'
import { RootStackParamList } from '@/src/types/navigation'
import ScreenWrapper from '@components/common/ScreenWrapper'
import { Colors } from '@constants/colors'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


export default function BudgetsOverviewScreen() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const CATEGORY_CHIPS = [
  { id: '1', icon: '🛒', label: 'Shop'  },
  { id: '2', icon: '🏠', label: 'Home'  },
  { id: '3', icon: '+',  label: 'New', isNew: true },
];

const CATEGORIES_PREVIEW = [
  { id: '1', icon: '🚗', name: 'Transport', spent: 200, budget: 250, left: 50,  over: false },
  { id: '2', icon: '🍿', name: 'Entertainment', spent: 120, budget: 150, left: 30,  over: false },
];

  return (
    <ScreenWrapper>
      <AppHeader />
        <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
              >
                  <PortfolioCard 
                  balance={42950.40}
                  changePercent={12.5}
                  onDeposit={() => {}}
                  onWithdraw={() => {}}/>

                  
          <View style={styles.categoryPickerCard}>
            <Text style={styles.sectionLabelSmall}>CATEGORY</Text>
            <View style={styles.chipRow}>
              {CATEGORY_CHIPS.map((c) => (
                <TouchableOpacity key={c.id} style={styles.chip}>
                  <Text style={c.isNew ? styles.chipNewIcon : styles.chipIcon}>{c.icon}</Text>
                  <Text style={styles.chipLabel}>{c.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.addCategoryBtn}
            onPress={()=> navigation.navigate("AddCategoryScreen")}>
              <Text style={styles.addCategoryBtnText}>+ Add New Category</Text>
            </TouchableOpacity>
          </View>

            {/* Category breakdown list */}
          <View style={styles.categoryBreakdown}>
            <View style={styles.categoryBreakdownHeader}>
              <Text style={styles.categoryBreakdownTitle}>CATEGORY BREAKDOWN</Text>
              <TouchableOpacity onPress={() => navigation.navigate('CategoryList')}>
                <Text style={styles.categoryBreakdownViewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {CATEGORIES_PREVIEW.map((c) => (
              <View key={c.id} style={styles.categoryRow}>
                <View style={styles.categoryRowLeft}>
                  <View style={styles.categoryIconBg}>
                    <Text style={styles.categoryIcon}>{c.icon}</Text>
                  </View>
                  <View>
                    <Text style={styles.categoryRowName}>{c.name}</Text>
                    <Text style={styles.categoryRowMeta}>
                      ${c.spent} of ${c.budget} budget
                    </Text>
                  </View>
                </View>
                <View style={styles.categoryRowRight}>
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${(c.spent / c.budget) * 100}%` },
                        c.over && styles.progressOver,
                      ]}
                    />
                  </View>
                  <Text style={[styles.categoryRowValue, c.over && styles.categoryRowValueOver]}>
                    ${c.left} left
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: Colors.textSecondary },
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

   // Category picker card
  categoryPickerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionLabelSmall: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A8FA8',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#F2F4F7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 68,
  },
  chipIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  chipNewIcon: {
    fontSize: 20,
    color: '#0D2159',
    fontWeight: '700',
    marginBottom: 4,
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3A3A4A',
  },
  addCategoryBtn: {
    backgroundColor: '#0D2159',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addCategoryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

    // Category breakdown list
  categoryBreakdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryBreakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBreakdownTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A8FA8',
    letterSpacing: 0.8,
  },
  categoryBreakdownViewAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0D2159',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  categoryRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIconBg: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F2F4F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryRowName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3A3A4A',
    marginBottom: 4,
  },
  categoryRowMeta: {
    fontSize: 12,
    color: '#8A8FA8',
  },
  categoryRowRight: {
    alignItems: 'flex-end',
    minWidth: 120,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#F2F4F7',
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#0D2159',
  },
  progressOver: {
    backgroundColor: '#FF5667',
  },
  progressOk: {
    backgroundColor: '#0D2159',
  },
  categoryRowValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D2159',
  },
  categoryRowValueOver: {
    color: '#FF5667',
  },
})