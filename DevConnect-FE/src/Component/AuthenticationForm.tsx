import { loginRequest, signupRequest } from "../Services/UserAsync"
import UseAppDispatch from "../Hooks/UseAppDispatch"
import { useRef, useState } from "react"
import InputBox from "../CustomComponents/InputBox"
import Button from "../CustomComponents/Button"
import { emailValidator, passwordValidator, usernameValidator, ageValidator } from "../Validators/Validations"
import { login, signUp, AuthenticationFormLoginText, AuthenticationFormSignUpText } from "../Utils/ApplicationConstants"
import { useNavigate } from "react-router-dom"
import { AuthenticationFormTypes } from "../Types/Enums"
import { genderEnum } from "../Types/Enums"


type AuthenticationFormProps = {
  formType: AuthenticationFormTypes
}


const AuthenticationForm = ({ formType }: AuthenticationFormProps) => {

  const dispatch = UseAppDispatch()
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const firstNameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)

  const message = (formType == AuthenticationFormTypes.login) ? AuthenticationFormLoginText : AuthenticationFormSignUpText
  const [errordata, setErrorData] = useState<string>("")


  const AuthenticationFormClick = () => {
    if (formType == AuthenticationFormTypes.login) {
      if (emailRef.current && passwordRef.current) {
        if (emailValidator(emailRef.current.value) && passwordValidator(passwordRef.current.value)) {
          setErrorData("")
          dispatch(loginRequest({ emailId: emailRef.current.value, password: passwordRef.current.value }))
        }
        else {

          setErrorData("Invalid Details")
        }
      }
    }
    else {
      if (emailRef.current && passwordRef.current && firstNameRef.current && ageRef.current && genderRef.current) {
        if (emailValidator(emailRef.current.value) && passwordValidator(passwordRef.current.value) && ageValidator(ageRef.current.value) && usernameValidator(firstNameRef.current.value)) {
          setErrorData("")
          dispatch(signupRequest({ emailId: emailRef.current.value, password: passwordRef.current.value, age: parseInt(ageRef.current.value), firstName: firstNameRef.current.value, gender: genderRef.current.value.toLocaleLowerCase() as genderEnum }))
        }
        else {
          setErrorData("Invalid Details")
        }
      }
    }
  }

  const navigateToOther = () => {
    (formType == AuthenticationFormTypes.login) ? navigate(`/${AuthenticationFormTypes.signUp}`) : navigate("/")
  }

  return (
    <div className="card bg-base-300 w-96 shadow-xl m-auto  ">
      <div className="card-body items-center text-center ">
        <>
          <InputBox placeholder="Email" type="email" validate={emailValidator} ref={emailRef} />
          <InputBox placeholder="Password" type="password" validate={passwordValidator} ref={passwordRef} />
        </>
        {(formType == AuthenticationFormTypes.signUp) && <>
          <InputBox placeholder="First Name" type="text" validate={usernameValidator} ref={firstNameRef} />
          <InputBox placeholder="Age" type="number" validate={ageValidator} ref={ageRef} />
          <select className="input select-bordered w-full max-w-xs" ref={genderRef} style={{ outline: "none" }} >
            <option value="" hidden>Select an option</option>
            {
              Object.values(genderEnum).map((item) => {
                return <option >{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</option>
              })
            }
          </select>
        </>}

        <label>{message}  <span className="underline cursor-pointer" onClick={navigateToOther}>{(formType == AuthenticationFormTypes.login) ? signUp : login} </span></label>
        <p className="text-red-800">{errordata}</p>

        <Button text={(formType == AuthenticationFormTypes.login) ? login : signUp} category={"primary"} onClick={AuthenticationFormClick} />
      </div>
    </div>
  )
}

export default AuthenticationForm