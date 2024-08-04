import { useTranslation } from 'react-i18next';
import CourseEducationalUnit from './CourseEducationalUnit';
import { CourseContentProps } from './courseEducationalUnits.type';
import RectangularCard from '@components/cards/rectangularCard/RectangularCard';

export const CourseEducationalUnits = ({ eus, isEnrolled }: CourseContentProps) => {
  const { t } = useTranslation();
  return (
    <RectangularCard title={t('course.modules')}>
      {eus?.map((eu) => (
        <CourseEducationalUnit
          key={eu.id}
          los={eu.learningObjects}
          eu={eu}
          isEnrolled={isEnrolled}
        />
      ))}
    </RectangularCard>
  );
};

export default CourseEducationalUnits;
