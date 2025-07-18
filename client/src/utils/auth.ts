import type { AuthUser } from '@server/shared/types'

const TOKEN_KEY = 'token'

export function getStoredAccessToken(storage: Storage): string | null {
  return storage.getItem(TOKEN_KEY)
}

export function storeAccessToken(storage: Storage, token: string) {
  return storage.setItem(TOKEN_KEY, token)
}

export function getUserFromToken(token: string): AuthUser {
  return JSON.parse(atob(token.split('.')[1])).user
}

export function clearStoredAccessToken(storage: Storage) {
  return storage.removeItem(TOKEN_KEY)
}
