import { UserRoleEnum } from '@config/enums/role.enum';
import { User } from 'types/models/User';
import { UserApi } from '../user/usersApi.type';

export interface RegisterBodyApi {
  first_name: string;
  last_name: string;
  email: string;
  birth_date: number;
  major: string;
  password: string;
  password_confirmation: string;
  role: UserRoleEnum;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseApi {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user: UserApi;
    media?: { id: number; model_id: number; file_name: string };
  };
}
export interface LoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
    media?: {
      id: number;
      modelId: number;
      fileName: string;
    };
  };
}
