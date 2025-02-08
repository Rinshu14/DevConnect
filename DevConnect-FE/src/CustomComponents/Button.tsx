import  {ButtonHTMLAttributes,forwardRef} from 'react'
import clsx from 'clsx';
interface ButtonProps  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  category:string
}

const Button =forwardRef<HTMLButtonElement,ButtonProps> (({text,category,...props},ref) => {
  return (
    <button ref={ref} {...props}  className={clsx("btn",(category=="primary")?"btn-primary":"btn-secondary")}   >{text}</button>
    

  )
})

export default Button