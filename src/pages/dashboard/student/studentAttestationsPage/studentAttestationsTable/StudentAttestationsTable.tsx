import CustomPagination from '@components/customPagination/CustomPagination'
import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import { AttestationsTableHeaders } from './StudentAttestationsTable.constants'
import usePagination from 'src/hooks/usePagination'
import FallbackLoader from '@components/fallback/FallbackLoader'
import { useGetStudentAttestationsQuery } from '@redux/apis/learningPaths/learningPathsApi'
import StudentAttestationsRow from './studentAttestationsRow/StudentAttestationsRow'

function StudentAttestationsTable() {
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()

  const { isFetching, data, isLoading } =
    useGetStudentAttestationsQuery(queryParams)
  if (isLoading) return <FallbackLoader />

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        columns={AttestationsTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        handleSearchChange={handleSearchChange}>
        {data?.data?.map((attestation) => (
          <StudentAttestationsRow
            key={attestation.id}
            attestation={attestation}
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

export default StudentAttestationsTable
