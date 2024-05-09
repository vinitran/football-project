import { Outlet } from 'react-router-dom';
import { NavBar } from '../nav-bar2';
import { LoginModal } from '../login-modal';
import { axiosConfiguration } from '../../configs/axiosconfiguartor';

type Props = {
  children?: any;
};

export const LayoutWithNavBar = (props: Props) => {
  return (
    <>
      <div className="relative">
        <NavBar />
        <div className="py-[24px] overflow-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
};
