import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {IoMdMailUnread} from 'react-icons/io'
import {FaGraduationCap} from 'react-icons/fa'
import Header from '../Header'
import Profile from '../Profile'
import Filter from '../Filter'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    activeSalaryId: '',
    activeEmploymentId: [],
    jobsData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  changeEmploymentId = id => {
    this.setState(
      prevState => ({
        activeEmploymentId: [...prevState.activeEmploymentId, id],
      }),
      this.getJobsData,
    )
  }

  changeSalaryId = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJobsData)
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearch = () => {
    this.getJobsData()
  }

  onRetry = () => {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, activeEmploymentId, activeSalaryId} = this.state
    const activeEmploymentIds = activeEmploymentId.join()
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentIds}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {jobsData} = this.state
    const jobsList = jobsData.length > 0

    return jobsList ? (
      <ul className="jobs-ul-cont">
        {jobsData.map(each => (
          <Link to={`/jobs/${each.id}`} className="link">
            <li className="job-item-cont">
              <div className="title-flex">
                <img
                  src={each.companyLogoUrl}
                  alt="company logo"
                  className="company-logo"
                />
                <div>
                  <h1 className="title">{each.title}</h1>
                  <div className="start-flex">
                    <BsFillStarFill className="star" />
                    <p className="rating">{each.rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-logs-cont">
                <div className="logos-cont">
                  <GoLocation className="location-icon" />
                  <p className="logo-txt-job">{each.location}</p>
                  <IoMdMailUnread className="internship-icon" />
                  <p className="logo-txt-job">{each.employmentType}</p>
                </div>
                <p className="package">{each.packagePerAnnum}</p>
              </div>
              <hr />
              <h1 className="description-txt">Description</h1>
              <p className="description">{each.jobDescription}</p>
            </li>
          </Link>
        ))}
      </ul>
    ) : (
      <div className="no-jobs-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs"
        />
        <h1 className="no-jobs-header">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailure = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-header">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-failure" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-bg">
          <div className="profile-details-cont">
            <Profile />
            <hr />
            <Filter
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmploymentId={this.changeEmploymentId}
              changeSalaryId={this.changeSalaryId}
            />
          </div>
          <div className="jobs-content-cont">
            <div className="search-input-cont">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.changeSearchInput}
                className="search-input"
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.renderSearch}
                className="search-logo"
                aria-label="search"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {this.renderStatus()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
