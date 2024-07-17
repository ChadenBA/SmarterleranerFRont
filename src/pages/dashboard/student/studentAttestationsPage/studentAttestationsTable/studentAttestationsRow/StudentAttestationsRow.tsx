import { TableRow, TableCell, Tooltip } from '@mui/material'
import { t } from 'i18next'
import { StudentAttestationsRowProps } from './StudentAttestationsRow.type'
import { Download } from '@mui/icons-material'
import { useDownloadAttestationMutation } from '@redux/apis/learningPaths/learningPathsApi'
import { showError } from '@redux/slices/snackbarSlice'
import { useAppDispatch } from '@redux/hooks'

function StudentAttestationsRow({ attestation }: StudentAttestationsRowProps) {
  const dispatch = useAppDispatch()
  const [downloadAttestation] = useDownloadAttestationMutation()

  const handleDownload = (id: number) => async () => {
    try {
      const blob = await downloadAttestation(id).unwrap()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `attestation.pdf`)
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
      <TableRow key={attestation.id}>
        <TableCell>{t(attestation.learningPath.title)}</TableCell>
        <TableCell>
          <Tooltip title={t('common.download')}>
            <Download
              color="info"
              cursor="pointer"
              onClick={handleDownload(attestation.learningPath.id)}
            />
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  )
}

export default StudentAttestationsRow
