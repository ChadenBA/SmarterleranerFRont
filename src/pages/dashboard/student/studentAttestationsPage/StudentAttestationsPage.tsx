import BodyCard from '@components/cards/bodyCard/BodyCard'
import { useTranslation } from 'react-i18next'
import StudentAttestationsTable from './studentAttestationsTable/StudentAttestationsTable'

function StudentAttestationsPage() {
  const { t } = useTranslation()

  return (
    <BodyCard title={t('learning_path.attestations')}>
      <StudentAttestationsTable />
    </BodyCard>
  )
}

export default StudentAttestationsPage
