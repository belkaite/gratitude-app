// import type { AuthUser } from '@server/shared/types'

const TOKEN_KEY = 'token';

export function getStoredAccessToken(storage: Storage): string | null {
    return storage.getItem(TOKEN_KEY)

}

export function storeAccessToken(storage: Storage, token: string) {
    return storage.setItem(TOKEN_KEY, token)
}