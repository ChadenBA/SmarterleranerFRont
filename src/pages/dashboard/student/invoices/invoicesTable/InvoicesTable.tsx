import CustomPagination from '@components/customPagination/CustomPagination'
import CustomTable from '@components/customTable/CustomTable'
import { Stack } from '@mui/material'
import usePagination from 'src/hooks/usePagination'
import FallbackLoader from '@components/fallback/FallbackLoader'
import { useGetInvoicesQuery } from '@redux/apis/invoices/invoicesApi'
import { InvoicesTableHeaders } from './InvoicesTable.constants'
import InvoicesRow from './invoicesRow/InvoicesRow'

function InvoicesTable() {
  const {
    queryParams,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearchChange,
  } = usePagination()

  const { isFetching, data, isLoading } = useGetInvoicesQuery(queryParams)
  if (isLoading) return <FallbackLoader />

  return (
    <Stack direction={'column'} spacing={2}>
      <CustomTable
        columns={InvoicesTableHeaders}
        isLoading={isLoading}
        isFetching={isFetching}
        queryParams={queryParams}
        handleSearchChange={handleSearchChange}>
        {data?.data?.map((invoice) => (
          <InvoicesRow key={invoice.id} invoice={invoice} />
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

export default InvoicesTable
