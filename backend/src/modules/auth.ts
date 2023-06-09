import { Request, Response, NextFunction } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as unknown as string;

export type jwtPayload = {
  "id": number
  "role": "supervisor" | "student"
}

export function generatePassword(): string {
  let string = Math.random().toString(36).slice(2);
  let splitted = string.split('');
  let upper: string[] = [];
  splitted.forEach(char => {
    if(Math.random() < 0.4)
      upper.push(char.toUpperCase());
    else
        upper.push(char);
  })
  let password = upper.join('');
  return password;
}

// token validation
export function checkToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers?.['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //check if token exist
  if (token == null) {
      res.sendStatus(401);
      return;
  }
  jsonwebtoken.verify(token, jwtSecret, (error) => { //token verification
      if(error) {
          res.sendStatus(403);
          return;
      }
      req.body.token = token //send token back to main function
      next();
  })
}

// jwt payload parser
export function parseJWTpayload (token: string): jwtPayload {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}