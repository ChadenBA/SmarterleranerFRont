import { LearningPath } from 'types/models/LearningPath'

export interface AllLearningPathsListProps {
  learningPaths?: LearningPath[]
  isLoading: boolean
  isDesigner?: boolean
  isInstructor?: boolean
}
