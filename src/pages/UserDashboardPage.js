import React from 'react';
import Navbar from '../components/Navbar';
import '../css/main.css';
import '../css/UserDashboardPage.css';

const userDashboardPage = () => (
  <div>
    <Navbar />
    <div className="account-wrapper">
    
      <aside className="account-nav">
        <ul>
          <li>
            <a href="https://youtube.com">Account</a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
  
);

export default userDashboardPage;
