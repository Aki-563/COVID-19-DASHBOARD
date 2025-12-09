import './index.css'

const TopDistricts = props => {
  const {item, activeTab, index, color} = props

  // Map activeTab to the corresponding data key
  const metricMap = {
    1: 'confirmed',
    2: 'active',
    3: 'recovered',
    4: 'deceased',
  }
  const topWhat = metricMap[activeTab] || 'confirmed'

  // ESLint Fix: Removed nested ternary by using a lookup array
  // index 0 -> 'first-district', index 1 -> 'second-district', etc.
  const rankClassNames = ['first-district', 'second-district', 'third-district']
  const rankClass = rankClassNames[index] || ''

  return (
    <div className={`top-district-card ${rankClass}`}>
      <p
        style={{margin: '0'}}
        className={`${color} ${index <= 2 ? 'first-district-name' : ''}`}
      >
        {item.name}
      </p>
      <p style={{margin: '0'}}>{item[topWhat]}</p>
    </div>
  )
}

export default TopDistricts
