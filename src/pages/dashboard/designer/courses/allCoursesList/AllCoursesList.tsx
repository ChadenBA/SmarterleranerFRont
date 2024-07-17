import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AllCoursesListProps } from './AllCoursesList.type'
import NoDataFound from '@components/noDataFound/NoDataFound'
import CoursesListSkeleton from '@features/home/homeCourses/coursesList/coursesListSkeleton/CoursesListSkeleton'
import CourseCard from '@features/home/homeCourses/coursesCard/CourseCard'
import { Stack } from '@mui/material'
import { PATHS } from '@config/constants/paths'

function AllCoursesList({
  courses,
  isLoading,
  isDesigner,
  isInstructor,
}: AllCoursesListProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const navigateToEditCoursePage = (id: number) => {
    navigate(`${PATHS.DASHBOARD.DESIGNER.MY_COURSES.ROOT}/${id}`)
  }

  if (courses?.length === 0)
    return <NoDataFound message={t('home.no_course_found')} />

  if (isLoading) return <CoursesListSkeleton />
  return (
    <Stack
      direction={'row'}
      flexWrap={'wrap'}
      alignItems={'center'}
      justifyContent={'flex-start'}>
      {Boolean(courses) &&
        courses?.map((course) => (
          <CourseCard
            width="40vh"
            key={course.id}
            id={course.id}
            isActive={course?.isActive}
            image={course.media[0]?.fileName}
            instructorName={`${course.facilitator.firstName} ${course.facilitator.lastName}`}
            instructorAvatar={
              course?.facilitator?.media?.fileName as string
            }
            isOffline={course.isOffline}
            discount={course.discount}
            courseTitle={course.title}
            coursePrice={course.price.toString()}
            lessonsCount={course.lessonsCount}
            duration={course.duration}
            isPaid={course.isPaid}
            createdAt={course.createdAt}
            isDesigner={isDesigner}
            isInstructor={isInstructor}
            isEnrolled={course.isSubscribed}
            navigateToEditCoursePage={navigateToEditCoursePage}
          />
        ))}
    </Stack>
  )
}

export default AllCoursesList
