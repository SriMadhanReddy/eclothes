import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import './index.css';
import Login from './components/Login/Login';
import LoginProvider from './store/LoginProvider';
import App from './App';

const router = createBrowserRouter([
    {
        path: "/home",
        element: <App />,
    },
    {
        path: "/",
        element: <Login />
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginProvider><RouterProvider router={router} /></LoginProvider>);
