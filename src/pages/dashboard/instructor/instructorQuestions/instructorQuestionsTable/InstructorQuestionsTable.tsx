import CustomPagination from '@components/customPagination/CustomPagination'
import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import usePagination from 'src/hooks/usePagination'
import FallbackLoader from '@components/fallback/FallbackLoader'
import { QuestionsTableHeaders } from './InstructorQuestionsTable.constants'
import InstructorQuestionsRow from './instructorQuestionsRow/InstructorQuestionsRow'
import { useGetExamsAnswersQuery } from '@redux/apis/exam/examApi'

function InstructorQuestionsTable() {
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()

  const { isFetching, data, isLoading } = useGetExamsAnswersQuery(queryParams)
  if (isLoading) return <FallbackLoader />

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        columns={QuestionsTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        handleSearchChange={handleSearchChange}>
        {data?.data?.map((exam) => (
          <InstructorQuestionsRow key={exam.id} exam={exam} />
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

export default InstructorQuestionsTable
