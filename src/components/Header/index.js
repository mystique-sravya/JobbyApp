import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const clearCookie = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <nav className="nav-cont">
        <ul className="ul-cont">
          <li>
            <Link className="header-logo" to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="header-logo"
              />
            </Link>
          </li>

          <li className="home-lists-flex">
            <Link className="link" to="/">
              <p>Home</p>
            </Link>
            <Link className="link" to="/jobs">
              <p>Jobs</p>
            </Link>
          </li>

          <li>
            <button type="button" className="log-out" onClick={clearCookie}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default withRouter(Header)
