import './index.css'
import {RotatingLines} from 'react-loader-spinner'

import {FaLungsVirus} from 'react-icons/fa6'
import {FaProcedures, FaChild} from 'react-icons/fa'
import {TbCandleFilled} from 'react-icons/tb'

const CovidSelect = ({
  totalActiveCases,
  totalConfirmedCases,
  totalDeceasedCases,
  totalRecoveredCases,
  handleClick,
  activeTab,
}) => (
  <div className="select-container-2">
    {/* Confirmed */}
    {!totalConfirmedCases ? (
      <div className="select-item">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible
        />
      </div>
    ) : (
      <div
        className={`select-item-2 ${
          activeTab === 1 ? 'select-item-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleClick(1)}
      >
        <div className="select-img-container">
          <FaLungsVirus className="select-icons red" />
        </div>
        <div className="select-text-container">
          <p className="select-para red">{totalConfirmedCases}</p>
          <h3 className="select-heading red">Confirmed</h3>
        </div>
      </div>
    )}

    {/* Active */}
    {!totalActiveCases ? (
      <div className="select-item">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible
        />
      </div>
    ) : (
      <div
        className={`select-item-2 ${
          activeTab === 2 ? 'select-item-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleClick(2)}
      >
        <div className="select-img-container">
          <FaProcedures className="select-icons blue" />
        </div>
        <div className="select-text-container">
          <p className="select-para blue">{totalActiveCases}</p>
          <h3 className="select-heading blue">Active</h3>
        </div>
      </div>
    )}

    {/* Recovered */}
    {!totalRecoveredCases ? (
      <div className="select-item">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible
        />
      </div>
    ) : (
      <div
        className={`select-item-2 ${
          activeTab === 3 ? 'select-item-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleClick(3)}
      >
        <div className="select-img-container">
          <FaChild className="select-icons green" />
        </div>
        <div className="select-text-container">
          <p className="select-para green">{totalRecoveredCases}</p>
          <h3 className="select-heading green">Recovered</h3>
        </div>
      </div>
    )}

    {/* Deceased */}
    {!totalDeceasedCases ? (
      <div className="select-item">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible
        />
      </div>
    ) : (
      <div
        className={`select-item-2 ${
          activeTab === 4 ? 'select-item-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleClick(4)}
      >
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

export default CovidSelect
