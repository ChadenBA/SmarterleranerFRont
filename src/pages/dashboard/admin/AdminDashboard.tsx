import StatisticsCard from '@components/statisticsCard/StatisticsCard';
import { useGetAdminStatisticsQuery } from '@redux/apis/dashboard/dashboardApi';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useTranslation } from 'react-i18next';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { Grid } from '@mui/material';
import DashboardSkeleton from '../DashboardSkeleton';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PieChartComponent from '@components/CustomCharts/pieChart/PieChart';

function AdminDashboard() {
  const { data, isLoading } = useGetAdminStatisticsQuery();
  const { t } = useTranslation();

  const pieChartData = data?.subscribersPerCourseCategory?.map((category) => ({
    title: category.category,
    value: category.subscribers,
  }));

  if (isLoading) return <DashboardSkeleton />;

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
            title={t('dashboard.admin.categories')}
            value={data?.categories}
            subtitle={t('dashboard.admin.categories_subtitle')}
            icon={<CategoryOutlinedIcon />}
          />
        </Grid>
      </Grid>
      
      <PieChartComponent data={pieChartData ?? []} />
    </>
  );
}

export default AdminDashboard;
