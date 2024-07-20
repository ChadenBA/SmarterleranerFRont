import { Media } from './Media';
import { Eu } from './Eu';
import { Lo } from './Lo';
import { Quiz } from './Quiz';

export interface Course {
  id: number;
  title: string;
  categoryId: number;
  category: {
    id: number;
    category: string;
  };
  subcategoryId: number;
  subcategory: {
    id: number;
    subcategory: string;
  };
  description: string;
  isActive?: boolean;
  isOffline?: boolean;
  isSubscribed?: 0 | 1;
  createdAt: string;
  media: Media[];

  learningObjectsCount: number;
  educationalUnitsCount: number;
  subscribedUsersCount: number;
  educationalUnits: Eu[];
  learningObjects: Lo[];
  quiz: Quiz;
}

export interface CourseForAdmin {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
  subCategoryId: number;
  subscribers: number[];
  educationaUnit: Eu[];
  learningObjects: Lo[];
  quiz: Quiz;
  courseMedia: File;
  media?: Record<string, File[]>;
}
