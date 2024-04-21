import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { NavBar } from '../nav-bar';

type Props = {
  children?: any;
};

export const LayoutWithNavBar = (props: Props) => {
  return (
    <>
      <NavBar />
      <div className="my-[12px]">
        <Outlet />
      </div>
    </>
  );
};
