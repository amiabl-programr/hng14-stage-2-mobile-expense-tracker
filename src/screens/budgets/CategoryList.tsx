import { RootStackParamList } from '@/src/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CategoryItems{
    id: string
    icon: string
    name: string
    spent: number
    budget: number
    left: number 
    over: boolean
}

const CATEGORIES: CategoryItems[] = [
  { id: '1', icon: '🍴', name: 'Utilities',      spent: 150, budget: 250, left: 100,  over: true  },
  { id: '2', icon: '🎮', name: 'Entertainment',  spent: 200, budget: 300, left: 100,  over: false },
  { id: '3', icon: '🚗', name: 'Groceries',      spent: 250, budget: 325, left: 75,   over: false },
  { id: '4', icon: '🍴', name: 'Transportation', spent: 100, budget: 150, left: 50,   over: true  },
  { id: '5', icon: '🚗', name: 'Health & Fitness',spent: 120, budget: 150, left: 30,  over: false },
  { id: '6', icon: '🚗', name: 'Clothing',       spent: 180, budget: 240, left: 60,   over: false },
];

function CategoryCard({ item }: { item: CategoryItems }) {
  const progress = Math.min(item.spent / (item.spent + item.left), 1);
  return (
    <View style={styles.card}>
      <View style={styles.cardIconWrap}>
        <Text style={styles.cardIconText}>{item.icon}</Text>
      </View>
      <Text style={styles.cardName}>{item.name}</Text>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress * 100}%` },
            item.over ? styles.progressOver : styles.progressOk,
          ]}
        />
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardSpent}>${item.spent}</Text>
        <Text style={[styles.cardLeft, item.over && styles.cardLeftOver]}>
          ${item.left} LEFT
        </Text>
      </View>
    </View>
  );
}

export default function CategoriesScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F4F7" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {CATEGORIES.map((item) => (
          <CategoryCard key={item.id} item={item} />
        ))}

        {/* Create New Category */}
        <TouchableOpacity style={styles.createCard}>
          <View style={styles.createIconWrap}>
            <Text style={styles.createIconText}>💳</Text>
          </View>
          <Text style={styles.createLabel}>Create New Category</Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: '#F2F4F7',
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EEF1F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cardIconText: {
    fontSize: 18,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3A3A4A',
    marginBottom: 8,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E8EF',
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressOk: {
    backgroundColor: '#0D2159',
  },
  progressOver: {
    backgroundColor: '#C0273D',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardSpent: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0D2159',
  },
  cardLeft: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A8FA8',
  },
  cardLeftOver: {
    color: '#C0273D',
  },
  createCard: {
    borderWidth: 2,
    borderColor: '#C8CEDD',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  createIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#EEF1F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  createIconText: {
    fontSize: 24,
  },
  createLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0D2159',
  },
});