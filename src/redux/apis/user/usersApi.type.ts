import { UserRoleEnum } from '@config/enums/role.enum';
import { Result } from 'types/interfaces/SilvermanResultData';
import { User } from 'types/models/User';

export interface UserApi {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: UserRoleEnum;
  courses_count?: number;
  birth_date?: number;
  major?: string;
  is_valid?: 0 | 1;
  media?: { id: number; model_id: number; file_name: string }[];
  created_at?: string;
  result?: Result;
  latest_course_id?: number;
}
export interface SingleUserResponseData {
  message: string;
  data: UserApi;
}

export interface UpdateResponseApi {
  message: string;
  data: UserApi;
}
export interface UpdateResponse {
  message: string;
  data: User;
}
