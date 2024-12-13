

import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'



const Body = () => {
  return (
    <>
      <Navbar />
      {/* <div className='flex items-center justify-center ' style={{ "height": "calc(100vh - 64px)" }}> */}
      <div className='flex justify-center overflow-y-scroll' style={{ "height": "calc(100vh - 64px)" }}> 
        <Outlet />
      </div>

    </>
  )
}

export default Body