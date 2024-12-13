import Button from "../CustomComponents/Button"
import { ignored, intrested } from "../Utils/ApplicationConstants"
import { defaultUserImage } from "../Utils/ApplicationConstants"
import { reviewUser } from "../Services/RequestsAsync"
import UseAppDispatch from "../Hooks/UseAppDispatch"
import { UserCardProps } from "../Types/CommonTypes"
import { userCardTypes } from "../Types/Enums"
import APIConstants from "../Utils/APIConstansts"


type Props = {
    user: UserCardProps
}

const UserCard = ({ user }: Props) => {
    if (!user) return <></>
    const { firstName, lastName, photoUrl, about, age, gender, _id } = user.userDetails
    const type = user.type;
    const dispatch = UseAppDispatch();

    const handleIgnoreClick = () => {
        dispatch(reviewUser({ status: APIConstants.ignored, userId: _id }))
    }
    const handleIntrestedClick = () => {
        dispatch(reviewUser({ status: APIConstants.intrested, userId: _id }))
    }

    return (
        <div className="card bg-base-300 w-96 shadow-xl my-5 max-h-[28rem]">
            <figure>
                <img className={`h-[14rem] w-[100%]`}
                    src={(photoUrl) ? photoUrl : defaultUserImage}
                    alt="User image"
                />
            </figure>
            <div className="card-body overflow-auto max-h-[15rem] w-full p-[1rem]" >
                <h4 className="card-title leading-3" >{firstName} {(lastName) ? lastName : ""}</h4>
                <span >{age} , {gender}</span>
                <span className={`block leading-5 break-words  max-h-[6rem] w-full overflow-auto`} >{about}</span>
                {(type == userCardTypes.feed) && <div className="card-actions justify-center flex">
                    <Button text={ignored} category="primary" onClick={handleIgnoreClick}></Button>
                    <Button text={intrested} category="secondary" onClick={handleIntrestedClick}></Button>
                </div>}
            </div>
        </div>
    )
}

export default UserCard
