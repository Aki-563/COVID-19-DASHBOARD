import {Link} from 'react-router-dom'
import './index.css'

const TableItem = props => {
  const {item} = props

  return (
    <>
      <div className="table-item">
        <div className="list-column">
          <Link to={`/state/${item.stateCode}`}>
            <button className="text-button">
              <p>{item.stateName}</p>
            </button>
          </Link>
        </div>
        <div className="list-nums">
          <div className="list-column-num">
            <p className="red">{item.confirmed}</p>
          </div>
          <div className="list-column-num">
            <p className="blue">
              {item.confirmed - item.recovered - item.deceased - item.other}
            </p>
          </div>
          <div className="list-column-num">
            <p className="green">{item.recovered}</p>
          </div>
          <div className="list-column-num">
            <p className="grey">{item.deceased}</p>
          </div>
          <div className="list-column-num">
            <p>{item.population}</p>
          </div>
        </div>
      </div>
      <div className="mobile-table-item">
        <div className="list-column">
          <Link to={`/state/${item.stateCode}`}>
            <button className="mobile-text-button mobile-link-text">
              <p>{item.stateName}</p>
            </button>
          </Link>
        </div>
        <div className="list-nums">
          <div className="list-column-num">
            <p
              style={{
                fontStyle: 'italic',
                fontSize: '12px',
                color: '#999999',
                marginBottom: '2px',
              }}
            >
              Confirmed:
            </p>
            <p className="red mobile-width">{item.confirmed}</p>
          </div>
          <div className="list-column-num">
            <p
              style={{
                fontStyle: 'italic',
                fontSize: '12px',
                color: '#999999',
                marginBottom: '2px',
              }}
            >
              Active:
            </p>
            <p className="blue mobile-width">
              {item.confirmed - item.recovered - item.deceased - item.other}
            </p>
          </div>
          <div className="list-column-num">
            <p
              style={{
                fontStyle: 'italic',
                fontSize: '12px',
                color: '#999999',
                marginBottom: '2px',
              }}
            >
              Recovered:
            </p>
            <p className="green mobile-width">{item.recovered}</p>
          </div>
          <div className="list-column-num">
            <p
              style={{
                fontStyle: 'italic',
                fontSize: '12px',
                color: '#999999',
                marginBottom: '2px',
              }}
            >
              Deceased:
            </p>
            <p className="grey mobile-width">{item.deceased}</p>
          </div>
          <div className="list-column-num">
            <p
              style={{
                fontStyle: 'italic',
                fontSize: '12px',
                color: '#999999',
                marginBottom: '2px',
              }}
            >
              Population:
            </p>
            <p className="mobile-width">{item.population}</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default TableItem
