import React, {Component} from 'react'
import {RotatingLines} from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {HiOutlineArrowsUpDown} from 'react-icons/hi2'
import {IoSearchOutline} from 'react-icons/io5'

import Header from '../Header'
import CovidSelect from '../CovidSelect'
import TableItem from '../TableItem'
import SearchPopup from '../SearchPopup'
import Footer from '../Footer'

import './index.css'

const statesList = [
  {state_code: 'AN', state_name: 'Andaman and Nicobar Islands'},
  {state_code: 'AP', state_name: 'Andhra Pradesh'},
  {state_code: 'AR', state_name: 'Arunachal Pradesh'},
  {state_code: 'AS', state_name: 'Assam'},
  {state_code: 'BR', state_name: 'Bihar'},
  {state_code: 'CH', state_name: 'Chandigarh'},
  {state_code: 'CT', state_name: 'Chhattisgarh'},
  {state_code: 'DN', state_name: 'Dadra and Nagar Haveli and Daman and Diu'},
  {state_code: 'DL', state_name: 'Delhi'},
  {state_code: 'GA', state_name: 'Goa'},
  {state_code: 'GJ', state_name: 'Gujarat'},
  {state_code: 'HR', state_name: 'Haryana'},
  {state_code: 'HP', state_name: 'Himachal Pradesh'},
  {state_code: 'JK', state_name: 'Jammu and Kashmir'},
  {state_code: 'JH', state_name: 'Jharkhand'},
  {state_code: 'KA', state_name: 'Karnataka'},
  {state_code: 'KL', state_name: 'Kerala'},
  {state_code: 'LA', state_name: 'Ladakh'},
  {state_code: 'LD', state_name: 'Lakshadweep'},
  {state_code: 'MH', state_name: 'Maharashtra'},
  {state_code: 'MP', state_name: 'Madhya Pradesh'},
  {state_code: 'MN', state_name: 'Manipur'},
  {state_code: 'ML', state_name: 'Meghalaya'},
  {state_code: 'MZ', state_name: 'Mizoram'},
  {state_code: 'NL', state_name: 'Nagaland'},
  {state_code: 'OR', state_name: 'Odisha'},
  {state_code: 'PY', state_name: 'Puducherry'},
  {state_code: 'PB', state_name: 'Punjab'},
  {state_code: 'RJ', state_name: 'Rajasthan'},
  {state_code: 'SK', state_name: 'Sikkim'},
  {state_code: 'TN', state_name: 'Tamil Nadu'},
  {state_code: 'TG', state_name: 'Telangana'},
  {state_code: 'TR', state_name: 'Tripura'},
  {state_code: 'UP', state_name: 'Uttar Pradesh'},
  {state_code: 'UT', state_name: 'Uttarakhand'},
  {state_code: 'WB', state_name: 'West Bengal'},
]

class Home extends Component {
  constructor(props) {
    super(props)
    this.searchRef = React.createRef()
  }

  state = {
    isLoading: true,
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    search: '',
    statesinfo: [],
    activeSort: 'NAME',
    sortByName: 'ASC',
    sortByConfirmed: 'ASC',
    sortByActive: 'ASC',
    sortByRecovered: 'ASC',
    sortByDeceased: 'ASC',
    sortByPopulation: 'ASC',
    searchPopup: false,
    highlightIndex: 0,
  }

  componentDidMount() {
    this.getTable()
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  // --- Sorting Logic ---

  sortGeneric = (key, stateKey, sortType) => {
    // Destructure using computed property name to avoid "this.state[stateKey]" error
    const {statesinfo, [stateKey]: currentOrder} = this.state

    const sortedList = [...statesinfo].sort((a, b) => {
      let valA
      let valB

      if (sortType === 'ACTIVE') {
        valA = a.confirmed - a.recovered - a.deceased - a.other
        valB = b.confirmed - b.recovered - b.deceased - b.other
      } else if (sortType === 'NAME') {
        return currentOrder === 'DESC'
          ? a.stateName.localeCompare(b.stateName)
          : b.stateName.localeCompare(a.stateName)
      } else {
        valA = a[sortType]
        valB = b[sortType]
      }

      return currentOrder === 'DESC' ? valA - valB : valB - valA
    })

    this.setState(prev => ({
      [stateKey]: prev[stateKey] === 'ASC' ? 'DESC' : 'ASC',
      statesinfo: sortedList,
      activeSort: key,
    }))
  }

  sortName = () => this.sortGeneric('NAME', 'sortByName', 'NAME')

  sortConfirmed = () =>
    this.sortGeneric('CONFIRMED', 'sortByConfirmed', 'confirmed')

  sortActive = () => this.sortGeneric('ACTIVE', 'sortByActive', 'ACTIVE')

  sortRecovered = () =>
    this.sortGeneric('RECOVERED', 'sortByRecovered', 'recovered')

  sortDeceased = () =>
    this.sortGeneric('DECEASED', 'sortByDeceased', 'deceased')

  sortPopulation = () =>
    this.sortGeneric('POPULATION', 'sortByPopulation', 'population')

  // --- Search Logic ---

  searching = e => {
    this.setState({search: e.target.value, searchPopup: true})
  }

  searchFocus = () => {
    this.setState({searchPopup: true})
  }

  searchBlur = () => {
    this.setState({searchPopup: false})
  }

  handleKeyPress = e => {
    const {searchPopup} = this.state

    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault()
      this.searchRef.current.focus()
      return
    }

    if (!searchPopup) return

    if (e.key === 'Escape') {
      this.setState({searchPopup: false})
      this.searchRef.current.blur()
    }
  }

  getTable = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {method: 'GET'}
    const res = await fetch(url, options)
    const data = await res.json()

    let nationalWideConfirmedCases = 0
    let nationalWideRecoveredCases = 0
    let nationalWideDeceasedCases = 0
    let nationalWideActiveCases = 0

    if (res.ok) {
      statesList.forEach(state => {
        if (data[state.state_code]) {
          const {total} = data[state.state_code]
          nationalWideConfirmedCases += total.confirmed || 0
          nationalWideRecoveredCases += total.recovered || 0
          nationalWideDeceasedCases += total.deceased || 0
        }
      })
      nationalWideActiveCases +=
        nationalWideConfirmedCases -
        (nationalWideRecoveredCases + nationalWideDeceasedCases)

      const states = statesList.map(each => {
        const d = data[each.state_code]?.total || {}
        return {
          stateName: each.state_name,
          stateCode: each.state_code,
          confirmed: d.confirmed || 0,
          recovered: d.recovered || 0,
          deceased: d.deceased || 0,
          other: d.other || 0,
          population: data[each.state_code]?.meta?.population || 0,
        }
      })

      this.setState({
        totalActiveCases: nationalWideActiveCases,
        totalRecoveredCases: nationalWideRecoveredCases,
        totalDeceasedCases: nationalWideDeceasedCases,
        totalConfirmedCases: nationalWideConfirmedCases,
        isLoading: false,
        statesinfo: states,
      })
    } else {
      this.setState({isLoading: true})
    }
  }

  renderSortIcon = (columnKey, sortOrder) => {
    const {activeSort} = this.state
    if (activeSort !== columnKey) {
      return <HiOutlineArrowsUpDown color="#2196F3" />
    }
    return sortOrder === 'ASC' ? (
      <FcGenericSortingAsc />
    ) : (
      <FcGenericSortingDesc />
    )
  }

  render() {
    const {
      statesinfo,
      isLoading,
      search,
      searchPopup,
      highlightIndex,
      totalActiveCases,
      totalConfirmedCases,
      totalDeceasedCases,
      totalRecoveredCases,
      sortByName,
      sortByConfirmed,
      sortByActive,
      sortByRecovered,
      sortByDeceased,
      sortByPopulation,
    } = this.state

    // Map destructured state values to keys to avoid using this.state[key] in render
    const sortOrders = {
      sortByName,
      sortByConfirmed,
      sortByActive,
      sortByRecovered,
      sortByDeceased,
      sortByPopulation,
    }

    const headerConfig = [
      {
        id: 'NAME',
        label: 'States/UT',
        handler: this.sortName,
        orderKey: 'sortByName',
      },
      {
        id: 'CONFIRMED',
        label: 'Confirmed',
        handler: this.sortConfirmed,
        orderKey: 'sortByConfirmed',
      },
      {
        id: 'ACTIVE',
        label: 'Active',
        handler: this.sortActive,
        orderKey: 'sortByActive',
      },
      {
        id: 'RECOVERED',
        label: 'Recovered',
        handler: this.sortRecovered,
        orderKey: 'sortByRecovered',
      },
      {
        id: 'DECEASED',
        label: 'Deceased',
        handler: this.sortDeceased,
        orderKey: 'sortByDeceased',
      },
      {
        id: 'POPULATION',
        label: 'Population',
        handler: this.sortPopulation,
        orderKey: 'sortByPopulation',
      },
    ]

    return (
      <div className="website-container">
        <Header />
        <div className="home-container">
          <div
            className={`search-container search-wrapper ${
              searchPopup ? 'selected-search-container' : ''
            }`}
          >
            <IoSearchOutline className="search-icon" />
            <input
              type="text"
              placeholder="Enter the State"
              className="search-input"
              onChange={this.searching}
              onFocus={this.searchFocus}
              onBlur={this.searchBlur}
              value={search}
              ref={this.searchRef}
            />
            {searchPopup && (
              <div
                className="popup-box"
                onMouseDown={e => e.preventDefault()}
                role="none"
              >
                <SearchPopup
                  search={search}
                  statesinfo={statesinfo}
                  highlightIndex={highlightIndex}
                />
              </div>
            )}
          </div>

          <CovidSelect
            totalActiveCases={totalActiveCases}
            totalConfirmedCases={totalConfirmedCases}
            totalDeceasedCases={totalDeceasedCases}
            totalRecoveredCases={totalRecoveredCases}
          />

          <div className="table">
            <div className="table-header">
              <div className="list-column">
                <button
                  className="states-header"
                  style={{fontWeight: 'bold'}}
                  onClick={headerConfig[0].handler}
                >
                  {headerConfig[0].label}{' '}
                  <span className="icon-button">
                    {this.renderSortIcon(
                      headerConfig[0].id,
                      sortOrders[headerConfig[0].orderKey],
                    )}
                  </span>
                </button>
              </div>
              <div className="list-nums">
                {headerConfig.slice(1).map(header => (
                  <div className="list-column-num" key={header.id}>
                    <button
                      className="states-header"
                      style={{fontWeight: 'bold'}}
                      onClick={header.handler}
                    >
                      {header.label}{' '}
                      <span className="icon-button">
                        {this.renderSortIcon(
                          header.id,
                          sortOrders[header.orderKey],
                        )}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mobile-table-header">
              <h3
                style={{
                  color: '#999999',
                  fontSize: '10px',
                  minWidth: '50px',
                  fontWeight: 'normal',
                }}
              >
                Sort by:
              </h3>
              {headerConfig.map(header => (
                <button
                  key={header.id}
                  className="states-header-mobile"
                  style={{fontWeight: 'bold'}}
                  onClick={header.handler}
                >
                  {header.label}{' '}
                  <span className="icon-button">
                    {this.renderSortIcon(
                      header.id,
                      sortOrders[header.orderKey],
                    )}
                  </span>
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="loader-container">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible
                />
              </div>
            ) : (
              <ul className="table-list">
                {statesinfo.map(item => (
                  <li key={item.stateCode}>
                    <TableItem item={item} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
