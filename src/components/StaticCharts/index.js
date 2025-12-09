import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

import './index.css'

// Layout Constants
const LEFT_AXIS_WIDTH = 45
const RIGHT_AXIS_WIDTH = 45
const BASE_MARGIN = 20

const formatDateTick = dateString => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const formatNumber = num => {
  if (num > 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num > 1000) return `${(num / 1000).toFixed(1)}K`
  return num
}

const formatCovidData = dataObj => {
  if (!dataObj) return []

  const result = []
  const sortedDates = Object.keys(dataObj).sort(
    (a, b) => new Date(a) - new Date(b),
  )

  // ESLint Fix: Use forEach instead of for...of loop
  sortedDates.forEach(date => {
    const day = dataObj[date]
    if (day && day.total) {
      const Confirmed = Number(day.total.confirmed || 0)
      const Recovered = Number(day.total.recovered || 0)
      const Deceased = Number(day.total.deceased || 0)
      const Active = Confirmed - (Recovered + Deceased)
      const Vaccinated1 = Number(day.total.vaccinated1 || 0)
      const Vaccinated2 = Number(day.total.vaccinated2 || 0)

      result.push({
        date,
        Confirmed,
        Recovered,
        Deceased,
        Active,
        Vaccinated1,
        Vaccinated2,
      })
    }
  })

  return result
}

const CustomTooltip = ({active, payload, label}) => {
  if (active && payload && payload.length) {
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
        <p style={{margin: 0, fontWeight: 'bold', marginBottom: '8px'}}>
          {formatDateTick(label)}
        </p>
        {payload.map(entry => (
          <p
            key={entry.name || entry.dataKey}
            style={{margin: '4px 0', color: entry.color}}
          >
            <span style={{textTransform: 'capitalize'}}>
              {entry.name || entry.dataKey}
            </span>
            : {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const StaticCharts = props => {
  const {chartsData} = props
  const dates = chartsData?.dates
  const covidData = formatCovidData(dates)

  if (covidData.length === 0) {
    return <div style={{color: 'white', padding: '20px'}}>Loading chart...</div>
  }

  return (
    <div style={{width: '100%'}} className="static-charts-container">
      {/* CHART 1: Confirmed vs Recovered */}
      <div style={{width: '100%'}} className="static-chart">
        <h3 style={{color: '#ccc', fontSize: '14px', paddingLeft: '20px'}}>
          Confirmed vs Recovered
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={covidData}
            margin={{
              top: 5,
              right: BASE_MARGIN + RIGHT_AXIS_WIDTH,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.1}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateTick}
              tick={{fontSize: 10}}
              minTickGap={50}
            />
            <YAxis
              tick={{fontSize: 12}}
              domain={['dataMin', 'dataMax']}
              tickFormatter={formatNumber}
              width={LEFT_AXIS_WIDTH}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{stroke: '#ffffff20', strokeWidth: 1}}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Confirmed"
              stroke="#ff6b6b"
              strokeWidth={2}
              dot={false}
              activeDot={{r: 6}}
            />
            <Line
              type="monotone"
              dataKey="Recovered"
              stroke="#6bcb77"
              strokeWidth={2}
              dot={false}
              activeDot={{r: 6}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CHART 2: Active vs Deceased */}
      <div style={{width: '100%'}} className="static-chart">
        <h3 style={{color: '#ccc', fontSize: '14px', paddingLeft: '20px'}}>
          Active vs Deceased
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={covidData}
            margin={{top: 5, right: BASE_MARGIN, left: 0, bottom: 5}}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.1}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateTick}
              tick={{fontSize: 10}}
              minTickGap={50}
            />
            <YAxis
              yAxisId="left"
              tick={{fontSize: 12}}
              domain={['auto', 'auto']}
              tickFormatter={formatNumber}
              width={LEFT_AXIS_WIDTH}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{fontSize: 12}}
              domain={['auto', 'auto']}
              tickFormatter={formatNumber}
              width={RIGHT_AXIS_WIDTH}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{stroke: '#ffffff20', strokeWidth: 1}}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Active"
              stroke="#007bff"
              strokeWidth={2}
              dot={false}
              activeDot={{r: 6}}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Deceased"
              stroke="#ff4d4d"
              strokeWidth={2}
              dot={false}
              activeDot={{r: 6}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CHART 3: Vaccination Progress (Area Chart) */}
      <div style={{width: '100%'}} className="static-chart-last">
        <h3 style={{color: '#ccc', fontSize: '14px', paddingLeft: '20px'}}>
          Vaccination Progress (Dose 1 vs Dose 2)
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={covidData}
            margin={{
              top: 5,
              right: BASE_MARGIN + RIGHT_AXIS_WIDTH,
              left: 0,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorDose1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDose2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickFormatter={formatDateTick}
              tick={{fontSize: 10}}
              minTickGap={50}
            />
            <YAxis
              tickFormatter={num => `${(num / 1000000).toFixed(1)}M`}
              tick={{fontSize: 12}}
              width={LEFT_AXIS_WIDTH}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.1}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="Vaccinated1"
              name="At Least 1 Dose"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorDose1)"
            />
            <Area
              type="monotone"
              dataKey="Vaccinated2"
              name="Fully Vaccinated"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorDose2)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StaticCharts
