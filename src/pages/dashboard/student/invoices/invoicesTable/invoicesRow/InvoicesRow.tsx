import { TableRow, TableCell, Tooltip } from '@mui/material'
import { t } from 'i18next'
import { Download } from '@mui/icons-material'
import { InvoicesRowProps } from './InvoicesRow.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useDownloadInvoiceMutation } from '@redux/apis/invoices/invoicesApi'
import { showError } from '@redux/slices/snackbarSlice'
import { useAppDispatch } from '@redux/hooks'

function InvoicesRow({ invoice }: InvoicesRowProps) {
  const dispatch = useAppDispatch()
  const [downloadInvoice] = useDownloadInvoiceMutation()

  const handleDownload = (id: number) => async () => {
    try {
      const blob = await downloadInvoice(id).unwrap()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `invoice-${id}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    }
  }

  return (
    <>
      <TableRow key={invoice.id}>
        <TableCell>#{invoice.id}</TableCell>
        <TableCell>{invoice.createdAt}</TableCell>
        <TableCell>
          {GLOBAL_VARIABLES.CURRENCY} {invoice.total}
        </TableCell>
        <TableCell>
          <Tooltip title={t('common.download')}>
            <Download
              color="info"
              cursor="pointer"
              onClick={handleDownload(invoice.id)}
            />
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  )
}

export default InvoicesRow
