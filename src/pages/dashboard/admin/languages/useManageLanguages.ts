import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@redux/hooks'
import { showSuccess } from '@redux/slices/snackbarSlice'
import { IError } from 'types/interfaces/Error'
import useError from 'src/hooks/useError'
import { useCreateLanguageMutation } from '@redux/apis/languages/languagesApi'

export default function useManageLanguages() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)

  const LanguageFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })

  // Error handling Hook
  const { getError } = useError({
    formMethods: LanguageFormMethods,
  })

  // APIs CALLS
  const [createLanguageApiAction, { isLoading: isCreating }] =
    useCreateLanguageMutation()

  // OnClick on Add Category button
  const handleOnAdd = () => {
    setOpen(true)
    LanguageFormMethods.reset()
  }

  // Close Modal
  const handleCloseModal = () => {
    LanguageFormMethods.reset()
    setOpen(false)
  }

  // Submit Form
  const handleSubmit = LanguageFormMethods.handleSubmit(async (values) => {
    try {
      await createLanguageApiAction(values).unwrap()
      LanguageFormMethods.reset()
      dispatch(showSuccess(t('category.create_category_success')))

      handleCloseModal()
    } catch (error) {
      getError(error as IError)
    }
  })

  return {
    open,
    isCreating,
    LanguageFormMethods,
    handleOnAdd,
    handleCloseModal,
    handleSubmit,
  }
}
