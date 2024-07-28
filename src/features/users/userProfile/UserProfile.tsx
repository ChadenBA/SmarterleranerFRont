import Error from '@components/error/Error';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { Grid, Stack } from '@mui/material';
import { useGetUserProfileQuery } from '@redux/apis/user/usersApi';
import { useTranslation } from 'react-i18next';
import { StyledSubTitle, StyledTitle } from './UserProfile.style';
import { useAppSelector } from '@redux/hooks';
import { UserRoleEnum } from '@config/enums/role.enum';

function UserProfile() {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetUserProfileQuery();

  const user = useAppSelector((state) => state.auth.user);

  if (isError) return <Error />;

  if (isLoading) return <FallbackLoader />;

  return (
    <Grid container p={2} gap={4}>
      <Grid item xs={12} display={'flex'}>
        <Grid item xs={12} sm={6}>
          <Stack mb={2}>
            <StyledTitle variant={'h3'}>{t('auth.first_name')}</StyledTitle>
            <StyledSubTitle variant={'body1'}>{data?.data.firstName}</StyledSubTitle>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack mb={2}>
            <StyledTitle variant={'h3'}>{t('auth.last_name')}</StyledTitle>
            <StyledSubTitle variant={'body1'}>{data?.data.lastName}</StyledSubTitle>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12} display={'flex'}>
        <Grid item xs={12} sm={6}>
          <Stack mb={2}>
            <StyledTitle variant={'h3'}>{t('auth.email')}</StyledTitle>
            <StyledSubTitle variant={'body1'}>{data?.data.email}</StyledSubTitle>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack mb={2}>
            <StyledTitle variant={'h3'}>{t('auth.registration_date')}</StyledTitle>
            <StyledSubTitle variant={'body1'}>{data?.data?.createdAt}</StyledSubTitle>
          </Stack>
        </Grid>
      </Grid>
      {user?.role === UserRoleEnum.USER && (
        <Grid item xs={12} display={'flex'}>
          <Grid item xs={12} sm={6}>
            <Stack mb={2}>
              <StyledTitle variant={'h3'}>{t('auth.major')}</StyledTitle>
              <StyledSubTitle variant={'body1'}>{data?.data.major}</StyledSubTitle>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack mb={2}>
              <StyledTitle variant={'h3'}>{t('auth.birthdate')}</StyledTitle>
              <StyledSubTitle variant={'body1'}>{data?.data?.birthDate}</StyledSubTitle>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default UserProfile;
