import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PageLayout } from './layouts/PageLayout'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'

export const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout><HomePage/></PageLayout>,
    }, 
    {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <LoginPage/>
          }
        ]
    },
  ])

  return (
    <RouterProvider router={router} />    
  )
}
