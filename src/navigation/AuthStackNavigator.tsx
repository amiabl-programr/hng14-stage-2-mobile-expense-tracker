import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '@app-types/navigation'
import SecurityGatewayScreen from '@screens/auth/SecurityGatewayScreen'
import BiometricVerificationScreen from '@screens/auth/BiometricVerificationScreen'

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='SecurityGateway' component={SecurityGatewayScreen} />
            <Stack.Screen name='BiometricVerification' component={BiometricVerificationScreen} />
        </Stack.Navigator>
    )
}