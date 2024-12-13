
import UseAppDispatch from "../Hooks/UseAppDispatch";
import { getFeed } from "../Services/FeedAsync"
import { useEffect } from "react";
import UserCard from "./UserCard";
import UseAppSelector from "../Hooks/UseAppSelector";
import { userCardTypes } from "../Types/Enums";


const Feed = () => {

  const feed = UseAppSelector((state) => state.Feed.feed)
  const hasMoreData = UseAppSelector((state) => state.Feed.hasMoreData)

  const dispatch = UseAppDispatch()

  console.log(feed)

  useEffect(() => {
    if (feed.length == 0 && hasMoreData == true) {
      dispatch(getFeed())
    }
  }, [feed])

  if (feed.length == 0) return <h1 className="text-3xl font-bold">No fresh faces in the crowd—time to shine solo!</h1>

  return (


    <div className="flex justify-center">

      {(feed.length > 0) && <UserCard user={{ userDetails: { firstName: feed[0].firstName, lastName: feed[0].lastName, _id: feed[0]._id, about: feed[0].about, gender: feed[0].gender, age: feed[0].age, photoUrl: feed[0].photoUrl }, type: userCardTypes.feed }} />}
    </div>

  )
}

export default Feed