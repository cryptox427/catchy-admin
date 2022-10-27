import React from 'react';

import Logout from '../Logout';

const Header = () => {
  return (
    <header>
      <h1>Catchy Domains Management</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => {}}>Add Employee</button>
        <Logout setIsAuthenticated={() => {}} />
      </div>
    </header>
  );
};

export default Header;
