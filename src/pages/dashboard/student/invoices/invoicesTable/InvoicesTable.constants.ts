import { ColumnHeader } from 'types/interfaces/ColumHeader'

export const InvoicesTableHeaders: ColumnHeader[] = [
  {
    id: 1,
    label: 'invoice.ref',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 2,
    label: 'invoice.date',
    minWidth: 150,
    align: 'left',
  },
  {
    id: 3,
    label: 'invoice.total',
    minWidth: 150,
    align: 'left',
  },

  {
    id: 4,
    label: 'common.action',
    minWidth: 20,
    align: 'left',
  },
]
