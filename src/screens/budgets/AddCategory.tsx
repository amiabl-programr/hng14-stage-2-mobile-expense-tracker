import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function AddCategoryScreen() {
  const navigation = useNavigation();
  const [categoryName, setCategoryName] = useState('');
  const [notes, setNotes] = useState('');
  const [budget, setBudget] = useState('0.00');

  const handleBudgetChange = (text: string) => {
    const numeric = text.replace(/[^0-9.]/g, '');
    setBudget(numeric);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F4F7" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Category</Text>
        </View>

        <View style={styles.body}>
          {/* Card 1 – Name & Notes */}
          <View style={styles.card}>
            <Text style={styles.fieldLabel}>CATEGORY NAME</Text>
            <View style={styles.inputRow}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.textInput}
                placeholder="John Doe"
                placeholderTextColor="#ABAFC0"
                value={categoryName}
                onChangeText={setCategoryName}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.notesRow}>
              <Text style={styles.notesIcon}>☰</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>NOTES</Text>
                <TextInput
                  style={styles.notesInput}
                  placeholder="What was this for?"
                  placeholderTextColor="#ABAFC0"
                  multiline
                  numberOfLines={3}
                  value={notes}
                  onChangeText={setNotes}
                />
              </View>
            </View>
          </View>

          {/* Card 2 – Budget */}
          <View style={styles.card}>
            <View style={styles.budgetBadge}>
              <Text style={styles.badgeText}>USD</Text>
            </View>
            <Text style={styles.budgetLabel}>CATEGORY BUDGET</Text>
            <View style={styles.amountRow}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.amountInput}
                keyboardType="decimal-pad"
                value={budget}
                onChangeText={handleBudgetChange}
                selectTextOnFocus
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85}>
            <Text style={styles.saveBtnText}>Save Up!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  backArrow: {
    fontSize: 18,
    color: '#0D2159',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0D2159',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A8FA8',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  inputIcon: {
    fontSize: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#0D2159',
  },
  divider: {
    height: 1,
    backgroundColor: '#ECEEF4',
    marginVertical: 14,
  },
  notesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  notesIcon: {
    fontSize: 16,
    marginTop: 20,
  },
  notesInput: {
    fontSize: 15,
    color: '#3A3A4A',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  // Budget card
  budgetBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#0D2159',
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  budgetLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A8FA8',
    letterSpacing: 0.8,
    marginTop: 8,
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  dollarSign: {
    fontSize: 32,
    color: '#C8CEDD',
    fontWeight: '300',
    marginRight: 2,
  },
  amountInput: {
    fontSize: 52,
    fontWeight: '700',
    color: '#0D2159',
    letterSpacing: -1,
    minWidth: 160,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 12,
  },
  saveBtn: {
    backgroundColor: '#0D2159',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});