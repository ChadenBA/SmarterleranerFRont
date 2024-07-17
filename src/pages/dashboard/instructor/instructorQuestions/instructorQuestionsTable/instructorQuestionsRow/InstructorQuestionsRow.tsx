import { TableRow, TableCell, Tooltip, Stack } from '@mui/material'
import { t } from 'i18next'
import { useAppDispatch } from '@redux/hooks'
import { InstructorQuestionsRowProps } from './InstructorQuestionsRow.type'
import { Check, Close } from '@mui/icons-material'
import {
  useInvalidateExamMutation,
  useValidateExamMutation,
} from '@redux/apis/exam/examApi'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import { LoadingButton } from '@mui/lab'

function InstructorQuestionsRow({ exam }: InstructorQuestionsRowProps) {
  const dispatch = useAppDispatch()
  const [validateAnswer, { isLoading: isLoadingValidation }] =
    useValidateExamMutation()
  const [invalidateAnswer, { isLoading: isLoadingInvalidation }] =
    useInvalidateExamMutation()

  const handleValidateAnswer = async (id: number) => {
    try {
      await validateAnswer({ id }).unwrap()
      dispatch(showSuccess(t('exam.validated')))
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    }
  }
  const handleInvalidateAnswer = async (id: number) => {
    try {
      await invalidateAnswer({ id }).unwrap()
      dispatch(showSuccess(t('exam.invalidated')))
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    }
  }

  return (
    <>
      <TableRow key={exam.id}>
        <TableCell>{exam.question}</TableCell>
        <TableCell>{exam.openAnswer}</TableCell>
        <TableCell>
          <Stack direction={'row'} spacing={1}>
            <Tooltip title={t('common.correct')}>
              <LoadingButton
                onClick={() => handleValidateAnswer(exam.id)}
                loading={isLoadingValidation}
                sx={{ borderRadius: 1 }}
                color="success"
                variant="outlined">
                <Check />
              </LoadingButton>
            </Tooltip>
            <Tooltip title={t('common.wrong')}>
              <LoadingButton
                loading={isLoadingInvalidation}
                sx={{ borderRadius: 1 }}
                color="error"
                variant="outlined"
                onClick={() => handleInvalidateAnswer(exam.id)}>
                <Close />
              </LoadingButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  )
}

export default InstructorQuestionsRow
