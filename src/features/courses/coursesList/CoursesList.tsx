import { Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

import CoursesListSkeleton from './coursesListSkeleton/CoursesListSkeleton'
import NoDataFound from '@components/noDataFound/NoDataFound'
import CourseCard from '../coursesCard/CourseCard'
import { CoursesListProps } from './coursesList.type'

function CoursesList({ courses, isLoading }: CoursesListProps) {
  const { t } = useTranslation()

  if (courses?.length === 0)
    return <NoDataFound message={t('home.no_course_found')} />

  if (isLoading) return <CoursesListSkeleton />

  return (
    <Stack
      direction={'row'}
      flexWrap={'wrap'}
      alignItems={'center'}
      justifyContent={'center'}>
      {Boolean(courses) &&
        courses?.map((course) => (
          <CourseCard
            width="45vh"
            key={course.id}
            id={course.id}
            isActive={course?.isActive}
            image={course.media[0]?.fileName}
            instructorName={`${course.facilitator.firstName} ${course.facilitator.lastName}`}
            instructorAvatar={course?.facilitator?.media?.fileName as string}
            discount={course.discount}
            courseTitle={course.title}
            coursePrice={course.price.toString()}
            lessonsCount={course.lessonsCount}
            duration={course.duration}
            isPaid={course.isPaid}
            createdAt={course.createdAt}
          />
        ))}
    </Stack>
  )
}

export default CoursesList
