import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import AuthStackNavigator from "./AuthStackNavigator";

// temporary — replace with useAuthStore once store is set up
const IS_AUTHENTICATED = true
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
           {
            IS_AUTHENTICATED ? (
                <Stack.Screen name="Auth" component={AuthStackNavigator} />
            ) : (
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
            )
           }
        </Stack.Navigator>
    )
}