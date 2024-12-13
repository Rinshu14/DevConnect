
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const PublicBody = () => {
  return (
    <>
      <Navbar />

      <div className='flex ' style={{ "height": "calc(100vh - 64px)" }}>

        <Outlet />
      </div>




    </>
  )
}

export default PublicBody