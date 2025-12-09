import {Component} from 'react'
import {RotatingLines} from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import TopDistricts from '../TopDistricts'
import DynamicChart from '../DynamicChart'
import StaticCharts from '../StaticCharts'
import CovidSelect2 from '../CovidSelect2'

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

class StateWisePage extends Component {
  state = {
    currStateCode: '',
    totalData: [],
    stateData: [],
    getTotalDataisLoading: true,
    getTotalDataisError: false,
    getDataisLoading: true,
    getDataisError: false,
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalDeceasedCases: 0,
    totalRecoveredCases: 0,
    totalTested: 0,
    latestDate: '',
    activeTab: 1,
    districtTotals: [],
    chartsData: [],
    chartIsLoading: true,
    isChartError: false,
  }

  componentDidMount() {
    // Fixed: Destructuring props assignment
    const {history} = this.props
    const stateCode = history.location.pathname.slice(7)
    this.setState({currStateCode: stateCode}, () => {
      this.getData()
      this.getCharts()
    })
  }

  sortDistricts = () => {
    const {districtTotals, activeTab} = this.state

    let topWhat = 'confirmed'
    if (activeTab === 2) topWhat = 'active'
    else if (activeTab === 3) topWhat = 'recovered'
    else if (activeTab === 4) topWhat = 'deceased'

    const sorted = [...districtTotals].sort((a, b) => b[topWhat] - a[topWhat])
    this.setState({districtTotals: sorted})
  }

  getData = async () => {
    const {currStateCode} = this.state
    const url = 'https://apis.ccbp.in/covid19-state-wise-data/'

    try {
      const res = await fetch(url)

      if (res.ok) {
        const data = await res.json()
        const stateObj = data[currStateCode]
        const totalObj = stateObj.total
        const districtsObj = stateObj.districts

        const confirmed = totalObj.confirmed || 0
        const recovered = totalObj.recovered || 0
        const deceased = totalObj.deceased || 0
        const tested = totalObj.tested || 0
        const active = confirmed - (recovered + deceased)

        const updatedDate = stateObj.meta.last_updated
        const dateObj = new Date(updatedDate)

        const getDaySuffix = day => {
          if (day > 3 && day < 21) return `${day}th`
          const d = day % 10
          if (d === 1) return `${day}st`
          if (d === 2) return `${day}nd`
          if (d === 3) return `${day}rd`
          return `${day}th`
        }

        const day = dateObj.getDate()
        const monthName = dateObj.toLocaleString('en-US', {month: 'long'})
        const year = dateObj.getFullYear()
        const dayWithSuffix = getDaySuffix(day)

        const latestDate = {day, monthName, year, dayWithSuffix}

        const districtTotalsArray = Object.keys(districtsObj).map(
          districtName => {
            const dist = districtsObj[districtName].total || {}
            const dConfirmed = dist.confirmed || 0
            const dRecovered = dist.recovered || 0
            const dDeceased = dist.deceased || 0

            return {
              name: districtName,
              confirmed: dConfirmed,
              recovered: dRecovered,
              deceased: dDeceased,
              active: dConfirmed - (dRecovered + dDeceased),
            }
          },
        )

        this.setState(
          {
            stateData: stateObj,
            districtTotals: districtTotalsArray,
            totalConfirmedCases: confirmed,
            totalRecoveredCases: recovered,
            totalDeceasedCases: deceased,
            totalActiveCases: active,
            totalTested: tested,
            latestDate,
            getDataisLoading: false,
            getDataisError: false,
          },
          () => this.sortDistricts(),
        )
      } else {
        console.error('Server Error in getData')
        this.setState({getDataisLoading: false, getDataisError: true})
      }
    } catch (error) {
      console.error('Network Error in getData:', error)
      this.setState({getDataisLoading: false, getDataisError: true})
    }
  }

  getCharts = async () => {
    const {currStateCode} = this.state
    const url = 'https://apis.ccbp.in/covid19-timelines-data'

    try {
      const res = await fetch(url)

      if (res.ok) {
        const data = await res.json()
        this.setState({
          chartsData: data[currStateCode],
          chartIsLoading: false,
          isChartError: false,
        })
      } else {
        console.error('Server Error in getCharts')
        this.setState({isChartError: true, chartIsLoading: false})
      }
    } catch (error) {
      console.error('Network Error in getCharts:', error)
      this.setState({isChartError: true, chartIsLoading: false})
    }
  }

  handleClick = id => {
    this.setState({activeTab: id}, () => this.sortDistricts())
  }

  getLatest10Data = () => {
    const {chartsData, activeTab} = this.state
    if (!chartsData || !chartsData.dates) return []

    const allDates = Object.keys(chartsData.dates)
    const sortedDates = allDates.sort((a, b) => new Date(b) - new Date(a))
    const latest10 = sortedDates.slice(0, 10)

    return latest10.map(date => {
      const total = chartsData.dates[date]?.total || {}

      const confirmed = total.confirmed || 0
      const recovered = total.recovered || 0
      const deceased = total.deceased || 0
      const active = confirmed - (recovered + deceased)

      // Fixed: Removed nested ternary operators by using simple logic
      let keyValue = deceased
      let keyName = 'Deceased'

      if (activeTab === 1) {
        keyValue = confirmed
        keyName = 'Confirmed'
      } else if (activeTab === 2) {
        keyValue = active
        keyName = 'Active'
      } else if (activeTab === 3) {
        keyValue = recovered
        keyName = 'Recovered'
      }

      return {date, [keyName]: keyValue}
    })
  }

  // Helper to resolve color without nested ternaries
  getActiveColor = () => {
    const {activeTab} = this.state
    const colorMap = {
      1: 'red',
      2: 'blue',
      3: 'green',
    }
    return colorMap[activeTab] || 'grey'
  }

  render() {
    const {
      totalActiveCases,
      totalConfirmedCases,
      totalDeceasedCases,
      totalRecoveredCases,
      totalTested,
      activeTab,
      currStateCode,
      latestDate,
      getDataisError,
      districtTotals,
      getDataisLoading,
      chartsData,
    } = this.state

    const currStateName = statesList.find(
      item => item.state_code === currStateCode,
    )

    // Fixed: Replaced nested ternary color assignment with a helper
    const color = this.getActiveColor()

    const dynamicChartData = this.getLatest10Data()

    return (
      <div className="website-container">
        <Header />

        {getDataisError ? (
          <div className="failure-view-container">
            <h1 className="failure-heading">Something Went Wrong!</h1>
            <Link className="link-text" to="/">
              <button className="retry-button" type="button">
                Home
              </button>
            </Link>
          </div>
        ) : (
          <div className="state-wise-container">
            <div className="state-wise-header-container">
              {!latestDate ? (
                <div className="loader-container-about-header">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible
                  />
                </div>
              ) : (
                <>
                  <div className="statename-date-container">
                    <h2 className="state-name-container">
                      {currStateName && currStateName.state_name}
                    </h2>

                    <p style={{margin: 0, color: '#DDDDDD'}}>
                      {latestDate &&
                        `Last update on ${latestDate.monthName} ${latestDate.dayWithSuffix} ${latestDate.year}`}
                    </p>
                  </div>

                  <div className="tested-container">
                    <h3
                      className="select-heading"
                      style={{margin: 0, color: '#DDDDDD'}}
                    >
                      Tested
                    </h3>

                    <p style={{margin: 0, color: '#DDDDDD'}}>{totalTested}</p>
                  </div>
                </>
              )}
            </div>

            <CovidSelect2
              totalActiveCases={totalActiveCases}
              totalConfirmedCases={totalConfirmedCases}
              totalDeceasedCases={totalDeceasedCases}
              totalRecoveredCases={totalRecoveredCases}
              handleClick={this.handleClick}
              activeTab={activeTab}
            />

            <div className="top-district-container">
              <ul
                className={`top-district-list ${
                  districtTotals.length > 0 ? `${color}-gradient` : ''
                }`}
              >
                {getDataisLoading ? (
                  <div className="loader-container-about-header">
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="20"
                      visible
                    />
                  </div>
                ) : (
                  districtTotals.map((item, index) => (
                    <li key={item.name || index}>
                      <TopDistricts
                        item={item}
                        index={index}
                        activeTab={activeTab}
                        color={color}
                      />
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="dynamic-chart">
              {dynamicChartData.length === 0 ? (
                <div className="loader-container-about-header">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible
                  />
                </div>
              ) : (
                <DynamicChart
                  dynamicChartData={dynamicChartData}
                  activeTab={activeTab}
                />
              )}
            </div>

            <div className="static-charts">
              {chartsData.length === 0 ? (
                <div className="loader-container-about-header">
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible
                  />
                </div>
              ) : (
                <StaticCharts chartsData={chartsData} />
              )}
            </div>
          </div>
        )}

        <Footer />
      </div>
    )
  }
}

export default StateWisePage
