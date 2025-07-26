import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const countAtom = atom(0)

export const tokenAtom = atomWithStorage<string | null>("token", null)
