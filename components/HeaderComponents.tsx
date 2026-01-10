import {MapPin, Phone, Mail, Github} from "lucide-react"
import {redirect} from "next/navigation"


export default function HeaderComponents() {
  const handleNavigation = (type : string) => {
    if (type === "github") {
     redirect("https://github.com/rylsherdamz-rgb?tab=overview&from=2025-12-01&to=2025-12-31") 
    }

  
  }
  return <div className=" border-2 flex flex-row  px-10 py-5 gap-x-5 border-black rounded-2xl w-full h-full">
    <div className="w-50 h-full rounded-2xl border border-black">

    </div> 
    <div className=" w-full flex flex-col gap-y-5  px-5 py-2">
      <div className="flex flex-col gap-y-3">
        <p className="font-bold text-black text-2xl">
        Richie Christian De Guzman
      </p>
        <div className="flex flex-row gap-x-2">
        <MapPin color="#000" size={24} />
        <p className=" text-black text-lg">Antipolo, Rizal</p>
        </div>
        <p className=" text-xl text-black">Full Stack Developer</p>
      </div>
    <div className="w-full flex flex-row gap-x-5 ">
        <button className="bg-black  hover:-translate-y-1

          duration-300 ease-in-out px-7 gap-x-2 py-1.5   flex w-40 h-10 rounded-xl" ><Phone className="my-1" color="#fff" size={16}/><p>
Call Me
        </p></button>
    <button className="bg-white text-black  border border-black hover:-translate-y-1
          duration-300 ease-in-out px-7 gap-x-2 py-1.5
          flex w-40 h-10 rounded-xl" ><Mail className="my-1" color="#000" size={16}/><p>
Email Me
        </p></button>

   <button onClick={() => handleNavigation("github")} className="bg-white text-black  border border-black hover:-translate-y-1
          duration-300 ease-in-out px-9 gap-x-2 py-1.5
          flex w-40 h-10 rounded-xl" ><Github className="my-1" color="#000" size={16}/><p>
Github 
        </p></button>


    </div>

    </div> 

  </div>
}
