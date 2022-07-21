import React from 'react';
import { Outlet } from 'react-router';

const Home = () => {
  return (
    <div className="Home">
      <h1>Home</h1>
      <Outlet />
    </div>
  );
};

export default Home;
