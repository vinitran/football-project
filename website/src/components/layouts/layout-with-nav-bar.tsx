import { Outlet } from 'react-router-dom';
import { NavBar } from '../nav-bar';

type Props = {
  children?: any;
};

export const LayoutWithNavBar = (props: Props) => {
  return (
    <>
      <NavBar />
      <div className="py-[24px] overflow-hidden">
        <Outlet />
      </div>
    </>
  );
};
