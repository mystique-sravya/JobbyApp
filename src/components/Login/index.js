import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', submitError: false, errorMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({submitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <div>
        <label htmlFor="input2" className="labelEl">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={this.changePassword}
          id="input2"
          className="inputEl"
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <div>
        <label htmlFor="input1" className="labelEl">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={this.changeUsername}
          id="input1"
          className="inputEl"
        />
      </div>
    )
  }

  render() {
    const {submitError, errorMsg} = this.state
    return (
      <div className="login-bg">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="web-logo"
          />
          <form onSubmit={this.submitForm}>
            <div>{this.renderUsernameField()}</div>
            <div>{this.renderPasswordField()}</div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          {submitError && <p className="error">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default Login
