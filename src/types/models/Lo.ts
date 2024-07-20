import { LoTypeEnum } from '@config/enums/LoType.enum';
import { Media } from './Media';
import { Quiz } from './Quiz';

export interface Lo {
  id?: number;
  type: LoTypeEnum;

  duration: string;

  quiz?: Quiz;

  media: Media[];
}
