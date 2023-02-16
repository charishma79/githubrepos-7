// Write your code here
import {Component} from 'react'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RepositoryItem extends Component {
  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
      <p className="failure-text">Something Went Wrong</p>
    </div>
  )

  renderSuccessView = () => {
    const {allLanguagesDetails} = this.props
    const {
      avatarUrl,
      name,
      starsCount,
      forksCount,
      issuesCount,
    } = allLanguagesDetails
    return (
      <li className="languages-list-item">
        <img src={avatarUrl} alt={name} className="avatar-img" />
        <h1 className="head">{name}</h1>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stars-img"
          />
          <p className="stars-count">{starsCount} stars</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="stars-img"
          />
          <p className="stars-count">{forksCount} forks</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="stars-img"
          />
          <p className="stars-count">{issuesCount} open issues</p>
        </div>
      </li>
    )
  }

  render() {
    const {apiStatus} = this.props
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }
}

export default RepositoryItem
