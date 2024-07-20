import usePagination from 'src/hooks/usePagination';
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { CourseFormValues } from './CourseForm.type';
import { useState, useEffect } from 'react';

interface UseCourseForm {
  formMethods: UseFormReturn<CourseFormValues, undefined>;
}

export default function useCourseForm({ formMethods }: UseCourseForm) {
  // Watch the category field
  const { watch } = formMethods;

  // Initialize the usePagination hook
  const { queryParams } = usePagination();

  const [subCategoriesOption, setSubCategoriesOption] = useState<
    { label: string; value: number }[]
  >([]);

  // Get the data from the useQuery hook
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useGetCategoriesQuery({
    ...queryParams,
    pagination: false,
  });

  // Get the selected category from
  const selectedCategory = watch('category');

  // Set the subCategoriesOption based on the selected category
  useEffect(() => {
    if (selectedCategory) {
      const selectedCategoryData = categoriesData?.data.find((cat) => cat.id === selectedCategory);

      if (selectedCategoryData) {
        setSubCategoriesOption(
          selectedCategoryData.children.map((subCat) => ({
            label: subCat.title,
            value: subCat.id,
          })),
        );
      }
    }
  }, [selectedCategory, categoriesData]);

  // Map the data to the options
  const categoryOptions = categoriesData?.data.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }));

  //_________________________ Quiz Section ___________________________ //

  const { fields, append, move, remove, update } = useFieldArray({
    control: formMethods.control,
    name: 'quiz.questions',
  });

  console.log('fields', fields);
  const handleAddQuestion = (index: number) => {
    // Watch over the section object at the index
    const fieldToUpdate = formMethods.watch(`quiz`);

    // Update the Fields with the new object at the same index
    // With the new question added to the questions array
    // update(index, {
    //   ...fieldToUpdate,
    //   quiz: {
    //     questions: [...fieldToUpdate.quiz.questions, DEFAULT_QUESTION_OBJECT],
    //   },
    // });
  };

  const handleRemoveQuestion = (sectionIndex: number, questionIndex: number) => {
    const fieldToUpdate = formMethods.watch(`quiz`);
    // const updatedQuestions = [
    //   ...fieldToUpdate.quiz.questions.slice(0, questionIndex),
    //   ...fieldToUpdate.quiz.questions.slice(questionIndex + 1),
    // ];

    // update(sectionIndex, {
    //   ...fieldToUpdate,
    //   quiz: {
    //     ...fieldToUpdate.quiz,
    //     questions: updatedQuestions,
    //   },
    // });
  };

  return {
    isLoadingData: isLoadingCategories || isFetchingCategories,
    categoryOptions,
    selectedCategory,
    subCategoriesOption,
    handleAddQuestion,
    handleRemoveQuestion,
    fields,
  };
}
