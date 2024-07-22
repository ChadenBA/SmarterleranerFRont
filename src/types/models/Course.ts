import { Media } from './Media';
import { Eu } from './Eu';
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
  quiz: Quiz;
}

export interface CourseForAdmin {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
  subcategoryId: number;
  isOffline?: 1 | 0;
  isActive?: 1 | 0;
  subscribers: number[];
  educationalUnits: Eu[];
  quiz: Quiz;
  courseMedia: File;
  createdAt: string;
  media?: Record<string, File[]>
}
