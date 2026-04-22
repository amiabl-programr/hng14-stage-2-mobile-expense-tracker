import { Colors } from "@/src/constants/colors";
import { Spacing } from "@/src/constants/spacing";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


interface Props {
    children: React.ReactNode
    style?:ViewStyle
    padded?:boolean
}

export default function ScreenWrapper({
    children,
    style,
    padded=true,
}: Props) {
    return (
        <SafeAreaView style={[styles.container, padded && styles.padded, style]}>
            {children}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  padded: {
    paddingHorizontal: Spacing.base,
  },
})