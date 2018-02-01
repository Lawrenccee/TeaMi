import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';

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
  
    let email = " DemoUser@Tea.Mi";
    let password = " password";

    let pIndex = 0;

    let typePassword = () => {
      if (pIndex < password.length) {
        this.refs.password.value += password[pIndex];
        pIndex++;
      } else if (pIndex === password.length) {
        email = email.slice(1);
        password = password.slice(1);
        this.props.submitUser({ 
          email, 
          password
        }); // username is OolongTeaOnly
      }

      setTimeout(typePassword, 1000);
    };

    let eIndex = 0;

    let typeEmail = () => {
      if (eIndex < email.length) {
        this.refs.email.value += email[eIndex];
        eIndex++;
      } else if (eIndex === email.length) {
        typePassword(); 
      }

      setTimeout(typeEmail, 75);
    };

    typeEmail();
  }

  render() {
    const { formType, errors, clearSessionErrors } = this.props;
    const buttonText = formType === 'login' ? "Log In" : 'Sign Up';

    return (
      <div className='main-session-container'>
        <div className='session-container'>
          <div className="session-form-container">
            
            <header className='session-header'>
              <div className='logo-container'>
              </div>

              <h1>
                TeaMí
              </h1>

              <p>
                {buttonText} to get started.
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
                ref="email"
              />

              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
                ref="password"
              />

              <button>{buttonText}</button>
              
              { formType === 'login' &&
                <div>
                  <input 
                    type="submit" 
                    onClick={this.handleDemo} 
                    value="Demo Log In"
                  />
                  <div className='session-form-link-container'>
                    <p>
                      New User?
                      <Link 
                        to='/signup' 
                        onClick={this.handleLink}
                      >
                        Sign Up
                      </Link>
                      instead!</p>
                  </div>
                </div>
              }

              { formType === 'signup' &&
                <div className='session-form-link-container'>
                  <p>
                    Already have an account? 
                    <Link 
                      to='/login' 
                      onClick={this.handleLink}
                    >
                      Log In
                    </Link>
                  instead!</p>
                </div>
              }
              
            </form>

            <ul>
              {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
          </div>

          <div className='session-image-container'>
              <div className='session-image' />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SessionForm;