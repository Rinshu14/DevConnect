import { BaseToastType } from "../Types/CommonTypes"

const Toast = ({message,type}:BaseToastType) => {
console.log(type)
  return (
    <div className="toast toast-top toast-center z-50 mt-10 ">
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
    </div>
    
  </div>
  )
}

export default Toast