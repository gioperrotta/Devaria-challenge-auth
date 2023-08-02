import { Request } from 'express';

interface User {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  user: User;
}
