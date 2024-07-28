import { StyledCategoriesButton } from '@components/buttons/customCategoriesButton/CustomCategoriesButton.style';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import usePagination from 'src/hooks/usePagination';

function SubcategoriesChoicePage() {
  const { queryParams } = usePagination();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Stack>
      <Typography variant="h1" sx={{ alignSelf: 'center', color: 'primary.main', marginTop: 2 }}>
        {t('home.choose_subcategory')}
      </Typography>
      <Stack
        direction="row"
        gap={4}
        sx={{
          margin: '50px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      ></Stack>
    </Stack>
  );
}

export default SubcategoriesChoicePage;
