import BodyCard from '@components/cards/bodyCard/BodyCard'
import InstructorQuestionsTable from './instructorQuestionsTable/InstructorQuestionsTable'
import { useTranslation } from 'react-i18next'

function InstructorQuestionPage() {
  const { t } = useTranslation()
  return (
    <BodyCard title={t('exam.questions')}>
      <InstructorQuestionsTable />
    </BodyCard>
  )
}

export default InstructorQuestionPage
