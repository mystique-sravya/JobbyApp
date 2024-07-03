import {BsFillStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {IoMdMailUnread} from 'react-icons/io'
import './index.css'

const SimilarItems = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = item

  return (
    <li className="similar-li">
      <div className="title-flex">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo"
        />
        <div>
          <h1 className="title">{title}</h1>
          <div className="start-flex">
            <BsFillStarFill className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-description-header">Description</h1>
      <p className="similar-description-txt">{jobDescription}</p>
      <div className="logos-cont">
        <GoLocation className="location-icon" />
        <p className="logo-txt-job">{location}</p>
        <IoMdMailUnread className="internship-icon" />
        <p className="logo-txt-job">{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarItems
