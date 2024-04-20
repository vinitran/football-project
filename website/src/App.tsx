import { Outlet } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/global.scss';
import { Routes, Route, BrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from './routes';
import { NarBar } from './components/nav-bar';

export const App = () => {
  return (
    <>
      <ToastContainer />
      <NarBar />
      <RouterProvider router={router} />
    </>
  );
};
