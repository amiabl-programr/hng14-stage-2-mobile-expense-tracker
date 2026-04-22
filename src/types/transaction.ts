import { CategoryKey } from "../constants/categories";

export type TransactionType = 'income' | 'expense';

export type RecurringInterval = 'daily' | 'weekly' | 'monthly';

export interface Transaction {
    id: string
    type: TransactionType
    amount: number
    category: CategoryKey
    date: string
    notes?: string
    isRecurring: boolean
    recurringInterval?: RecurringInterval
    recurringNextDate?: string
    createdAt: string // save it as a ISO string
}