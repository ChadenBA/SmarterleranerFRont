import { FiltersOption, QueryParams } from 'types/interfaces/QueryParams'

export interface FilterLanguagesProps {
  filtersQueryParams: QueryParams
  handleFiltersChange: (filter: FiltersOption) => void
}
