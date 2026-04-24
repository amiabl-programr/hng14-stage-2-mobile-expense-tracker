import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryList from "@screens/budgets/CategoryList";
import useAuthStore from '@store/useAuthStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddCategoryScreen from "../screens/budgets/AddCategory";
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
  
    return (
      <SafeAreaProvider>
        
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
          <Stack.Screen name="AddCategoryScreen" component={AddCategoryScreen} />
          <Stack.Screen name="CategoryList" component={CategoryList} />
        </>
                
            ) : (
                <Stack.Screen name="Auth" component={AuthStackNavigator} />
            )
           }
        </Stack.Navigator>
      </SafeAreaProvider>
    )
}