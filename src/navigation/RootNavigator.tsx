import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuthStore from '@store/useAuthStore';
import BudgetLimitsScreen from "../screens/budgets/BudgetLimitsScreen";
import BudgetSmartPredictionScreen from "../screens/budgets/BudgetSmartPredictionScreen";
import AddTransactionDetailsScreen from "../screens/ledger/AddTransactionDetailsScreen";
import AddTransactionScreen from "../screens/ledger/AddTransactionScreen";
import LedgersScreen from "../screens/ledger/LedgersScreen";
import { RootStackParamList } from "../types/navigation";
import AppTabNavigator from "./AppTabNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log(isAuthenticated);
  
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
           {
            isAuthenticated ? (
                     <>
          <Stack.Screen name="App" component={AppTabNavigator} />
          <Stack.Screen
            name="AddTransaction"
            component={AddTransactionScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen
            name="AddTransactionDetails"
            component={AddTransactionDetailsScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen name="Ledgers" component={LedgersScreen} />
          <Stack.Screen name="BudgetLimits" component={BudgetLimitsScreen} />
          <Stack.Screen
            name="BudgetSmartPrediction"
            component={BudgetSmartPredictionScreen}
          />
        </>
                
            ) : (
                <Stack.Screen name="Auth" component={AuthStackNavigator} />
            )
           }
        </Stack.Navigator>
    )
}