import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Archive from './routes/Archive.tsx';
import Home from './routes/Home.tsx';
import Search from './routes/Search.tsx';
import Trash from './routes/Trash.tsx';
import Login from './routes/Login.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import { AuthProvider } from './AuthContext.tsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: '/archive',
        element: (
          <ProtectedRoute>
            <Archive />
          </ProtectedRoute>
        )
      },

      {
        path: '/search',
        element: (
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        )
      },
      {
        path: '/trash',
        element: (
          <ProtectedRoute>
            <Trash />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
