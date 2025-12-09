import {Component} from 'react'
// eslint-disable-next-line import/no-unresolved
import Accordion from '@material-ui/core/Accordion'
// eslint-disable-next-line import/no-unresolved
import AccordionSummary from '@material-ui/core/AccordionSummary'
// eslint-disable-next-line import/no-unresolved
import AccordionDetails from '@material-ui/core/AccordionDetails'
// eslint-disable-next-line import/no-unresolved
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {RotatingLines} from 'react-loader-spinner'
import Footer from '../Footer'

import Header from '../Header'
import './index.css'

const bannersList = [
  {id: 1, banner: 'Mask up. Back up. Wash up. Protect yourself and others.'},
  {id: 2, banner: 'Distance makes us stronger. Stay apart to stay safe.'},
  {id: 3, banner: 'Your safety is in your hands. Wash them often.'},
  {id: 4, banner: 'Be a hero. Stay home. Save lives.'},
  {id: 5, banner: 'Kindness is contagious too. Check on your neighbors.'},
  {id: 6, banner: 'Apart today, together tomorrow. Keep the distance.'},
  {id: 7, banner: 'Spread hope, not fear. Verify before you share.'},
  {id: 8, banner: 'Protect the vulnerable. Your actions save lives.'},
  {id: 9, banner: 'United in spirit, separated in space. We will win this.'},
  {id: 10, banner: 'Every action counts. Choose safety over convenience.'},
  {id: 11, banner: 'Small habits make a big difference. Stay consistent.'},
  {id: 12, banner: 'Connect online, heart to heart. Virtual hugs are safe.'},
  {id: 13, banner: 'Stay active indoors. Keep your body and mind moving.'},
  {id: 14, banner: 'Protect our elders. Keep the distance for their sake.'},
  {id: 15, banner: 'A mask is a sign of respect. Wear it proudly.'},
  {id: 16, banner: 'Gratitude to frontline workers. We appreciate you.'},
  {id: 17, banner: 'Pause and breathe. Mental health matters too.'},
  {id: 18, banner: 'Sanitize your gadgets. Keep your phone clean.'},
  {id: 19, banner: 'Resilience is in our nature. We will get through this.'},
]

class About extends Component {
  state = {
    faqs: [],
    factoids: [],
    isLoading: true,
    bannerId: 0,
  }

  componentDidMount() {
    this.getAbout()
  }

  randomBannerIndex = () => {
    const randomBannerIndex = Math.floor(Math.random() * bannersList.length)
    this.setState({bannerId: randomBannerIndex})
  }

  getAbout = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    try {
      const res = await fetch(url, options)
      const data = await res.json()
      if (res.ok) {
        this.setState(
          {
            faqs: data.faq,
            factoids: data.factoids,
            isLoading: false,
          },
          this.randomBannerIndex(),
        )
      } else {
        this.setState({isLoading: false})
      }
    } catch (e) {
      console.log(e)
      this.setState({isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="20"
        visible
      />
    </div>
  )

  getAccordionClass = (index, length) => {
    if (index === 0) return 'accordion-small'
    if (index === length - 1) return 'accordion-small-bottom'
    return 'accordion-small-no-border'
  }

  render() {
    const {faqs, factoids, isLoading, bannerId} = this.state

    return (
      <div className="website-container">
        <Header />
        <div className="about-container">
          <>
            {isLoading ? (
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
              <div className="about-header-container">
                <h2 className="about-heading-line">
                  {bannersList[bannerId]
                    ? bannersList[bannerId].banner
                    : bannersList[0].banner}
                </h2>
                <p className="about-para-text">
                  Data last updated on March 28th, 2021
                </p>
              </div>
            )}

            {!isLoading && (
              <ul className="accordion-container">
                {faqs.map((item, index) => (
                  <li key={item.qno} className="accordion-item-wrapper">
                    <Accordion
                      className={this.getAccordionClass(index, faqs.length)}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon style={{color: '#bbbbbb'}} />
                        }
                        className="accordion-summary-small"
                      >
                        <p className="accordion-question">{item.question}</p>
                      </AccordionSummary>

                      <AccordionDetails className="accordion-details-small">
                        <p className="accordion-answer">{item.answer}</p>
                      </AccordionDetails>
                    </Accordion>
                  </li>
                ))}
              </ul>
            )}

            <div className="factoid-grid">
              {isLoading
                ? this.renderLoader()
                : factoids.map(fact => (
                    <div key={fact.id} className="factoid-card">
                      <p className="factoid-text">{fact.banner}</p>
                      <span className="factoid-id">TIP #{fact.id}</span>
                    </div>
                  ))}
            </div>
          </>
        </div>
        <Footer />
      </div>
    )
  }
}

export default About
