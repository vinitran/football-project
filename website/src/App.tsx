import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TestRoute } from './modules/test/const/route.const';

function App() {
  const routes = [TestRoute];
  const router = createBrowserRouter(routes);

  return (
    <div className="App">
      <div className="header">
        {routes.map((ele) => (
          <div className="header-item">{ele.navName}</div>
        ))}
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
