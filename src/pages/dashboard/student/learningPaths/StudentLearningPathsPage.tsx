import BodyCard from '@components/cards/bodyCard/BodyCard'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import LearningPathTabs from './learningPathsTabs/LearningPathsTabs'

function StudentLearninPathsPage() {
  const { t } = useTranslation()
  return (
    <BodyCard title={t('learning_path.enrolled_learning_paths')}>
      <LearningPathTabs />
      <Outlet />
    </BodyCard>
  )
}

export default StudentLearninPathsPage
