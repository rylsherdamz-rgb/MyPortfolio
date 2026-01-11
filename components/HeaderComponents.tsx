import {MapPin, Phone, Mail, Github} from "lucide-react"
import Button from "./Button"
import {redirect} from "next/navigation"


export default function HeaderComponents() {
 return <div className=" border-1 flex flex-row  px-5 py-5 gap-x-5 border-black rounded-2xl w-full h-full">
    <div className="w-40 h-full rounded-2xl border border-black">

    </div> 
    <div className=" w-full flex flex-col gap-y-2  px-2 py-2">
      <div className="flex flex-col gap-y-3">
        <p className="font-bold text-black text-lg">
        Richie Christian De Guzman
      </p>
        <div className="flex flex-row gap-x-2">
        <MapPin color="#000" size={24} />
        <p className=" text-black text-md">Antipolo, Rizal</p> 
        </div>
        <p className=" text-lg text-black">Full Stack Developer</p>
      </div>
    <div className="w-full flex flex-row gap-x-5 ">
        <Button ButtonTitle="Call Me" isBlack={true} />
        <Button ButtonTitle="Email" isBlack={false}/>
        <Button ButtonTitle="Github" isBlack={false}/>
    </div>

    </div> 

  </div>
}
