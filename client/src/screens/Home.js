import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>
        Click on the links below to navigate to the Warehouse or Product pages:
      </p>
      <ul>
        <li>
          <Link to="/warehouse">Warehouse</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;