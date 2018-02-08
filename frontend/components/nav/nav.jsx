import React from 'react';
import { ProtectedRoute } from '../../util/route_util';
import LogoutContainer from '../logout/logout_container';
import TiEdit from 'react-icons/lib/ti/edit';

const Nav = (props) => {
  let profilePicUrl = props.currentUser.user_thumb_image_url;

  if (props.currentUser.profile_pic_url && props.currentUser.profile_pic_url.length > 0) {
    profilePicUrl = props.currentUser.profile_pic_url;
  }

  return (
    <nav className="navbar">
      <ProtectedRoute path="/chats" component={LogoutContainer} />
      <div className="nav-greeting">
        <div className="profile-pic">
          <img src={`${profilePicUrl}`} width={40} height={40} />
          <div className="edit-profile-pic">
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
              {props.currentUser.username}
            </p>
          </div>
        </div>
      </div>
      <button onClick={() => {
        if(props.history.path !== '/new') {
          props.clearChatHighlight();
        }
      }}>
        <TiEdit size={30} color={`#7DCC4D`}/>
      </button>
    </nav>
  );
};

export default Nav;