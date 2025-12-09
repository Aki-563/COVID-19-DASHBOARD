import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="header">
    <div className="header-container">
      <Link className="link-text" to="/">
        <button className="text-button header-logo">
          COVID19<span className="blue">INDIA</span>
        </button>
      </Link>
      <input type="checkbox" id="nav-toggle" className="nav-toggle" />
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        {/* ESLint Fix: Use self-closing tag for empty elements */}
        <span />
      </label>
      <ul className="tabs-list">
        <Link className="link-text" to="/">
          <li>
            <button className="text-button">Home</button>
          </li>
        </Link>
        <Link className="link-text" to="/about">
          <li>
            <button className="text-button">About</button>
          </li>
        </Link>
      </ul>
    </div>
  </div>
)

export default Header
