import { UserRoleEnum } from '@config/enums/role.enum';
import { MediaApi } from 'types/models/Media';

export type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  major: string;
  password: string;
  passwordConfirmation: string;
  role: UserRoleEnum;
  media: MediaApi[];
};
