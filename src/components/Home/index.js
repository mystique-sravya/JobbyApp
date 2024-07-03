import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-bg">
      <div className="home-header-cont">
        <h1 className="home-header">
          Find The Job That <br />
          Fits Your Life
        </h1>
        <p className="home-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
