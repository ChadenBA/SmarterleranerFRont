import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import { BLUE } from '@config/colors/colors';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import { useUpdateProfileMutation } from '@redux/apis/user/usersApi';
import { useTranslation } from 'react-i18next';
import { SIGNUP_FORM_CONFIG } from '@features/auth/signup/SignupForm.constants';
import { FormProvider, useForm } from 'react-hook-form';
import UploadInput from '@components/Inputs/uploadInput/UploadInput';
import useUploadFile from 'src/hooks/useUploadFile';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { showSuccess } from '@redux/slices/snackbarSlice';
import { IError } from 'types/interfaces/Error';
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton';
import CustomPasswordTextField from '@components/Inputs/customPasswordTextField/CustomPasswordTextField';
import useError from 'src/hooks/useError';
import { StyledSubTitle } from '../userProfile/UserProfile.style';
import { UserRoleEnum } from '@config/enums/role.enum';

function EditProfile() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const media = useAppSelector((state) => state.auth.media);
  const UserFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  });
  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods: UserFormMethods,
    fieldName: 'profilePicture',
    initPreview: String(media?.fileName),
    id: media?.id,
    index: 0,
  });

  const { getError } = useError({
    formMethods: UserFormMethods,
  });

  const [updateProfileApiAction, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const onSubmit = UserFormMethods.handleSubmit(async (values) => {
    try {
      await updateProfileApiAction(values).unwrap();
      dispatch(showSuccess(t('users.profile_updated_successfully')));
      UserFormMethods.setValue('deletedFilesId', null);
    } catch (error) {
      getError(error as IError);
    }
  });

  return (
    <>
      <Stack mb={2} spacing={2}>
        <StyledSubTitle variant={'h3'}>{t('users.personal_information')}</StyledSubTitle>
        <Typography variant={'body2'}>{t('users.personal_information_description')}</Typography>
        <Divider />
      </Stack>
      <FormProvider {...UserFormMethods}>
        <Grid container p={2} gap={4}>
          <Grid item xs={12} display={'flex'} gap={2}>
            <Grid item xs={12} sm={6}>
              <Stack mb={2}>
                <CustomTextField
                  config={{
                    ...SIGNUP_FORM_CONFIG.firstName,
                    defaultValue: user?.firstName || GLOBAL_VARIABLES.EMPTY_STRING,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack mb={2}>
                <CustomTextField
                  config={{
                    ...SIGNUP_FORM_CONFIG.lastName,
                    defaultValue: user?.lastName || GLOBAL_VARIABLES.EMPTY_STRING,
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} display={'flex'} gap={2}>
            <Grid item xs={12} sm={6}>
              <Stack mb={2}>
                <CustomTextField
                  config={{
                    ...SIGNUP_FORM_CONFIG.email,
                    defaultValue: user?.email || GLOBAL_VARIABLES.EMPTY_STRING,
                    disabled: true,
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          {user?.role === UserRoleEnum.USER && (
            <Grid item xs={12} display={'flex'} gap={2}>
              <Grid item xs={12} sm={6}>
                <Stack mb={2}>
                  <CustomTextField
                    config={{
                      ...SIGNUP_FORM_CONFIG.major,
                      defaultValue: user?.major || GLOBAL_VARIABLES.EMPTY_STRING,
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack mb={2}>
                  <CustomTextField
                    config={{
                      ...SIGNUP_FORM_CONFIG.birthdate,
                      defaultValue: user?.birthDate || GLOBAL_VARIABLES.EMPTY_STRING,
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Divider />
        <Typography variant={'h3'} fontWeight={'medium'} color={BLUE.main}>
          {t('users.update_profile_picture')}
        </Typography>
        <Stack width={'400px'}>
          <UploadInput onChange={handleOnChange} onDelete={handleResetPreview} preview={preview} />
        </Stack>
        <Divider />
        <Typography variant={'h3'} fontWeight={'medium'} color={BLUE.main}>
          {t('users.update_password')}
        </Typography>
        <Stack spacing={2}>
          <CustomPasswordTextField
            config={{
              ...SIGNUP_FORM_CONFIG.password,
              rules: {
                required: false,
              },
            }}
          />
          <CustomPasswordTextField
            config={{
              ...SIGNUP_FORM_CONFIG.passwordConfirmation,
            }}
          />
        </Stack>
        <Divider />
        <CustomLoadingButton isLoading={isUpdating} onClick={onSubmit}>
          {t('users.update_profile')}
        </CustomLoadingButton>
      </FormProvider>
    </>
  );
}

export default EditProfile;
