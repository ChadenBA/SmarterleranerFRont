import { useTranslation } from 'react-i18next'
import NoDataFound from '@components/noDataFound/NoDataFound'
import { Stack } from '@mui/material'
import { AllLearningPathsListProps } from './AllLearningPathsList.type'
import LearningPathCard from '@features/learningPaths/learningPathsCard/LearningPathCard'
import LearningPathsListSkeleton from './AllLearningPathsListSkeleton'

function AllLearningPathsList({
  learningPaths,
  isLoading,
  isDesigner,
  isInstructor,
}: AllLearningPathsListProps) {
  const { t } = useTranslation()


  if (isLoading) return <LearningPathsListSkeleton />

  if (learningPaths?.length === 0)
    return <NoDataFound message={t('home.no_course_found')} />

  return (
    <Stack
      direction={'row'}
      flexWrap={'wrap'}
      alignItems={'center'}
      justifyContent={'flex-start'}>
      {Boolean(learningPaths) &&
        learningPaths?.map((learningPath) => (
          <LearningPathCard
            key={learningPath.id}
            id={learningPath.id}
            isActive={learningPath?.isActive}
            image={learningPath?.media[0].fileName}
            isOffline={learningPath.isOffline}
            learningPathTitle={learningPath.title}
            learningPathPrice={learningPath.price}
            coursesCount={learningPath.coursesCount}
            createdAt={learningPath.createdAt}
            isDesigner={isDesigner}
            isInstructor={isInstructor}
            isEnrolled={learningPath.isSubscribed}
            category={learningPath.category.category}
            language={learningPath.language.language}
            isCompleted={learningPath.isCompleted}
            isPaid={learningPath.price > 0 ? 1 : 0}
            description={learningPath.description}
          />
        ))}
    </Stack>
  )
}

export default AllLearningPathsList
