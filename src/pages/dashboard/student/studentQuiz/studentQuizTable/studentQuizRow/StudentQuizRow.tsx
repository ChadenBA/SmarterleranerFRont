import { PATHS } from '@config/constants/paths'
import { TableRow, TableCell, Tooltip, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { StudentQuizRowProps } from './StudentQuizRow.type'
import QuizStatusChip from '../QuizStatusChip/QuizStatusChip'
import { GREY } from '@config/colors/colors'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useTranslation } from 'react-i18next'
import { StyledTitleCell, StyledWarningChip } from './StudentQuizRow.style'

function StudentQuizRow({ quiz }: StudentQuizRowProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const navigateToUserDetailPage = (id?: number) => {
    quiz?.quiz?.step?.course?.id != null
      ? navigate(`${PATHS.COURSES.ROOT}/${id}`)
      : navigate(`${PATHS.LEARNING_PATH.ROOT}/${id}`)
  }

  function calculateScorePercentage() {
    const scorePercentage = (quiz.score / quiz.totalScorePossible) * 100
    return scorePercentage % 1 !== 0
      ? scorePercentage.toFixed(2)
      : scorePercentage
  }
  return (
    <TableRow key={quiz.id}>
      <TableCell>
        <Typography color={GREY.main} mb={2}>
          {quiz.createAt}
        </Typography>
        <Tooltip title={quiz?.quiz?.step?.title}>
          <Stack direction={'row'} spacing={1}>
            {quiz?.quiz?.step?.title != null ? (
              <Typography color={GREY.main}>
                {t('section.quiz.quiz')}
              </Typography>
            ) : (
              <Typography color={GREY.main}>
                {t('section.quiz.exam')}
              </Typography>
            )}

            <ErrorOutlineIcon
              fontSize="small"
              sx={{ cursor: 'pointer', color: GREY.main }}
            />
          </Stack>
        </Tooltip>
      </TableCell>

      <StyledTitleCell
        onClick={() =>
          navigateToUserDetailPage(
            quiz?.quiz?.step?.id != null
              ? quiz?.quiz?.step?.course?.id
              : quiz?.quiz?.learningPath?.id,
          )
        }>
        {quiz?.quiz?.step?.course.title || quiz?.quiz?.learningPath?.title}
      </StyledTitleCell>

      <TableCell>{quiz.totalScorePossible}</TableCell>
      <TableCell>
        {quiz.needsReview ? (
          <StyledWarningChip label={t('section.quiz.pending')} />
        ) : (
          quiz.score
        )}
      </TableCell>
      <TableCell>
        {quiz?.needsReview ? (
          <StyledWarningChip label={t('section.quiz.pending')} />
        ) : (
          quiz.totalScorePossible
        )}
      </TableCell>
      <TableCell>
        {quiz.needsReview ? (
          <StyledWarningChip label={t('section.quiz.pending')} />
        ) : (
          `${calculateScorePercentage()}%`
        )}
      </TableCell>
      <TableCell>
        {quiz.needsReview ? (
          <StyledWarningChip label={t('section.quiz.pending')} />
        ) : (
          <QuizStatusChip status={quiz.passed ? 1 : 0} />
        )}
      </TableCell>
    </TableRow>
  )
}

export default StudentQuizRow
