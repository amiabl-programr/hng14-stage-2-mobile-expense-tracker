import { CategoryKey } from "../constants/categories";

export type BudgetStatus = 'HEALTHY' | 'ON_TRACK' | 'AT_LIMIT' | 'OVER_LIMIT';

export interface Budget {
    id: string
    category: CategoryKey
    limit: number
    month: string
    createdAt: string
}

export interface Allocation {
  category: CategoryKey
  spent: number
  limit: number
  status: BudgetStatus
}