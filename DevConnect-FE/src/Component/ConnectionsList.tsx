
import { useEffect } from 'react'
import UseAppDispatch from '../Hooks/UseAppDispatch'
import UseAppSelector from '../Hooks/UseAppSelector'
import ConnectionCard from './ConnectionCard'

import { fetchConnections } from "../Services/ConnectionAsync"

const ConnectionsList = () => {

    const dispatch = UseAppDispatch()
    const Connections = UseAppSelector((state) => state.Connections)
   

    useEffect(() => {
        dispatch(fetchConnections())
    }, [])

    if (Connections.length == 0) return <h1 className="text-3xl font-bold">Your network is a blank canvas—paint it with connections!🎨</h1>
    return (

        <div className='p-4'>
            <h1 className="text-3xl font-bold">The Cool People You Know!</h1>
            {Connections.map((user) => {
           
                return <ConnectionCard key={user._id} user={user} />
            })}
        </div>

    )
}

export default ConnectionsList