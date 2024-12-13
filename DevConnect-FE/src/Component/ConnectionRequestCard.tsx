import UseAppDispatch from "../Hooks/UseAppDispatch";
import { accept, reject, defaultUserImage } from "../Utils/ApplicationConstants";
import Button from "../CustomComponents/Button";
import { reviewConnectionRequest } from "../Services/ConnectionAsync"
import { ConnectionRequestType } from "../Types/CommonTypes";
import APIConstants from "../Utils/APIConstansts";


type ConnectionRequestCardProps={
    request:ConnectionRequestType
}

const ConnectionRequestCard = ({ request }: ConnectionRequestCardProps ) => {

const { firstName, lastName, about, age, gender, photoUrl } = request.fromUserId
    const dispatch = UseAppDispatch();
    const handleRejectClick = () => {
        dispatch(reviewConnectionRequest({ status: APIConstants.reject, reqId: request?._id }))
    }
    const handleAcceptedClick = () => {
        dispatch(reviewConnectionRequest({ status: APIConstants.accept, reqId: request?._id }))
    }


    return (
        <div className=" bg-base-300 min-w-[35rem] max-w-2xl h-[11rem]   shadow-xl  my-5 flex rounded-lg">
          
            <img className={` w-[9rem] rounded-lg `}
                src={(photoUrl) ? photoUrl : defaultUserImage}
                alt="User image"/>

       
            <div className="card-body overflow-auto  p-[1rem]" >
                <h4 className="card-title leading-3" >{firstName} {lastName}</h4>
                <span >{age} , {gender}</span>
                <span className='block leading-5 break-words  h-[2.7rem] w-full overflow-auto' >{about}</span>
                <div className="card-actions justify-end flex">

                    <Button text={accept} category="primary" onClick={handleAcceptedClick}></Button>
                    <Button text={reject} category="secondary" onClick={handleRejectClick}></Button>

                </div>
            </div>
        </div>
    )
}

export default ConnectionRequestCard