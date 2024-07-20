import { PieChart } from '@mui/x-charts/PieChart'
import { useTranslation } from 'react-i18next'
import { Container } from './PieChart.style'
import { PieChartProps } from './PieChart.type'

const PieChartComponent = ({ data }: PieChartProps) => {
  const { t } = useTranslation()
  const pieParams = { height: 200 }
  const palette = ['#ffcab0', '#9896f1', '#d59bf6', '#edb1f1']
  return (
    <Container>
      <PieChart
        colors={palette}
        {...pieParams}
        series={[
          {
            data: [
              {
                id: 0,
                value: data.enrolledStudentsInPrivateCourses,
                label: t('dashboard.designer.enrolled_private_courses'),
              },
              {
                id: 1,
                value: data.enrolledStudentsInPublicCourses,
                label: t('dashboard.designer.enrolled_public_courses'),
              },
              {
                id: 2,
                value: data.enrolledStudentsInPrivateLearningPaths,
                label: t('dashboard.designer.enrolled_private_learning_paths'),
              },
              {
                id: 3,
                value: data.enrolledStudentsInPublicLearningPaths,
                label: t('dashboard.designer.enrolled_public_learning_paths'),
              },
            ],
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
      />
    </Container>
  )
}

export default PieChartComponent
