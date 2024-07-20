import { UserRoleEnum } from '@config/enums/role.enum';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRoleEnum;
  coursesCount?: number;
  birthDate?: string;
  major?: string;
  isValid?: 0 | 1;
  media?: {
    id: number;
    modelId: number;
    fileName: string;
  };
  createdAt?: string;
  password?: string;
  passwordConfirmation?: string;
}
