
import { forwardRef, InputHTMLAttributes, useState,  ChangeEvent } from "react"
interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string
    type: string
    validate?: (value: string) => boolean
    styles?: string
    value?: string | number
    onInputChange?: (value: string|number) => void


}



const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(({ placeholder, type, validate, styles, onInputChange, ...props }: InputBoxProps, ref) => {
    const [error, setError] = useState<boolean>(false)


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (validate) setError(!validate(e.target.value))
       let val=(type==='Number')?((e.target.value=='')?'':parseInt(e.target.value)):e.target.value
        if (onInputChange) {
            onInputChange(val);
        }
    }

    return (
        // <input type={type} placeholder={placeholder} ref={ref} {...props} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e) }} className={`input input-bordered w-full max-w-xs  ${error ? "input-error" : ""} ${styles}`} style={{ outline: "none" }} />
        <input type={type} placeholder={placeholder} ref={ref} {...props} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e) }} className={`input input-bordered w-full  ${error ? "input-error" : ""} ${styles}`} style={{ outline: "none" }} />
    )
})

export default InputBox