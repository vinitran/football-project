import { useState } from 'react';
import { navBarList } from '../consts/nav-bar.const';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  children?: any;
};

export const NavBar = (props: Props) => {
  const navigate = useNavigate();
  const [value, setValue] = useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('into handle1');
    setValue(newValue);
  };

  const handleNavChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('into handle');
    navigate(`${newValue}`);
  };

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleNavChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="scrollable secondary auto tabs example">
          {navBarList.map((item, index) => (
            <Tab value={item?.url} label={item?.label} />
          ))}
        </Tabs>
      </Box>
    </>
  );
};
