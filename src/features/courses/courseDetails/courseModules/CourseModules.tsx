import { useTranslation } from 'react-i18next'
import CourseModule from './CourseModule'
import { CourseContentProps } from './courseModules.type'
import RectangularCard from '@components/cards/rectangularCard/RectangularCard'

export const CourseModules = ({
  steps,
  isEnrolled,
}: CourseContentProps) => {
  const { t } = useTranslation()
  return (
    <RectangularCard title={t('course.modules')}>
      {steps.map((step) => (
        <CourseModule
          key={step.databaseId}
          title={step.title}
          media={step.media || []}
          duration={Number(step.duration)}
          section={step}
          isEnrolled={isEnrolled}
        />
      ))}
    </RectangularCard>
  )
}

export default CourseModules
