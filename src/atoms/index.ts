import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const countAtom = atom(0)

export const userAtom = atom<UserResponse | null>(null)
export const tokenAtom = atomWithStorage<string | null>("token", null)
