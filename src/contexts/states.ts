import { create } from 'zustand'

interface GenerationState {
    isAuth: boolean
    setIsAuth: (isAuth: boolean) => void
}

export const useGenerationStore = create<GenerationState>()((set) => ({
    isAuth: false,
    setIsAuth: (isAuth: boolean) => set({ isAuth })
}))