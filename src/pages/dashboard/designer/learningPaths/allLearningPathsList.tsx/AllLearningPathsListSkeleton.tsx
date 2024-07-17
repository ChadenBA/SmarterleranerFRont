import LearningPathCardSkeleton from '@features/learningPaths/learningPathsCard/courseCardSkeleton/LearningPathCardSkeleton'
import { Stack } from '@mui/material'

function LearningPathsListSkeleton() {
  return (
    <Stack
      direction={'row'}
      flexWrap={'wrap'}
      alignItems={'center'}
      justifyContent={'center'}>
      {[...Array(4)].map((_, index) => (
        <LearningPathCardSkeleton key={index} />
      ))}
    </Stack>
  )
}

export default LearningPathsListSkeleton
