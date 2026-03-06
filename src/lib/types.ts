export type UserRole = 'admin' | 'member';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
}

export interface CentralFundLog {
  id: string;
  user_id: string;
  user_name?: string;
  amount: number;
  month_year: string; // "2026-03"
  paid: boolean;
  created_at: string;
}

export interface PersonalSaving {
  id: string;
  user_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  note?: string;
  date: string;
  created_at: string;
}

export interface Loan {
  id: string;
  user_id: string;
  user_name?: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  monthly_payment: number;
  total_months: number;
  created_at: string;
}

export interface LoanRepayment {
  id: string;
  loan_id: string;
  amount: number;
  month_year: string;
  paid: boolean;
  paid_at?: string;
}

export interface DashboardStats {
  centralFundBalance: number;
  personalSavings: number;
  activeLoansTotal: number;
  monthlyDue: number;
}
