import crypto from 'crypto'

export function generatePassword()
{
    let password = Math.random().toString(36).slice(2)
    return password
}