import StatisticsCard from '@components/statisticsCard/StatisticsCard';
import { useGetStudentStatisticsQuery } from '@redux/apis/dashboard/dashboardApi';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { useTranslation } from 'react-i18next';

import { Grid } from '@mui/material';
import DashboardSkeleton from '../DashboardSkeleton';
import Resultp from '@pages/silvermanResult/SilvermanResult';
import BodyCard from '@components/cards/bodyCard/BodyCard';

function StudentDashboard() {
  const { data, isLoading } = useGetStudentStatisticsQuery();
  const { t } = useTranslation();

  if (isLoading) return <DashboardSkeleton />;
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
        <BodyCard title={t('common.learning_style')}>
          <Resultp />
        </BodyCard>
      </Grid>
    </>
  );
}

export default StudentDashboard;
