import { PATHS } from '@config/constants/paths'
import { LearningPathTabsProps } from './LearningPathsTabs.type'

export const LearningPathTabsStep: LearningPathTabsProps[] = [
  {
    label: 'learning_path.enrolled_learning_paths',
    path: PATHS.DASHBOARD.STUDENT.MY_LEARNING_PATHS.ROOT,
    value: 0,
  },
  {
    label: 'learning_path.completed_learning_paths',
    path: PATHS.DASHBOARD.STUDENT.MY_LEARNING_PATHS.COMPLETED_LEARNING_PATHS,
    value: 1,
  },
]
