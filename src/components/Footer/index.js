import {FaGithub, FaInstagram, FaTwitter} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <Link className="link-text" to="/">
      <button className="text-button footer-logo">
        COVID19<span className="blue">INDIA</span>
      </button>
    </Link>
    <p className="footer-para">
      We stand with everyone fighting on the front lines
    </p>
    <div className="footer-icon-container">
      <button
        className="text-button"
        onClick={() =>
          window.open(
            'https://github.com/Aki-563/COVID-19-DASHBOARD.git',
            '_blank',
          )
        }
      >
        <FaGithub className="footer-icon" />
      </button>

      <button className="text-button">
        <FaInstagram className="footer-icon" />
      </button>
      <button className="text-button">
        <FaTwitter className="footer-icon" />
      </button>
    </div>
  </div>
)

export default Footer
