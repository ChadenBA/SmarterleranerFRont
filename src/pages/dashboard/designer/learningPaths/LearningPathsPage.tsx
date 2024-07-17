import BodyCard from '@components/cards/bodyCard/BodyCard'
import { PATHS } from '@config/constants/paths'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import usePagination from 'src/hooks/usePagination'
import CustomPagination from '@components/customPagination/CustomPagination'
import useDebounce from 'src/hooks/useDebounce'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { useEffect } from 'react'
import SearchSection from '@features/courses/searchSection/SearchSection'
import AllLearningPathsList from './allLearningPathsList.tsx/AllLearningPathsList'
import { useGetLearningPathsForDesignerQuery } from '@redux/apis/learningPaths/learningPathsApi'
import NoDataFound from '@components/noDataFound/NoDataFound'
import CoursesListSkeleton from '@features/home/homeCourses/coursesList/coursesListSkeleton/CoursesListSkeleton'

function LearningPathsPage() {
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()

  const { t } = useTranslation()
  const navigate = useNavigate()

  const debouncedSearchQuery = useDebounce(
    queryParams.keyword,
    GLOBAL_VARIABLES.DEBOUNCE_TIME.MEDIUM,
  )
  const { isLoading, data } = useGetLearningPathsForDesignerQuery({
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

  if (isLoading) return <CoursesListSkeleton />

  if (!data) return <NoDataFound message={t('errors.no_data_found')} />
  return (
    <BodyCard
      title={t('learning_path.all')}
      buttonText={t('learning_path.add_learning_path')}
      onClick={() =>
        navigate(PATHS.DASHBOARD.DESIGNER.MY_LEARNING_PATHS.ADD_LEARNING_PATH)
      }>
      <SearchSection
        handleSearchChange={handleSearchChange}
        searchValue={queryParams.keyword}
      />
      <AllLearningPathsList
        isLoading={isLoading}
        learningPaths={data.data}
        isDesigner
      />
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
    </BodyCard>
  )
}

export default LearningPathsPage
