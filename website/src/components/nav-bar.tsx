import { SyntheticEvent, useEffect, useState } from 'react';
import { navBarList } from '../consts/nav-bar.const';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Button, styled } from '@mui/material';
import { LoginModal } from './login-modal';
import { _axios, axiosConfiguration } from '../configs/axiosconfiguartor';
import { RegisterModal } from './register-modal';
import { IFormRegister } from '../interfaces/entites/form-register';
import { toast } from 'react-toastify';
import { UserInforModal } from './user-info-modal';
import { IUserInfo } from '../interfaces/entites/user-info';

type Props = {
  children?: any;
};

export const NavBar = (props: Props) => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(0);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);

  const handleNavChange = (event?: React.SyntheticEvent | undefined, newValue?: number) => {
    const filterResult = navBarList.filter((navBar) => navBar.id === newValue);

    if (filterResult.length === 1) {
      setNav(filterResult[0].id);
      navigate(`${filterResult[0].url}`);
      console.log('seted');
    }
  };

  interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
  }

  const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      gap: '80px'
      // backgroundColor: 'transparent'
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%'
      // backgroundColor: '#635ee7'
    }
  });

  interface StyledTabProps {
    label: string;
  }

  const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} onClick={() => {}} />
  ))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    // marginRight: theme.spacing(1),
    margin: theme.spacing('2px 4px 0 4px'),
    padding: theme.spacing('0 2px 0 2px'),
    color: 'white',
    cursor: 'pointer',
    // color: 'rgba(255, 255, 255, 0.7)',
    // backgroundColor: '#e6ffe6',
    '&.Mui-selected': {
      color: 'white'
    }
    // '&.Mui-focusVisible': {
    //   backgroundColor: 'rgba(100, 95, 228, 0.32)'
    // }
  }));

  // FUNCTION
  const fetchLogin = async (username: string, password: string) => {
    const res = await _axios.post('auth/login', { username: username, password: password });
    if (res) {
      axiosConfiguration.setAxiosToken(res.data.data, true);
      axiosConfiguration.setUserInfo({
        username: 'username',
        name: 'name',
        email: 'email'
      });
      toast.success('Đăng nhập thành công', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }
    setIsOpenLogin(false);
  };
  const fetchRegister = async (formRegister: IFormRegister) => {
    const res = await _axios.post('auth/register', {
      username: formRegister.username,
      name: formRegister.name,
      email: formRegister.email,
      password: formRegister.password
    });
    if (res) {
      toast.success('Đăng kí tài khoản thành công', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    }
    setIsOpenRegister(false);
    setIsOpenLogin(true);
  };

  // EFFECT
  useEffect(() => {
    toast.warning('user change');
  }, [axiosConfiguration.getAxiosToken()]);

  return (
    <>
      <div className="nav-bar grid grid-cols-3 gap-4 pt-1">
        <img
          className="h-[48px] w-[235px] ml-[8px] col-start-1 cursor-pointer"
          src={require('../assets/image/logo.png')}
          alt=""
          onClick={() => {
            navigate('/schedule-battle');
          }}
        />
        <div className="flex-1 flex items-center justify-center uppercase col-start-2">
          <Box sx={{ fontSize: '20px', bgcolor: '--color-main' }}>
            <StyledTabs value={nav} aria-label="styled tabs example" onChange={handleNavChange}>
              {navBarList.map((item, index) => (
                <StyledTab key={index} label={item.label} />
              ))}
            </StyledTabs>
          </Box>
        </div>
        <div className="flex items-center justify-end gap-2 mr-[8px] col-start-3">
          {!axiosConfiguration.getAxiosToken() ? (
            <>
              <Button
                className="!text-white"
                onClick={() => {
                  setIsOpenLogin(!isOpenLogin);
                }}>
                Đăng nhập
              </Button>
              <Button
                className="!text-white"
                onClick={() => {
                  setIsOpenRegister(!isOpenRegister);
                }}>
                Đăng kí
              </Button>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  setIsOpenUserInfo(true);
                  toast.success(isOpenUserInfo);
                }}
                className="rounded-[50%] border-solid border-[2px] border-[--color-second] p-2 flex items-center justify-center">
                <div className="text-white">{isOpenUserInfo}</div>
                <svg
                  className="w-[18px] h-[18px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512">
                  <path
                    fill="white"
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpenLogin ? (
        <LoginModal
          onSubmit={(username: string, password: string) => {
            fetchLogin(username, password);
          }}
          onCancel={() => {
            setIsOpenLogin(false);
          }}
        />
      ) : (
        <></>
      )}
      {isOpenRegister ? (
        <RegisterModal
          onSubmit={(formRegister: IFormRegister) => {
            fetchRegister(formRegister);
          }}
          onCancel={() => {
            setIsOpenRegister(false);
          }}
        />
      ) : (
        <></>
      )}
      {isOpenUserInfo && (
        <UserInforModal
          userInfo={axiosConfiguration.getUserInfo()}
          onLogout={() => {
            axiosConfiguration.deleteAxiosToken();
            axiosConfiguration.setUserInfo(undefined);
            setIsOpenUserInfo(false);
            toast.success('Đã đăng xuất');
          }}
          onCancel={() => setIsOpenUserInfo(false)}
        />
      )}
    </>
  );
};
