import { createBrowserRouter } from 'react-router-dom';
// import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import App from '../App'; // Adjust the import path as needed 
import PreviewPage from '../pages/PreviewPage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import Home from '../pages/HomePage';

// Define the routes with type annotations
const Router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute > <App /> </ProtectedRoute >,
        // errorElement: <NotFoundPage />,
        children: []
    },
    {
        path: '/home',
        element: <ProtectedRoute >  <Home /></ProtectedRoute >,
        // errorElement: <NotFoundPage />,
        children: []
    },
    {
        path: '/p/:uid',
        element: <PreviewPage />,
        // errorElement: <NotFoundPage />,
        children: []
    },
    {
        path: '/signin',
        element:<ProtectedRoute > <LoginPage /> </ProtectedRoute >,
        // errorElement: <NotFoundPage />,
        children: []
    }

]);

export default Router;

