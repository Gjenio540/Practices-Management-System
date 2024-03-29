import { Request, Response, NextFunction } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config();
const jwtSecret = process.env.JWT_SECRET as unknown as string;

export type jwtPayload = {
  "id": number
  "role": "supervisor" | "student"
}

export function generatePassword(): string {
  return Buffer.from(Math.random().toString()).toString("base64").substring(10,21);
}

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
      req.body.token = token; //send token back to main function
      next();
  })
}

export function parseJWTpayload (token: string): jwtPayload {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
