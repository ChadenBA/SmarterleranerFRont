import BodyCard from '@components/cards/bodyCard/BodyCard'
import { useTranslation } from 'react-i18next'
import LanguagesTable from './languagesTable/LanguagesTable'
import CustomFormDialog from '@components/dialogs/customFormDialog/CustomFormDialog'
import { FormProvider } from 'react-hook-form'
import { Stack } from '@mui/material'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import useManageLanguages from './useManageLanguages'
import CustomSelectField from '@components/Inputs/customSelectField/CustomSelectField'
import {
  CREATE_LANGUAGE_FORM_CONFIG,
} from './CreateLanguages.constants'

function LanguagesPage() {
  const { t } = useTranslation()
  const {
    LanguageFormMethods,
    isCreating,
    handleSubmit,
    handleCloseModal,
    handleOnAdd,
    open,
  } = useManageLanguages()

  return (
    <BodyCard
      title={t('language.languages')}
      buttonText={t('language.add_language')}
      onClick={handleOnAdd}>
      <LanguagesTable />
      <CustomFormDialog
        open={open}
        handleClose={handleCloseModal}
        title={'language.add_language'}>
        <FormProvider {...LanguageFormMethods}>
          <Stack spacing={2}>
            <CustomSelectField
              config={{
                ...CREATE_LANGUAGE_FORM_CONFIG.language,
              }}
            />
            <CustomLoadingButton isLoading={isCreating} onClick={handleSubmit}>
              {t('common.save')}
            </CustomLoadingButton>
          </Stack>
        </FormProvider>
      </CustomFormDialog>
    </BodyCard>
  )
}

export default LanguagesPage
