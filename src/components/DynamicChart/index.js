import React, {useMemo} from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts'
import './index.css'

const DynamicChart = ({dynamicChartData, activeTab}) => {
  // Sort by date
  const sortedData = useMemo(() => {
    if (!dynamicChartData) return []
    return [...dynamicChartData].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    )
  }, [dynamicChartData])

  // Format date for X-axis
  const formatDateTick = dateStr => {
    const date = new Date(dateStr)
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'short',
    })}`
  }

  // Format large number labels
  const formatDataLabel = value => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
    return value
  }

  // Chart color
  const colorMap = {
    1: '#ff6b6b',
    2: '#4d96ff',
    3: '#6bcb77',
    4: '#a0aec0',
  }

  const color = colorMap[activeTab] || '#ff6b6b'

  // Tooltip component (fixed ESLint destructuring)
  const CustomTooltip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
      const {dataKey: key, value} = payload[0] // ✔ Fixed ESLint destructuring

      return (
        <div
          style={{
            background: '#1f1f1f',
            padding: '10px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            border: '1px solid #333',
          }}
        >
          <p style={{margin: 0, fontWeight: 'bold', marginBottom: '4px'}}>
            {formatDateTick(label)}
          </p>
          <p style={{margin: 0}}>
            {key}: {value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  // Identify bar key
  const dynamicKey =
    sortedData.length > 0
      ? Object.keys(sortedData[0]).find(k => k !== 'date')
      : ''

  if (!sortedData.length) {
    return (
      <div className="static-chart" style={{textAlign: 'center'}}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{width: '100%'}} className="static-charts-container">
      <div className="static-chart" style={{marginBottom: 0}}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={sortedData}
            margin={{top: 25, right: 0, left: 0, bottom: 5}}
          >
            <XAxis
              dataKey="date"
              tickFormatter={formatDateTick}
              tick={{fontSize: 12, fill: '#ccc'}}
              minTickGap={20}
              axisLine={false}
              tickLine={false}
              dy={10}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{fill: 'rgba(255,255,255,0.1)'}}
            />

            <Legend wrapperStyle={{paddingTop: '20px'}} />

            <Bar
              dataKey={dynamicKey}
              fill={color}
              activeBar={
                <Rectangle fill={color} stroke="#fff" strokeWidth={2} />
              }
              radius={[6, 6, 6, 6]}
              maxBarSize={60}
            >
              <LabelList
                dataKey={dynamicKey}
                position="top"
                fill="#e5e7eb"
                formatter={formatDataLabel}
                style={{fontSize: '12px', fontWeight: 'bold'}}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DynamicChart
