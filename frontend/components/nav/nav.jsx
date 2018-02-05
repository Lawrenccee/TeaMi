import React from 'react';
import { ProtectedRoute } from '../../util/route_util';
import LogoutContainer from '../logout/logout_container';
import TiEdit from 'react-icons/lib/ti/edit';

const Nav = (props) => {
  return (
    <nav className="navbar">
      <ProtectedRoute path="/chats" component={LogoutContainer} />
      <p>TeaMí</p>
      <button onClick={() => {
        if(props.history.path !== '/new') {
          props.clearChatHighlight();
        }
      }}>
        <TiEdit size={30} />
      </button>
    </nav>
  );
};

export default Nav;