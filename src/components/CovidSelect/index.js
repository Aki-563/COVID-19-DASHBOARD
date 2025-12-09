import './index.css'
import {RotatingLines} from 'react-loader-spinner'

// eslint-disable-next-line import/no-unresolved
import {FaLungsVirus} from 'react-icons/fa6'

// eslint-disable-next-line import/no-duplicates
import {FaProcedures} from 'react-icons/fa'

// eslint-disable-next-line import/no-duplicates
import {FaChild} from 'react-icons/fa'

// eslint-disable-next-line import/no-unresolved
import {TbCandleFilled} from 'react-icons/tb'

const CovidSelect = props => {
  const {
    totalActiveCases,
    totalConfirmedCases,
    totalDeceasedCases,
    totalRecoveredCases,
  } = props

  return (
    <div className="select-container">
      {!totalConfirmedCases ? (
        <div className="select-item">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible
          />
        </div>
      ) : (
        <div className="select-item">
          <div className="select-img-container">
            <FaLungsVirus className="select-icons red" />
          </div>
          <div className="select-text-container">
            <p className="select-para red">{totalConfirmedCases}</p>
            <h3 className="select-heading red">Confirmed</h3>
          </div>
        </div>
      )}

      {!totalActiveCases ? (
        <div className="select-item">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible
          />
        </div>
      ) : (
        <div className="select-item">
          <div className="select-img-container">
            <FaProcedures className="select-icons blue" />
          </div>
          <div className="select-text-container">
            <p className="select-para blue">{totalActiveCases}</p>
            <h3 className="select-heading blue">Active</h3>
          </div>
        </div>
      )}

      {!totalRecoveredCases ? (
        <div className="select-item">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible
          />
        </div>
      ) : (
        <div className="select-item">
          <div className="select-img-container">
            <FaChild className="select-icons green" />
          </div>
          <div className="select-text-container">
            <p className="select-para green">{totalRecoveredCases}</p>
            <h3 className="select-heading green">Recovered</h3>
          </div>
        </div>
      )}

      {!totalDeceasedCases ? (
        <div className="select-item">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible
          />
        </div>
      ) : (
        <div className="select-item">
          <div className="select-img-container">
            <TbCandleFilled className="select-icons grey" />
          </div>
          <div className="select-text-container">
            <p className="select-para grey">{totalDeceasedCases}</p>
            <h3 className="select-heading grey">Deceased</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default CovidSelect
