import { Media, MediaApi } from 'types/models/Media';
import { ApiPaginationResponse } from './type';
import { generatePictureSrc } from '@utils/helpers/string.helpers';
import { transformSingleUser } from './user/usersApi.transform';
import { UpdateResponse, UpdateResponseApi } from './user/usersApi.type';
export const transformMedia = (medias: MediaApi[]): Media[] => {
  return medias.map((media) => transformSingleMedia(media));
};

export const transformSingleMedia = (media: MediaApi): Media => {
  return {
    id: media?.id,
    fileName: generatePictureSrc(media?.file_name),
    modelId: media?.model_id,
    mimeType: media?.mime_type,
    modelType: media?.model_type,
    title: media?.title,
  };
};

export function transformPaginationResponse<T>(paginationResponse: ApiPaginationResponse<T>) {
  const { message, meta } = paginationResponse;
  const { current_page, per_page, total } = meta;
  return {
    message: message,
    meta: {
      currentPage: current_page,
      perPage: per_page,
      total: total,
      count: Math.ceil(total / per_page),
    },
  };
}

export const decodeUpdateResponse = (response: UpdateResponseApi): UpdateResponse => {
  return {
    message: response.message,
    data: transformSingleUser(response.data),
  };
};
