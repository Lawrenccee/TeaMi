import React from 'react';
import { ProtectedRoute } from '../../util/route_util';
import LogoutContainer from '../logout/logout_container';
import TiEdit from 'react-icons/lib/ti/edit';

const NavContainer = (props) => {
  return (
    <nav className="navbar">
      <ProtectedRoute path="/chats" component={LogoutContainer} />
      <p>TeaMí</p>
      <button onClick={() => props.history.push('/chats/new')}><TiEdit size={30} /></button>
    </nav>
  );
};

export default NavContainer;