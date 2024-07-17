import StatisticsCard from '@components/statisticsCard/StatisticsCard'
import { useGetAdminStatisticsQuery } from '@redux/apis/dashboard/dashboardApi'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { useTranslation } from 'react-i18next'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { Grid } from '@mui/material'
import DashboardSkeleton from '../DashboardSkeleton'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'

function AdminDashboard() {
  const { data, isLoading } = useGetAdminStatisticsQuery()
  const { t } = useTranslation()

  if (isLoading) return <DashboardSkeleton />
  return (
    <>
      <Grid container gap={2}>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.users')}
            value={data?.users}
            subtitle={t('dashboard.admin.users_subtitle')}
            icon={<AccountCircleOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.courses')}
            value={data?.courses}
            subtitle={t('dashboard.admin.courses_subtitle')}
            icon={<MenuBookOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.certificates')}
            value={data?.certificates}
            subtitle={t('dashboard.admin.certificates_subtitle')}
            icon={<WorkspacePremiumOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.learning_paths')}
            value={data?.learningPaths}
            subtitle={t('dashboard.admin.learning_paths_subtitle')}
            icon={<ExploreOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.attestation')}
            value={data?.attestations}
            subtitle={t('dashboard.admin.attestation_subtitle')}
            icon={<SchoolOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.categories')}
            value={data?.categories}
            subtitle={t('dashboard.admin.categories_subtitle')}
            icon={<CategoryOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.languages')}
            value={data?.languages}
            subtitle={t('dashboard.admin.languages_subtitle')}
            icon={<TranslateOutlinedIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3.8}>
          <StatisticsCard
            title={t('dashboard.admin.income')}
            value={`$${data?.income}`}
            subtitle={t('dashboard.admin.income_subtitle')}
            icon={<CurrencyExchangeOutlinedIcon />}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default AdminDashboard
