import { useState } from 'react';
import { navBarList } from '../consts/nav-bar.const';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

type Props = {
  children?: any;
};

export const NavBar = (props: Props) => {
  const navigate = useNavigate();
  const [nav, setNav] = useState('/new');

  const handleNavChange = (event?: React.SyntheticEvent | undefined, newValue?: string) => {
    if (newValue) {
      setNav(newValue);
      navigate(`${newValue}`);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs
          value={nav}
          variant="scrollable"
          scrollButtons="auto"
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="scrollable secondary auto tabs example">
          {navBarList.map((item, index) => (
            <Tab
              key={index}
              value={item?.url}
              label={item?.label}
              onClick={() => {
                handleNavChange(undefined, item?.url);
              }}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
};
