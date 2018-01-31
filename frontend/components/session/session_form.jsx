import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.handleLink = this.handleLink.bind(this);
  }

  update(property) {
    return e => {
      this.setState({
        [property]: e.target.value
      });
    };
  }

  handleLink() {
    this.props.clearSessionErrors();

    this.setState({
      username: "",
      password: "",
      email: ""
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.submitUser(this.state);
  }

  handleDemo(e) {
    e.preventDefault();
    console.log('Demo Log in!');
  }

  render() {
    const { formType, errors, clearSessionErrors } = this.props;
    const buttonText = formType === 'login' ? "Login" : 'Sign Up';

    return (
      <div className="session-form-container">
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <form onSubmit={this.handleSubmit} className="session-form">
          { formType === 'signup' &&
            <label>Username:
              <input 
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
              />
            </label>
          }

          <label>Email:
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
            />
          </label>

          <label>Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
            />
          </label>

          <button>{buttonText}</button>
          
          { formType === 'login' &&
            <div>
              <input 
                type="submit" 
                onClick={this.handleDemo} 
                value="Demo Login"
              />
              <div>
                <Link 
                  to='/signup' 
                  onClick={this.handleLink}
                >
                  Sign Up
                </Link>
                <p> instead!</p>
              </div>
            </div>
          }

          { formType === 'signup' &&
            <div>
              <Link 
                to='/login' 
                onClick={this.handleLink}
              >
                Login
              </Link>
              <p> instead!</p>
            </div>
          }
          
        </form>
      </div>
    );
  }
}

export default SessionForm;