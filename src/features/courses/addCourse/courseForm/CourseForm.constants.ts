import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { InputConfig, InputOption } from 'types/interfaces/InputConfig';

export const BOOLEAN_OPTIONS: InputOption[] = [
  { label: 'common.yes', value: 1 },
  { label: 'common.no', value: 0 },
];

export const CREATE_COURSE_FORM_CONFIG: Record<string, InputConfig> = {
  title: {
    name: 'title',
    placeholder: 'course.title_placeholder',
    label: 'course.title',
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'course.title_required' },
  },
  description: {
    name: 'description',
    placeholder: 'course.description_placeholder',
    label: 'course.description',
    type: 'textarea',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'course.description_required' },
  },
  category: {
    name: 'categoryId',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.category',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: 'course.category_required',
    },
  },
  subcategory: {
    name: 'subcategoryId',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.subcategory',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: 'course.subcategory_required',
    },
  },


};
