import BodyCard from '@components/cards/bodyCard/BodyCard';
import Error from '@components/error/Error';
import FallbackLoader from '@components/fallback/FallbackLoader';
import AddCourseForm from '@features/courses/addCourse/AddCourseForm';
import { useGetCourseForAdminByIdQuery } from '@redux/apis/courses/coursesApi';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

function UpdateCoursePage() {
  const { t } = useTranslation();

  const { courseId } = useParams();

  const { data, isLoading, isFetching, isError } = useGetCourseForAdminByIdQuery(
    courseId as string,
  );

  if (isLoading) return <FallbackLoader />;

  if (isError) return <Error />;
  console.log('data', data);

  return (
    <BodyCard title={t('course.update_course')}>
      <AddCourseForm
        isEditMode
        courseDefaultValues={data?.data}
        id={courseId}
        isFetching={isFetching}
      />
    </BodyCard>
  );
}

export default UpdateCoursePage;
