import { useTranslation } from 'react-i18next';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { Autocomplete, Button, TextField, Stack, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import BodyCard from '@components/cards/bodyCard/BodyCard';
import CategoriesTable from './categoriesTable/CategoriesTable';
import CustomFormDialog from '@components/dialogs/customFormDialog/CustomFormDialog';
import FallbackLoader from '@components/fallback/FallbackLoader';
import useManageCategories from './useManageCategories';
import Link from '@components/typographies/link/link';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { DialogFormNamesEnum } from './CategoriesPage.consts';
import { Category } from 'types/models/Category';

//TODO FIX PAGINATION BUG
//TODO FIX USER DISPLAY BUG

function CategoriesPage() {
  const { t } = useTranslation();
  const { open, isEditMode, isLoadingCategory, handleOnAdd, handleOnEdit, handleCloseModal } =
    useManageCategories();

  const methods = useForm<Category>({
    defaultValues: {
      title: '',
      children: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: DialogFormNamesEnum.CHILDREN,
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <BodyCard
      title={t('category.categories')}
      buttonText={t('category.add_category')}
      onClick={handleOnAdd}
    >
      <CategoriesTable onEdit={handleOnEdit} />
      <CustomFormDialog
        open={open}
        handleClose={handleCloseModal}
        title={isEditMode ? t('category.edit_category') : t('category.add_category')}
      >
        {isLoadingCategory ? (
          <FallbackLoader />
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <Stack spacing={2}>
                <Autocomplete
                  freeSolo
                  options={[]}
                  renderInput={(params) => (
                    <TextField {...params} label={t('category.category')} variant="outlined" />
                  )}
                  onChange={(event, newValue) =>
                    methods.setValue(
                      DialogFormNamesEnum.TITLE,
                      newValue ? newValue : GLOBAL_VARIABLES.EMPTY_STRING,
                    )
                  }
                />
                <Link onClick={() => append({ title: '' })}>{t('category.add_sub_category')}</Link>
                {fields.map((field, index) => (
                  <Stack key={field.id} direction="row" spacing={1} alignItems="center">
                    <Autocomplete
                      freeSolo
                      options={[]}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('category.sub_category')}
                          variant="outlined"
                          fullWidth
                        />
                      )}
                      onChange={(event, newValue) =>
                        methods.setValue(
                          `${DialogFormNamesEnum.CHILDREN}[${index}].${DialogFormNamesEnum.TITLE}` as keyof Category,
                          newValue || GLOBAL_VARIABLES.EMPTY_STRING,
                        )
                      }
                    />
                    <IconButton onClick={() => remove(index)}>
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                ))}
                <Button type="submit" variant="contained" color="primary">
                  {isEditMode ? t('common.update') : t('common.save')}
                </Button>
              </Stack>
            </form>
          </FormProvider>
        )}
      </CustomFormDialog>
    </BodyCard>
  );
}

export default CategoriesPage;
