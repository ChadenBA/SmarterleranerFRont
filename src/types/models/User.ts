import { UserRoleEnum } from '@config/enums/role.enum';
import { Result } from 'types/interfaces/SilvermanResultData';

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
  result?: Result;
}
