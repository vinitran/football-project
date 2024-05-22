import { Outlet } from 'react-router-dom';
import { NavBar } from '../nav-bar';
import { LoginModal } from '../login-modal';
import { axiosConfiguration } from '../../configs/axiosconfiguartor';

type Props = {
  children?: any;
};

export const LayoutWithNavBar = (props: Props) => {
  return (
    <>
      <div className="relative app h-[100dvh] overflow-hidden">
        <NavBar />
        <div className="py-[24px]  overflow-auto h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};
