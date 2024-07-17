import StatisticsCard from '@components/statisticsCard/StatisticsCard'
import { useGetStudentStatisticsQuery } from '@redux/apis/dashboard/dashboardApi'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import { useTranslation } from 'react-i18next'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import { Grid } from '@mui/material'
import ExpensesBarChart from '@components/CustomCharts/expensesBarChart/ExpensesBarChart'
import DashboardSkeleton from '../DashboardSkeleton'

function StudentDashboard() {
  const { data, isLoading } = useGetStudentStatisticsQuery()
  const { t } = useTranslation()

  if (isLoading) return <DashboardSkeleton />
  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={5.5} md={4} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.student.enrolled_courses')}
            value={data?.enrolledCourses}
            subtitle={t('dashboard.student.enrolled_courses_subtitle')}
            icon={<AutoStoriesOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={5.5} md={4} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.student.completed_courses')}
            value={data?.completedCourses}
            subtitle={t('dashboard.student.completed_courses_subtitle')}
            icon={<CheckCircleOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={5.5} md={4} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.student.certificates')}
            value={data?.certificates}
            subtitle={t('dashboard.student.certificates_subtitle')}
            icon={<WorkspacePremiumOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={5.5} md={4} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.student.enrolled_learning_paths')}
            value={data?.enrolledLearningPaths}
            subtitle={t('dashboard.student.enrolled_learning_paths_subtitle')}
            icon={<ExploreOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={5.5} md={4} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.student.completed_learning_paths')}
            value={data?.completedLearningPaths}
            subtitle={t('dashboard.student.completed_learning_paths_subtitle')}
            icon={<CheckCircleOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={5.5} md={4} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.student.attestations')}
            value={data?.attestation}
            subtitle={t('dashboard.student.attestations_subtitle')}
            icon={<EmojiEventsOutlinedIcon />}
          />
        </Grid>
      </Grid>

      <ExpensesBarChart data={data} />
    </>
  )
}

export default StudentDashboard
