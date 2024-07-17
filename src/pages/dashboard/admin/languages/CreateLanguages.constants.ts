import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { InputConfig } from 'types/interfaces/InputConfig'

export const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'En' },
  { label: 'French', value: 'Fr' },
  { label: 'Spanish', value: 'Es' },
  { label: 'German', value: 'De' },
  { label: 'Italian', value: 'It' },
  { label: 'Turkish', value: 'Tr' },
  { label: 'Russian', value: 'Ru' },
  { label: 'Arabic', value: 'Ar' },
]

export const CREATE_LANGUAGE_FORM_CONFIG: Record<string, InputConfig> = {
  language: {
    label: 'language.name',
    name: 'language',
    defaultValue: LANGUAGE_OPTIONS[0].value,
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: 'language.name_required',
    },
    options: LANGUAGE_OPTIONS,
  },
}
