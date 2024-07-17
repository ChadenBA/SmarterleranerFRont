import CustomPagination from '@components/customPagination/CustomPagination'
import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import { CertificatesTableHeaders } from './StudentCertificatesTable.constants'
import usePagination from 'src/hooks/usePagination'
import useDebounce from 'src/hooks/useDebounce'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import StudentCertificatesRow from './studentCertificatesRow/StudentCertificatesRow'
import { useGetStudentCertificatesQuery } from '@redux/apis/courses/coursesApi'
import FallbackLoader from '@components/fallback/FallbackLoader'

function StudentCertificatesTable() {
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

  const { isFetching, data, isLoading } = useGetStudentCertificatesQuery({
    ...queryParams,
    keyword: debouncedSearchQuery,
  })
  if (isLoading) return <FallbackLoader />

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        hasSearch
        columns={CertificatesTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        handleSearchChange={handleSearchChange}>
        {data?.data?.map((certificate) => (
          <StudentCertificatesRow
            key={certificate.id}
            certificate={certificate}
          />
        ))}
      </CustomTable>
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
    </Stack>
  )
}

export default StudentCertificatesTable
