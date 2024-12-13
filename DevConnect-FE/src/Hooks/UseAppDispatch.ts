import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/Store";


//useDispatch returns a Dispatch<UnknownAction> type
const UseAppDispatch=():AppDispatch => useDispatch<AppDispatch>()
export default UseAppDispatch
//to useAppDispatch method we are assinging a method that will take no argument and  will return a dipstach Method 
//specifically   of AppDispatch
// and here AppDispatch is a type of actions that can be disptached for our store

//by using this we are trying to make our disptaches more safe now they will dispatch the actions only those are compatible to our store

