import PrivateRoute from "./Routes/PrivateRoute"
import PublicRoute from './Routes/PublicRoutes'
import { useEffect } from "react"
import UseAppSelector from "./Hooks/UseAppSelector"
import UseAppDispatch from "./Hooks/UseAppDispatch"
import { profileView } from "./Services/UserAsync"
import {  keyForThemeInLocalStorage, themes } from "./Utils/ApplicationConstants"
import { getThemeFromLocalStorage } from "./Utils/LocalStorage"

import ToastManager from "./CustomComponents/ToastManager"

function App() {

  const theme = UseAppSelector((state) => state.User?.user?.theme) || (getThemeFromLocalStorage(keyForThemeInLocalStorage) || themes.light)
  const isLogin = UseAppSelector((state) => state.User.isLoggedIn)
  const dispatch = UseAppDispatch()


  useEffect(() => {
    document.querySelector('body')?.setAttribute('data-theme', theme);
  }, [theme])

  useEffect(() => {

    dispatch(profileView())

  }, [])

  return (
    <>
      <ToastManager />
      {isLogin ? <PrivateRoute /> : <PublicRoute />}

    </>
  )



}



export default App
