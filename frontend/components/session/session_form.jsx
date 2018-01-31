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
        
        <header className='session-header'>
          <div className='logo-container'>
          </div>

          <h1>
            TeaMí
          </h1>

          <p>
            Sign in to get started.
          </p>
        </header>

        <form onSubmit={this.handleSubmit} className="session-form">
          { formType === 'signup' &&
            <input 
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Display name"
            />
          }

          <input
            type="text"
            value={this.state.email}
            onChange={this.update("email")}
            placeholder="Email or phone number"
          />

          <input
            type="password"
            value={this.state.password}
            onChange={this.update("password")}
            placeholder="Password"
          />

          <button>{buttonText}</button>
          
          { formType === 'login' &&
            <div>
              <input 
                type="submit" 
                onClick={this.handleDemo} 
                value="Demo Login"
              />
              <div className='session-form-link-container'>
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
            <div className='session-form-link-container'>
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

        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      </div>
    );
  }
}

export default SessionForm;