import InputBox from "../CustomComponents/InputBox"
import { useState } from "react"
import Button from "../CustomComponents/Button"
import UserCard from "./UserCard"
import UseAppSelector from "../Hooks/UseAppSelector"
import { profile, updateProfile, appGenderEnum, themes } from "../Utils/ApplicationConstants"
import UseAppDispatch from "../Hooks/UseAppDispatch"
import { profileUpdate } from "../Services/UserAsync"
import { genderEnum, userCardTypes } from "../Types/Enums"
import { toastManager } from "../CustomComponents/ToastManager"
import { ToastType } from "../Types/Enums"


const Profile = () => {
  const [errorData] = useState<string>("")

  const dispatch = UseAppDispatch()
  let user = UseAppSelector((state) => state.User.user)


  const [firstName, setFirstName] = useState<string>(user.firstName)
  const [lastName, setLastName] = useState<string>(user.lastName)
  const [age, setAge] = useState<number>(user.age ?? 0)
  const [photoUrl, setPhotoUrl] = useState<string>(user.photoUrl ?? "")
  const [gender, setGender] = useState<genderEnum>(user.gender)
  const [about, setAbout] = useState<string>(user.about ?? "")
  const [file, setFile] = useState<File | null>(null)
  const [theme, setTheme] = useState<string>(user.theme)


  const handleFirstNameChange = (value: string | number) => {
    if (typeof value === 'string') {
      setFirstName(value)
    }
  }

  const handleLastNameChange = (value: string | number) => {
    if (typeof value === 'string') {
      setLastName(value)
    }
  }

  const handleAgeChange = (value: string | number) => {


    if (typeof value == "string") {
      setAge(Number.parseInt(value))
    }
   else{
    setAge(value)
   }
  }

  const handleFileChange = (e: any) => {

    console.log(e.target.files[0])
    if (e.target.files[0].size > 2097152) {

      toastManager.addToast({ message: "File size should be less than 2MB", type: ToastType.warning })
      return;
    }
    if (!e.target.files[0].type.includes("image")) {
      toastManager.addToast({ message: "Please choose a image file", type: ToastType.warning })
      return;
    }
    let url = URL.createObjectURL(e.target.files[0])


    setFile(e.target.files[0])
    setPhotoUrl(url)
  }

  const handleGenderChange = (e: any) => {
    if (e.target.vale == appGenderEnum.female) {
      setGender(genderEnum.female);
    }
    else if (e.target.vale == appGenderEnum.male) {
      setGender(genderEnum.male);
    }
    else if (e.target.vale == appGenderEnum.others) {
      setGender(genderEnum.others);
    }

  }

  const updateClick = () => {
    let form = new FormData()
    form.append("theme", theme)
    form.append("firstName", firstName)
    form.append("lastName", (lastName) ? lastName : "")
    form.append("about", about)
    form.append("gender", gender.toString())
    form.append("age", age.toString())
    file && form.append("file", file)
    dispatch(profileUpdate(form))
  }


  return (
    <div className="w-full flex justify-evenly ">
      <div className="card bg-base-300  shadow-xl  my-7  max-w-xl max-h-fit">
        <div className="card-body  text-center">

          <h1 className="text-3xl font-bold">{profile}</h1>
          <div className="flex">
            <InputBox placeholder="First Name" type="text" value={firstName} onInputChange={handleFirstNameChange} />
            <InputBox placeholder="Last Name" type="text" styles={"ml-4"} value={lastName} onInputChange={handleLastNameChange} />
          </div>
          <div className="flex">
            <InputBox placeholder="Age" type="number" value={age} onInputChange={handleAgeChange} />
            <select className="input select-bordered w-full max-w-xs  ml-4 " style={{ outline: "none" }} onChange={(e) => handleGenderChange(e)}>
              <option value="" hidden>Select an option</option>
              {

                Object.values(genderEnum).map((item) => {
                  return <option selected={gender === item}>{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</option>
                })

              }

            </select>
          </div>
          <div className="flex">
            <InputBox placeholder="Email" type="email" value={user.emailId} disabled readOnly />
            <input type="file" accept="image/*" className="file-input file-input-bordered w-full max-w-xs ml-4" onChange={(e) => handleFileChange(e)} />
          </div>
          <textarea className="textarea textarea-bordered w-full resize-none " style={{ outline: "none" }} placeholder="About" value={about} onChange={(e) => { setAbout(e.target.value) }}></textarea>
          <select className="input select-bordered w-full max-w-xs   " style={{ outline: "none" }} onChange={(e) => setTheme(e.target.value.toLocaleLowerCase())}>
            <option value="" hidden>Select an option</option>
            {/* <option selected={theme === dark}>{dark}</option>
            <option selected={theme === light}>Light </option> */}
            {

              Object.values(themes).map((item) => {
                return <option selected={theme === item}>{item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</option>
              })

            }
          </select>
          <p>{errorData}</p>
          <Button text={updateProfile} category={"primary"} onClick={updateClick} />
        </div>
      </div>
      <div className=" items-center flex ">

        <UserCard user={{ userDetails: { _id: user._id, firstName, lastName, age, about, gender, photoUrl }, type: userCardTypes.profile }} />
      </div>
    </div>
  )
}


export default Profile
