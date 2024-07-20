import { transformPaginationResponse } from '@redux/apis/transform';
import { PaginationResponse } from 'types/interfaces/Pagination';
import { ApiPaginationResponse } from '../type';
import { SingleUserResponseData, UserApi } from './usersApi.type';
import { User } from 'types/models/User';
import { generatePictureSrc, toSnakeCase } from '@utils/helpers/string.helpers';

import noUser from '@assets/images/noUser.png';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { FieldValues } from 'react-hook-form';
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse';
import { convertFromUnixTimestampToDate, transformDateTime } from '@utils/helpers/date.helpers';

export const transformFetchUsersResponse = (
  response: ApiPaginationResponse<UserApi>,
): PaginationResponse<User> => {
  if (response.meta) {
    return {
      ...transformPaginationResponse(response),
      data: transformUsers(Object.values(response?.data)),
    };
  }

  return {
    message: response.message,
    data: transformUsers(Object.values(response?.data)),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
  };
};

export const transformUserResponse = (
  response: SingleUserResponseData,
): ItemDetailsResponse<User> => {
  return {
    message: response.message,
    data: transformSingleUser(response.data),
  };
};

const transformUsers = (data: UserApi[]): User[] => {
  return data?.map((user) => transformSingleUser(user));
};

export const transformSingleUser = (data: UserApi): User => {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    role: data.role,
    birthDate: convertFromUnixTimestampToDate(data.birth_date ?? 0),
    major: data.major,
    coursesCount: data.courses_count,
    isValid: data.is_valid,
    media: data?.media
      ? {
          id: data.media[0]?.id ?? 0,
          modelId: data.media[0]?.model_id ?? 0,
          fileName: generatePictureSrc(data.media[0]?.file_name) ?? GLOBAL_VARIABLES.EMPTY_STRING,
        }
      : {
          id: 0,
          modelId: data?.media?.[0]?.model_id ?? 0,
          fileName: noUser,
        },
    createdAt: transformDateTime(data.created_at),
  };
};

export const encodeUser = (values: FieldValues): FormData => {
  const formData = new FormData();
  if (values.media) {
    formData.append('profile_picture', values.media);
  }
  Object.keys(values).forEach((key) => {
    if (values[key]) {
      formData.append(toSnakeCase(key), values[key]);
    }
  });
  return formData;
};
