import BodyCard from '@components/cards/bodyCard/BodyCard'
import SupportForm from '@features/support/SupportForm'
import { useTranslation } from 'react-i18next'

function SupportPage() {
  const { t } = useTranslation()
  return (
    <BodyCard title={t('support.support')}>
      <SupportForm />
    </BodyCard>
  )
}

export default SupportPage
