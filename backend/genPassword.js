import bcrypt from 'bcrypt'

export function generatePassword() {
  let string = Math.random().toString(36).slice(2);
  let splitted = string.split('');
  let upper = [];
  splitted.forEach(char => {
    if(Math.random() < 0.4)
      upper.push(char.toUpperCase());
    else
        upper.push(char);
  })
  let password = upper.join('');
  return password;
}

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

let passwd = generatePassword()

console.log(passwd)
console.log(await hashPassword(passwd))