import { useTranslation } from 'react-i18next'
import { CardRoot } from '../../../../pages/courses/courses.style'
import usePagination from 'src/hooks/usePagination'
import {
  Collapse,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useState } from 'react'
import { StyledExpandIcon } from '@components/styledExpandIcon/styledExpandIcon.style'
import { StyledTitle } from '@features/users/userProfile/UserProfile.style'
import { useGetFilterLanguagesQuery } from '@redux/apis/languages/languagesApi'
import { FilterLanguagesProps } from './FilterLanguages.type'

function FilterLanguages({
  filtersQueryParams,
  handleFiltersChange,
}: FilterLanguagesProps) {
  const { t } = useTranslation()
  const { queryParams } = usePagination()
  const { data: response } = useGetFilterLanguagesQuery({
    ...queryParams,
    keyword: GLOBAL_VARIABLES.EMPTY_STRING,
  })

  const [isOpened, setIsOpened] = useState(true)

  const onCollapseClick = () => setIsOpened((prev) => !prev)

  const languages = response?.data

  if (languages?.length === 0) return <CardRoot />

  return (
    <CardRoot>
      <Stack
        direction="row"
        justifyContent={'space-between'}
        alignItems={'center'}>
        <StyledTitle variant="h3">{t('course.languages')}</StyledTitle>
        <IconButton onClick={onCollapseClick}>
          <StyledExpandIcon
            isopened={
              isOpened
                ? GLOBAL_VARIABLES.TRUE_STRING
                : GLOBAL_VARIABLES.FALSE_STRING
            }
          />
        </IconButton>
      </Stack>
      <Collapse in={isOpened} timeout={700}>
        <RadioGroup>
          {languages?.map((language) => {
            const isChecked = filtersQueryParams.filters?.some(
              (item) => item.id === language.id && item.name === 'language',
            )
            return (
              <FormControlLabel
                key={language.id}
                control={
                  <Radio
                    checked={isChecked ? true : false}
                    value={language.id}
                    onChange={() =>
                      handleFiltersChange({ id: language.id, name: 'language' })
                    }
                    name={language.language}
                  />
                }
                label={t(language.language)}
              />
            )
          })}
        </RadioGroup>
      </Collapse>
    </CardRoot>
  )
}

export default FilterLanguages
