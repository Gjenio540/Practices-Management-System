import crypto from 'crypto'

export function generatePassword(): string {
    let password = Math.random().toString(36).slice(2)
    return password
}