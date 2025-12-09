import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const {location} = this.props

    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  render() {
    const {children} = this.props
    return children || null
  }
}

export default withRouter(ScrollToTop)
