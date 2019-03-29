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
            <a href="https://youtube.com">Account settings</a>
          </li>
          <li>
            <a href="https://youtube.com">Movie preferences</a>
          </li>
          <li>
            <a href="https://youtube.com">Watchlist</a>
          </li>
          <li>
            <a href="https://youtube.com">Log out</a>
          </li>
        </ul>
      </aside>

      <div className="account-page">
        <form>
          <div>
            <h3>Streaming Subscriptions</h3>
            <div>
              <label>
                Hulu
                <input type="checkbox" />
              </label>
            </div>
            <div>
              <label>
                Netflix
                <input type="checkbox" />
              </label>
            </div>
            <div>
              <label>
                Disney +
                <input type="checkbox" />
              </label>
              <label>
                ESPN
                <input type="checkbox" />
              </label>
            </div>
            
           
          </div>
        </form>
      </div>
    </div>
  </div>
  
);

export default userDashboardPage;
