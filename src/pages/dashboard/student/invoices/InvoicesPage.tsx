import BodyCard from '@components/cards/bodyCard/BodyCard'
import { useTranslation } from 'react-i18next'
import InvoicesTable from './invoicesTable/InvoicesTable'

function InvoicesPage() {
  const { t } = useTranslation()
  return (
    <BodyCard title={t('invoice.title')}>
      <InvoicesTable />
    </BodyCard>
  )
}

export default InvoicesPage
