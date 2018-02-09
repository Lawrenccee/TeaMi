import React from 'react';
import { ProtectedRoute } from '../../util/route_util';
import LogoutContainer from '../logout/logout_container';
import TiEdit from 'react-icons/lib/ti/edit';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      id: this.props.currentUser.id,
      username: "",
      user_image: ""
    });

    this.updateImage = this.updateImage.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }

  componentWillReceiveProps(newProps) {
    if ((newProps.currentUser.username !== 
      this.props.currentUser.username) ||
      (newProps.currentUser.user_thumb_image_url !== 
      this.props.currentUser.user_thumb_image_url)) {
        this.props.fetchUser(newProps.currentUser.id);
      }
  }

  updateImage(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () => (
      this.setState({ user_image: file },
        () => {
          const formData = new FormData();
          formData.append("user_image", file);
          this.props.updateUser({formData, user: this.state.id});
        })
    );
    
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    const { currentUser, history, clearChatHighlight } = this.props;
    let profilePicUrl = currentUser.user_thumb_image_url;

    if (currentUser.profile_pic_url && 
      currentUser.profile_pic_url.length > 0) {
      profilePicUrl = currentUser.profile_pic_url;
    }

    return (
      <nav className="navbar">
        <ProtectedRoute path="/chats" component={LogoutContainer} />
        <div className="nav-greeting">
          <div className="profile-pic">
            <img src={`${profilePicUrl}`} width={40} height={40} />
            <div className="edit-profile-pic">
              <input
                type="file"
                onChange={this.updateImage}
              />
              <p>Edit</p>
            </div>
          </div>
          <div className="nav-text">
            <div>
              <p>
                TeaMí
            </p>
            </div>
            <div className="nav-username">
              <p>
                {currentUser.username}
              </p>
            </div>
          </div>
        </div>
        <button onClick={() => {
          if(history.path !== '/new') {
            clearChatHighlight();
          }
        }}>
          <TiEdit size={30} color={`#7DCC4D`}/>
        </button>
      </nav>
    );
  }
}

export default Nav;