import StatisticsCard from '@components/statisticsCard/StatisticsCard'
import { useGetDesignerStatisticsQuery } from '@redux/apis/dashboard/dashboardApi'
import { useTranslation } from 'react-i18next'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import { Grid } from '@mui/material'
import DashboardSkeleton from '../DashboardSkeleton'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined'
import PieChartComponent from '@components/CustomCharts/pieChart/PieChart'

function DesignerDashboard() {
  const { data, isLoading } = useGetDesignerStatisticsQuery()
  const { t } = useTranslation()
  const pieChartData = {
    enrolledStudentsInPrivateCourses: data?.enrolledStudentsInPrivateCourses,
    enrolledStudentsInPublicCourses: data?.enrolledStudentsInPublicCourses,
    enrolledStudentsInPrivateLearningPaths:
      data?.enrolledStudentsInPrivateLearningPaths,
    enrolledStudentsInPublicLearningPaths:
      data?.enrolledStudentsInPublicLearningPaths,
  }
  if (isLoading) return <DashboardSkeleton />
  return (
    <>
      <Grid container gap={1}>
        <Grid item xs={12} md={5.8} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.designer.private_courses')}
            value={data?.privateCourses}
            subtitle={t('dashboard.designer.private_courses_subtitle')}
            icon={<SecurityOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={5.8} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.designer.public_courses')}
            value={data?.publicCourses}
            subtitle={t('dashboard.designer.public_courses_subtitle')}
            icon={<PublicOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={12} md={5.8} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.designer.public_learning_paths')}
            value={data?.publicLearningPaths}
            subtitle={t('dashboard.designer.public_learning_paths_subtitle')}
            icon={<PublicOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={5.8} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.designer.private_learning_paths')}
            value={data?.privateLearningPaths}
            subtitle={t('dashboard.designer.private_learning_paths_subtitle')}
            icon={<SecurityOutlinedIcon />}
          />
        </Grid>

        <Grid item xs={12} md={5.8} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.designer.total_price')}
            value={`$${data?.totalPrice}`}
            subtitle={t('dashboard.designer.total_price_subtitle')}
            icon={<AccountBalanceWalletOutlinedIcon />}
          />
        </Grid>
      </Grid>
      <PieChartComponent
        data={{
          enrolledStudentsInPrivateCourses:
            pieChartData.enrolledStudentsInPrivateCourses ?? 0,
          enrolledStudentsInPublicCourses:
            pieChartData.enrolledStudentsInPublicCourses ?? 0,
          enrolledStudentsInPrivateLearningPaths:
            pieChartData.enrolledStudentsInPrivateLearningPaths ?? 0,
          enrolledStudentsInPublicLearningPaths:
            pieChartData.enrolledStudentsInPublicLearningPaths ?? 0,
        }}
      />
    </>
  )
}

export default DesignerDashboard
