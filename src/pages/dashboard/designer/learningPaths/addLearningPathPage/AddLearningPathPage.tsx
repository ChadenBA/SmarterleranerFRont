import BodyCard from '@components/cards/bodyCard/BodyCard'
import LearningPathForm from '@features/learningPaths/addLearningPath/AddLearningPathForm'
import { useTranslation } from 'react-i18next'

function AddLearningPathPage() {
  const { t } = useTranslation()
  return (
    <BodyCard title={t('learning_path.add')} children={<LearningPathForm />} />
  )
}

export default AddLearningPathPage
