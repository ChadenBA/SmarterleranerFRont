import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { CardRoot } from '../../../../pages/courses/courses.style'
import { useTranslation } from 'react-i18next'
import { FilterPriceProps } from './FilterPrice.type'

import { PRICE_FILTERS } from './FilterPrice.constants'
import { StyledTitle } from '@features/users/userProfile/UserProfile.style'

function FilterPrice({
  filtersQueryParams,
  handleFiltersChange,
}: FilterPriceProps) {
  const { t } = useTranslation()

  return (
    <CardRoot>
      <StyledTitle variant="h3">{t('course.price')}</StyledTitle>

      <RadioGroup>
        {PRICE_FILTERS.map((price) => {
          const isChecked = filtersQueryParams.filters?.some(
            (item) => item.id === Number(price.id) && item.name === 'price',
          )
          return (
            <FormControlLabel
              key={price.id}
              control={
                <Radio
                  checked={isChecked ? true : false}
                  value={price.id}
                  onChange={() =>
                    handleFiltersChange({
                      id: Number(price.id),
                      name: 'price',
                    })
                  }
                  name={price.label}
                />
              }
              label={t(price.label)}
            />
          )
        })}
      </RadioGroup>
    </CardRoot>
  )
}

export default FilterPrice
