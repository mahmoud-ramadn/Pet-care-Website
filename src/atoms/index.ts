import { atom } from "jotai"

export const authLoadedAtom = atom<boolean>(false)

export const tokenAtom = atom<string | null>(null)
