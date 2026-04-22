import { AppTabParamList } from '@app-types/navigation'
import { Colors } from '@constants/colors'
import { Spacing } from '@constants/spacing'
import { Typography } from '@constants/typography'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BudgetsOverviewScreen from '@screens/budgets/BudgetsOverviewScreen'
import DashboardOverviewScreen from '@screens/dashboard/DashboardOverviewScreen'
import FinancialInsightsScreen from '@screens/insights/FinancialInsightsScreen'
import SettingsProfileScreen from '@screens/settings/SettingsProfileScreen'
import { StyleSheet } from 'react-native'

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: Colors.navy,
            tabBarInactiveTintColor: Colors.textMuted,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIcon: ({ focused, color }) => {
            const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
                Overview: focused ? 'grid' : 'grid-outline',
                Budgets: focused ? 'wallet' : 'wallet-outline',
                Insights: focused ? 'bar-chart' : 'bar-chart-outline',
                Settings: focused ? 'settings' : 'settings-outline',
            }
            return <Ionicons name={icons[route.name]} size={22} color={color} />
            },
        })}
        >
            <Tab.Screen name="Overview" component={DashboardOverviewScreen} />
            <Tab.Screen name="Budgets" component={BudgetsOverviewScreen} />
            <Tab.Screen name="Insights" component={FinancialInsightsScreen} />
            <Tab.Screen name="Settings" component={SettingsProfileScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.xs,
    height: 60,
  },
  tabLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
})