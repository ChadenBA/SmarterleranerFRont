import { Media } from './Media';
import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type';
import { Eu } from './Eu';

export interface Course {
  id: number;
  title: string;
  categoryId: number;
  category: {
    id: number;
    category: string;
  };
  description: string;
  isActive?: boolean;
  isOffline?: boolean;
  duration: string;
  isSubscribed?: boolean;
  isCompleted?: boolean;
  createdAt: string;
  eu: Eu[];
  media: Media[];
  lessonsCount: number;
  subscribedUsersCount: number;
}

export interface CourseForDesigner {
  id?: number;
  title: string;
  description: string;
  categoryId: number;
  subscribers: number[];
  eu: Section[];
  courseMedia: File;
  media?: Record<string, File[]>;
}
