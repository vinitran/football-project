import { Outlet } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/global.scss';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from 'routes';

export const App = () => {
  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          {router.map((route : any, index : number) => {
            return (
              <>
                <Route path={route.path} element={<route.element />} />
              </>
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
};
