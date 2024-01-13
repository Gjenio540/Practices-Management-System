import bcrypt from 'bcrypt'

export function generatePassword() {
  return Buffer.from(Math.random().toString()).toString("base64").substring(10,21);
}

let passwd = generatePassword()

console.log(passwd)
//console.log(await hashPassword(passwd))