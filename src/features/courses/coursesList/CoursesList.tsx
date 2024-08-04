import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CoursesListSkeleton from './coursesListSkeleton/CoursesListSkeleton';
import NoDataFound from '@components/noDataFound/NoDataFound';
import { CoursesListProps } from './coursesList.type';
import CourseCard from '../coursesCard/CourseCard';

function CoursesList({ courses, isLoading }: CoursesListProps) {
  const { t } = useTranslation();

  if (courses?.length === 0) return <NoDataFound message={t('home.no_course_found')} />;

  if (isLoading) return <CoursesListSkeleton />;

  return (
    <Stack direction={'row'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'center'}>
      {Boolean(courses) &&
        courses?.map((course) => (
          <CourseCard
            width="45vh"
            key={course.id}
            id={course.id}
            isActive={course?.isActive}
            image={course.coverMedia?.fileName}
            studentLevel={course.studentLevel}
            isOffline={course.isOffline}
            courseTitle={course.title}
            educationaUnitsCount={course.educationalUnitsCount}
            learningObjectsCount={course.learningObjectsCount}
            createdAt={course.createdAt}
            isEnrolled={course.isSubscribed}
          />
        ))}
    </Stack>
  );
}

export default CoursesList;
