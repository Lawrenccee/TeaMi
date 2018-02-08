import React from 'react';
import FaSignOut from 'react-icons/lib/fa/sign-out';

const Logout = ({ logout, errors }) => (
  <div className='logout'>
    <button onClick={() => logout()}>
      <FaSignOut size={30} color={`#7DCC4D`} transform={"scale(-1,1)"}/>
    </button>
  </div>
);

export default Logout;