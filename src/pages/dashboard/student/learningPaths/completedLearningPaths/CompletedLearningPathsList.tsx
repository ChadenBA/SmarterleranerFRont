import CustomPagination from '@components/customPagination/CustomPagination'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useDebounce from 'src/hooks/useDebounce'
import usePagination from 'src/hooks/usePagination'
import { RootState } from '@redux/store'
import SearchSection from '@features/courses/searchSection/SearchSection'
import AllLearningPathsList from '@pages/dashboard/designer/learningPaths/allLearningPathsList.tsx/AllLearningPathsList'
import { useGetCompletedLearningPathsQuery } from '@redux/apis/learningPaths/learningPathsApi'

function CompletedLearningPathsList() {
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )

  const { isLoading, data } = useGetCompletedLearningPathsQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })

  const searchQuery = useSelector(
    (state: RootState) => state.appSlice.searchQuery,
  )

  useEffect(() => {
    if (searchQuery !== queryParams.keyword) {
      handleSearchChange(searchQuery)
    }
  }, [searchQuery])

  return (
    <>
      <SearchSection
        handleSearchChange={handleSearchChange}
        searchValue={queryParams.keyword}
      />
      <AllLearningPathsList isLoading={isLoading} learningPaths={data?.data} />
      {(data?.data?.length ?? 0) > 0 && (
        <CustomPagination
          page={queryParams.page}
          count={data?.meta.count || 0}
          rowsPerPage={queryParams.perPage}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </>
  )
}
export default CompletedLearningPathsList
