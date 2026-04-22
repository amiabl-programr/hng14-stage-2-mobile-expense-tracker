export type MemberTier = 'STANDARD' | 'PRO' | 'SOVEREIGN_EXECUTIVE';

export interface User {
  id: string
  name: string
  avatarUrl?: string
  tier: MemberTier
  defaultLedger: string
  currency: string
  locale: string
}