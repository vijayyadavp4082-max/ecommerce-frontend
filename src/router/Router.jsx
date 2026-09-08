import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
export const router = createBrowserRouter([
    {
        element: <App />,
        path: '/',
        children: [{
            index: true,
            element: <Home />
        },
        {
            path: "/login",
            element: <Login />
        }, {
            path: "/register",
            element: < Register />
        }
        ]
    }
])