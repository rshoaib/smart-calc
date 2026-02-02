import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
    age: number;
    retirementAge: number;
    annualIncome: number;
    currentSavings: number;
    monthlyContribution: number;
    safeWithdrawalRate: number;
}

interface UserState extends UserProfile {
    updateProfile: (data: Partial<UserProfile>) => void;
    resetProfile: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
    age: 30,
    retirementAge: 65,
    annualIncome: 60000,
    currentSavings: 20000,
    monthlyContribution: 500,
    safeWithdrawalRate: 4.0,
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            ...DEFAULT_PROFILE,
            updateProfile: (data) => set((state) => ({ ...state, ...data })),
            resetProfile: () => set(DEFAULT_PROFILE),
        }),
        {
            name: 'smart-calc-user-storage',
        }
    )
);
