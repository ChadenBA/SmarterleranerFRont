import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { BarChartProps } from './ExpensesBarChart.type'
import { Box, Typography, Divider } from '@mui/material'
import { styled } from '@mui/system'
import { DARK_COLORS, GREY } from '@config/colors/colors'

const ChartContainer = styled(Box)(({ theme }) => ({
  marginTop: '16px',
  padding: '16px',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? DARK_COLORS.background.paper
      : theme.palette.common.white,
  borderRadius: '8px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
}))

const ChartTitle = styled(Typography)(({ theme }) => ({
  marginBottom: '16px',
  color: theme.palette.mode === 'dark' ? GREY.light : GREY.main,
}))

const CustomDivider = styled(Divider)(({ theme }) => ({
  marginBottom: '16px',
  backgroundColor: theme.palette.mode === 'dark' ? GREY.dark : GREY.light,
}))

const valueFormatter = (value: number | null) => `$${value}`

const ExpensesLineChart: React.FC<BarChartProps> = ({ data }) => {
  const dataset = Object.keys(data?.totalPricePerMonth ?? {}).map((month) => ({
    month,
    expenses: data?.totalPricePerMonth[month],
  }))

  return (
    <ChartContainer>
      <ChartTitle variant="h6" gutterBottom>
        Expenses Overview
      </ChartTitle>
      <CustomDivider />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={dataset}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number) => valueFormatter(value)} />
          <Legend />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="rgba(255, 99, 132, 1)"
            activeDot={{ r: 8 }}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default ExpensesLineChart
