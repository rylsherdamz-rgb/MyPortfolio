import {redrect} from "next/navigation"
import {Github, Mail, Phone} from "lucide-react"
interface ButtonProps {
  ButtonTitle : string
  IsBlack : boolean 
}

export default function Button({ButtonTitle, isBlack} : ButtonProps) {
  const handleNavigation = () => {
    // change the redirect links
    if (ButtonTitle === "Call Me") {
     redirect("https://github.com/rylsherdamz-rgb?tab=overview&from=2025-12-01&to=2025-12-31") 
    }else if (ButtonTitle === "Email") {
     redirect("https://github.com/rylsherdamz-rgb?tab=overview&from=2025-12-01&to=2025-12-31") 
    }else if (ButtonTitle === "Github") {
     redirect("https://github.com/rylsherdamz-rgb?tab=overview&from=2025-12-01&to=2025-12-31") 
    }
  }
 
  return <button 
    className={`${isBlack ? "bg-black text-white" : "bg-white text-black border border-black"}  
    hover:-translate-y-1
    duration-300
    ease-in-out px-4
    gap-x-3 py-2
    flex w-30 h-10 rounded-xl`}
    onClick={handleNavigation}
  >
    {ButtonTitle === "Email" && (<Mail className="my-0.5" size={16} color={isBlack ? "#fff" : "#000"} />)} 

     {ButtonTitle === "Call Me" && (<Phone className="my-0.5" size={16} color={isBlack ? "#fff" : "#000"} />)}
     {ButtonTitle === "Github" && (<Github className="my-0.5" size={16} color={isBlack ? "#fff" : "#000"} />)} 
    <p>{ButtonTitle}</p></button> 
}

