import { AuthStackParamList } from '@app-types/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BiometricVerificationScreen from '@screens/auth/BiometricVerificationScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='BiometricVerification' component={BiometricVerificationScreen} />
            </Stack.Navigator>
        </SafeAreaView>
    )
}