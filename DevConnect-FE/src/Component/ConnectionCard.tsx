import { defaultUserImage } from '../Utils/ApplicationConstants'
// import { ConnectionType } from '../Types/CommonTypes'
import { OtherUser } from '../Types/CommonTypes'

type ConnectionCardProps={
user:OtherUser
}

const ConnectionCard = ({ user }:ConnectionCardProps) => {
    const photoUrl = user?.photoUrl
    const { firstName, lastName,age,gender,about } = user
    return (
        <div className="bg-base-300 max-w-2xl shadow-xl  my-5 flex rounded-lg">
            <img className={`w-[6rem] rounded-lg`}
                src={(photoUrl) ? photoUrl : defaultUserImage}
                alt="User image"
            />
            <div className="card-body overflow-auto max-h-[8rem]  p-[1rem]" >
            <h4 className="card-title leading-3" >{firstName} {lastName}</h4>
                <span >{age} , {gender}</span>
                <span className='block leading-5 break-words  h-[3.5rem] w-full overflow-auto' >{about}</span>
            </div>
        </div>

    )
}

export default ConnectionCard