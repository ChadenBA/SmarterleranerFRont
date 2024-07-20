import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi';
import { UseFormReturn } from 'react-hook-form';
import usePagination from 'src/hooks/usePagination';
import { CourseFormValues } from './CourseForm.type';

interface UseCourseForm {
  formMethods: UseFormReturn<CourseFormValues, any, undefined>;
}

export default function useCourseForm({ formMethods }: UseCourseForm) {
  const { setValue } = formMethods;

  // Initialize the usePagination hook
  const { queryParams } = usePagination();

  // Get the data from the useQuery hook
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery({
    ...queryParams,
    pagination: false,
  });


  // Map the data to the options
  const categoryOptions = categoriesData?.data.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }));

  return {
    isLoadingAdditinalData: isLoadingCategories,
    categoryOptions,
  };
}
