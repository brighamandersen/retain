import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Archive from './routes/Archive.tsx';
import Home from './routes/Home.tsx';
import Search from './routes/Search.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/archive',
        element: <Archive />
      },
      {
        path: '/search',
        element: <Search />
      }
      // {
      //   path: '/notes/:noteId',
      //   element: <NotePage />
      // }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
