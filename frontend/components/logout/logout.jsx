import React from 'react';

const Logout = ({ logout, errors }) => (
  <div>
    {/* <ul>
      {errors.map(error => <li>{error}</li>)}
    </ul> Because shouldnt show if user isnt logged in*/}
    <button onClick={() => logout()}>Logout</button>
  </div>
);

export default Logout;