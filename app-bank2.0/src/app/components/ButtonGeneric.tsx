import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    nameButton: string
    onClick : ()=>void
}

const ButtonGeneric:React.FC<ButtonProps> = ({nameButton, onClick, ...props}) => {
 return (
   <button 
    className="w-72 h-8 mt-4 bg-sky-500 rounded-xl text-white" 
    onClick={onClick}
    {...props}
    >{nameButton}</button>
 );
}

export default ButtonGeneric