import StatisticsCard from '@components/statisticsCard/StatisticsCard'
import { useGetFacilitatorStatisticsQuery } from '@redux/apis/dashboard/dashboardApi'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import DashboardSkeleton from '../DashboardSkeleton'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import { Money, SupervisedUserCircle } from '@mui/icons-material'
import BodyCard from '@components/cards/bodyCard/BodyCard'
import { useGetInstructorCoursesQuery } from '@redux/apis/courses/coursesApi'
import usePagination from 'src/hooks/usePagination'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import AllCoursesList from '../designer/courses/allCoursesList/AllCoursesList'

function FacilitatorDashboard() {
  const { data, isLoading } = useGetFacilitatorStatisticsQuery()
  const { t } = useTranslation()
  const { queryParams } = usePagination()
  const { data: coursesData, isLoading: coursesLoading } =
    useGetInstructorCoursesQuery({
      ...queryParams,
      perPage: GLOBAL_VARIABLES.PAGINATION.MIN_ROWS_PER_PAGE,
    })
  const courses = coursesData?.data

  if (isLoading) return <DashboardSkeleton />
  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.facilitator.private_courses')}
            value={data?.privateCourses}
            subtitle={t('dashboard.facilitator.private_courses_subtitle')}
            icon={<SecurityOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.facilitator.public_courses')}
            value={data?.publicCourses}
            subtitle={t('dashboard.facilitator.public_courses_subtitle')}
            icon={<PublicOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.facilitator.enrolled_students')}
            value={data?.enrolledStudents}
            subtitle={t('dashboard.facilitator.enrolled_students_subtitle')}
            icon={<SupervisedUserCircle />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.facilitator.fee')}
            value={`$${data?.totalFee}`}
            subtitle={t('dashboard.facilitator.fee_subtitle')}
            icon={<Money />}
          />
        </Grid>
      </Grid>
      <BodyCard title={t('dashboard.facilitator.latest_courses')}>
        <AllCoursesList
          isLoading={coursesLoading}
          courses={courses}
          isInstructor
        />
      </BodyCard>
    </>
  )
}

export default FacilitatorDashboard
