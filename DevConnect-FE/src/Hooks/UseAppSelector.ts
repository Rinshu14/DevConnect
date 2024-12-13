
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../Store/Store";


const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default UseAppSelector