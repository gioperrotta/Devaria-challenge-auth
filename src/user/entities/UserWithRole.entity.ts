import { Role } from 'src/role/entities/role.entity';
import { User } from './user.entity';

export class UserWithRole extends User {
  role: Role;
}
