import NavigationBar from "@/components/NavigationBar"
import HeroComponents from "@/components/HeroComponents"


export default function Home() {
  return <div className="w-full h-screen flex flex-col gap-y-5 bg-white">
    
    <NavigationBar />
    <div>
      <HeroComponents />
    </div>
  </div>
}
