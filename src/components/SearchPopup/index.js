import './index.css'
import {Link} from 'react-router-dom'

const SearchPopup = props => {
  const {search, statesinfo, highlightIndex} = props

  const searchRes = statesinfo.filter(item =>
    item.stateName.toLowerCase().includes(search.toLowerCase()),
  )

  // Simplified sort logic (Removed redundant ternary)
  const topActiveStates = [...statesinfo]
    .sort((a, b) => {
      const activeA = a.confirmed - a.recovered - a.deceased - a.other
      const activeB = b.confirmed - b.recovered - b.deceased - b.other
      return activeB - activeA
    })
    .slice(0, 6)

  const renderTrending = () => (
    <div>
      <h3 className="search-trending-heading">TOP ACTIVE CASES</h3>
      <ul className="popup-item">
        {topActiveStates.map((item, index) => (
          <Link
            className="link-items"
            to={`state/${item.stateCode}`}
            key={item.stateCode}
          >
            <button
              type="button"
              className={`search-item ${
                index === highlightIndex ? 'highlighted' : ''
              }`}
            >
              {item.stateName}
            </button>
          </Link>
        ))}
      </ul>

      <ul className="search-rules-list">
        <li className="search-rules">
          Use slash key ( / ) to focus search from anywhere
        </li>
        <li className="search-rules">Use escape ( Esc ) to close search</li>
      </ul>
    </div>
  )

  const renderSearchResults = () => {
    if (searchRes.length > 0) {
      return searchRes.map((item, index) => (
        <Link
          className="link-items"
          to={`state/${item.stateCode}`}
          key={item.stateCode}
        >
          <button
            type="button"
            className={`search-item ${
              index === highlightIndex ? 'highlighted' : ''
            }`}
          >
            {item.stateName}
          </button>
        </Link>
      ))
    }
    return <div className="not-found-container">Not Found</div>
  }

  return (
    <ul className="popup-item">
      {search.length === 0 ? renderTrending() : renderSearchResults()}
    </ul>
  )
}

export default SearchPopup
