import React from 'react';
import { Outlet } from 'react-router-dom';

export const Test = () => {
  return (
    <div>
      <a href="/test1">Go to tab1</a>
      <a href="/test2">Go to tab2</a>
      <Outlet></Outlet>
    </div>
  );
};
