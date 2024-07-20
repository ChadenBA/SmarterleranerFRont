import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { CardRoot } from '@pages/courses/courses.style'
import { useTranslation } from 'react-i18next'
import { FilterTeachingTypeProps } from './FilterTeachingType.type'
import { TEACHING_TYPE_FILTERS } from './FiltersTeachingType.constants'
import { StyledTitle } from '@features/users/userProfile/UserProfile.style'

function FilterTeachingType({
  filtersQueryParams,
  handleFiltersChange,
}: FilterTeachingTypeProps) {
  const { t } = useTranslation()

  return (
    <CardRoot>
      <StyledTitle variant="h3">{t('course.teaching_type')}</StyledTitle>

      <RadioGroup>
        {TEACHING_TYPE_FILTERS.map((teachingType) => {
          const isChecked = filtersQueryParams.filters?.some(
            (item) =>
              item.id === Number(teachingType.id) &&
              item.name === 'teachingType',
          )
          return (
            <FormControlLabel
              key={teachingType.id}
              control={
                <Radio
                  checked={isChecked ? true : false}
                  value={teachingType.id}
                  onChange={() =>
                    handleFiltersChange({
                      id: Number(teachingType.id),
                      name: 'teachingType',
                    })
                  }
                  name={teachingType.label}
                />
              }
              label={t(teachingType.label)}
            />
          )
        })}
      </RadioGroup>
    </CardRoot>
  )
}

export default FilterTeachingType
