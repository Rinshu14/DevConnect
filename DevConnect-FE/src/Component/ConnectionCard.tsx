import { defaultUserImage } from '../Utils/ApplicationConstants'
import { OtherUser } from '../Types/CommonTypes'
import Button from '../CustomComponents/Button'
import { Chat } from "../Utils/ApplicationConstants"
import { useNavigate } from 'react-router-dom'


type ConnectionCardProps = {
    user: OtherUser
}


const ConnectionCard = ({ user }: ConnectionCardProps) => {

    const navigate = useNavigate();
    const photoUrl = user?.photoUrl
    const { firstName, lastName, age, gender, about } = user

    const onChatClick = () => {
        // navigate("/chat",{targetUserId:user?_id})
        navigate(`/chat/${user._id}`)
    }


    return (
        <div className="bg-base-300 max-w-2xl shadow-xl  my-5 flex rounded-lg">
            <img className={`w-[9rem] rounded-lg`}
                src={(photoUrl) ? photoUrl : defaultUserImage}
                alt="User image"
            />
            <div className="card-body overflow-auto max-h-[11.5rem]  p-[1rem]" >
                <h4 className="card-title leading-3" >{firstName} {lastName}</h4>
                <span >{age} , {gender}</span>
                <span className='block leading-5 break-words  h-[3.5rem] w-full overflow-auto' >{about}</span>
                <span className='w-full flex justify-end'>
                    <Button text={Chat} category={"primary"} onClick={onChatClick} />
                </span>
            </div>

        </div>

    )
}

export default ConnectionCard