import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {IoMdMailUnread} from 'react-icons/io'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SimilarItems from '../SimilarItems'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetailsData: [],
    similarDetailsData: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  formatLifeAtCompany = life => ({
    description: life.description,
    imageUrl: life.image_url,
  })

  formatSkills = skill => ({
    imageUrl: skill.image_url,
    name: skill.name,
  })

  formattedData = job => ({
    companyLogoUrl: job.company_logo_url,
    companyWebsiteUrl: job.company_website_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
    lifeAtCompany: this.formatLifeAtCompany(job.life_at_company),
    skills: job.skills.map(each => this.formatSkills(each)),
  })

  similarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  apiCall = () => {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.formattedData(data.job_details)
      const similarData = data.similar_jobs.map(each => this.similarData(each))

      this.setState({
        jobDetailsData: updatedData,
        similarDetailsData: similarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {jobDetailsData, similarDetailsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobDetailsData
    return (
      <>
        <div className="job-item-card">
          <div className="title-flex">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="start-flex">
                <BsFillStarFill className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-logs-cont">
            <div className="logos-cont">
              <GoLocation className="location-icon" />
              <p className="logo-txt-job">{location}</p>
              <IoMdMailUnread className="internship-icon" />
              <p className="logo-txt-job">{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-cont">
            <h1 className="description-txt">Description</h1>
            <a href={companyWebsiteUrl} className="visit">
              Visit <BiLinkExternal className="anchor-link" />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="description-txt">Skills</h1>
          <ul className="skills-ul">
            {skills.map(each => (
              <li className="skills-li">
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skills-logo"
                />
                <p className="skills-txt">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="description-txt">Life at Company</h1>
          <div className="life-cont">
            <p className="life-txt">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-img"
            />
          </div>
        </div>
        <div className="similar-bg">
          <h1 className="similar-jobs-txt">Similar Jobs</h1>
          <ul className="similar-ul">
            {similarDetailsData.map(each => (
              <SimilarItems key={each.id} item={each} />
            ))}
          </ul>
        </div>
      </>
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
      <button type="button" onClick={this.apiCall} className="retry-failure">
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
    return (
      <>
        <Header />
        <div className="jobItemDetailsCont">{this.renderStatus()}</div>
      </>
    )
  }
}
export default JobItemDetails
