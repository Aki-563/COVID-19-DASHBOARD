import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="website-container">
    <Header />
    <div className="notfound-container">
      <div className="notfound-img-container">
        <img
          src="https://res.cloudinary.com/deonwh9i9/image/upload/v1765287080/Group_7485_nspsqw.png"
          className="notfound-img"
        />
      </div>
      <div className="notfound-text-container">
        <h2 className="notfound-heading">PAGE NOT FOUND</h2>
        <p className="notfound-para">
          we're sorry, the page you requested could not be found, Please go back
          to the homepage
        </p>
        <Link className="link-text" to="/">
          <button className="retry-button">Home</button>
        </Link>
      </div>
    </div>
  </div>
)
export default NotFound
