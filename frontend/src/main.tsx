import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
    // children: [
    //   {
    //     path: '/archive',
    //     element: <Archive />
    //   },
    // path: '/notes/:noteId',
    // element: (
    // <NotePage
    // />
    // )
    // }
    // ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
