import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeButton: languageFiltersData[0].id,
    languagesList: [],
    apiStatus: apiStatusConstants.initial,
    isLoading: true,
  }

  componentDidMount() {
    this.getLanguagesDetails()
  }

  getLanguagesDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeButton} = this.state
    console.log(activeButton)
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeButton}`
    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachDetail => ({
        name: eachDetail.name,
        id: eachDetail.id,
        issuesCount: eachDetail.issues_count,
        forksCount: eachDetail.forks_count,
        starsCount: eachDetail.stars_count,
        avatarUrl: eachDetail.avatar_url,
      }))
      this.setState({
        languagesList: updatedData,
        apiStatus: apiStatusConstants.success,
        isLoading: false,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  setActiveButton = id => {
    this.setState({activeButton: id}, this.getLanguagesDetails)
  }

  render() {
    const {activeButton, languagesList, apiStatus, isLoading} = this.state
    return (
      <div className="bg-container">
        <h1 className="popular">Popular Repos</h1>
        <ul className="languages-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              languageDetails={eachLanguage}
              setActiveButton={this.setActiveButton}
              isActive={eachLanguage.id === activeButton}
            />
          ))}
        </ul>

        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          <ul className="details-container">
            {languagesList.map(eachItem => (
              <RepositoryItem
                key={eachItem.id}
                allLanguagesDetails={eachItem}
                apiStatus={apiStatus}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default GithubPopularRepos
