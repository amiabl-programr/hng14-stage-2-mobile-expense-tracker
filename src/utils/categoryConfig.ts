import { CategoryKey } from '@constants/categories'
import { Colors } from '@constants/colors'

interface CategoryConfig {
  label: string
  icon: string
  color: string
  background: string
}

export const CATEGORY_CONFIG: Record<CategoryKey, CategoryConfig> = {
  FOOD: {
    label: 'Food',
    icon: 'restaurant',
    color: Colors.navyLight,
    background: Colors.blueLight,
  },
  TRAVEL: {
    label: 'Travel',
    icon: 'car',
    color: Colors.navyLight,
    background: Colors.blueLight,
  },
  SALARY: {
    label: 'Salary',
    icon: 'cash',
    color: Colors.green,
    background: Colors.greenLight,
  },
  SHOP: {
    label: 'Shopping',
    icon: 'bag-handle',
    color: Colors.navyLight,
    background: Colors.blueLight,
  },
  HOME: {
    label: 'Home',
    icon: 'home',
    color: Colors.navyLight,
    background: Colors.blueLight,
  },
  TRANSPORT: {
    label: 'Transport',
    icon: 'car-outline',
    color: Colors.navyLight,
    background: Colors.blueLight,
  },
  ENTERTAINMENT: {
    label: 'Entertainment',
    icon: 'film',
    color: Colors.navyLight,
    background: Colors.blueLight,
  },
  UTILITIES: {
    label: 'Utilities',
    icon: 'flash',
    color: Colors.orange,
    background: '#FFF7ED',
  },
  HEALTH: {
    label: 'Health',
    icon: 'fitness',
    color: Colors.green,
    background: Colors.greenLight,
  },
  BUSINESS: {
    label: 'Business',
    icon: 'briefcase',
    color: Colors.navyLight,
    background: Colors.blueLight,
  },
  INVESTMENT: {
    label: 'Investment',
    icon: 'trending-up',
    color: Colors.green,
    background: Colors.greenLight,
  },
  OTHER: {
    label: 'Other',
    icon: 'ellipsis-horizontal',
    color: Colors.textSecondary,
    background: Colors.divider,
  },
}