import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthenticationForm from '../Component/AuthenticationForm'
import PublicBody from '../Component/PublicBody'
import { AuthenticationFormTypes } from '../Types/Enums'



const PublicRoute = () => {
 
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <PublicBody />,
      children: [{
        path: '/',
        element: <AuthenticationForm formType={AuthenticationFormTypes.login}/>
      },
      {
        path: '/signup',
        element: <AuthenticationForm formType={AuthenticationFormTypes.signUp}/>
      },
      {
        path: '*',
        element: <AuthenticationForm formType={AuthenticationFormTypes.login} />
      }
      ]
    }
  ])
  return (
    <RouterProvider router={appRouter} />
  )
}

export default PublicRoute