import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Product from '../pages/product/Products'
import ProductCard from '../component/productCard/ProductCard'
import ProductDetails from '../pages/productDetails/ProductDetails'
import Cart from '../pages/cart/Cart'
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
            path:"/products",
            element:<Product/>
        },{
            path:"products/:id",
            element:<ProductDetails/>
        },
        
        {
            path: "/register",
            element: < Register />
        },

        {
            path: "/cart",
            element: < Cart/>
        }
        ]
    }
])