
interface TechStackComponentProp {
  Items : string[]
  Title : string
}



export default function TechStackComponent({Title, Items} : TechStackComponentProp) {
  return <div className="px-2 text-black flex flex-col gap-y-5 py-3 border">
  <p classNAme="text-black text-lg">{Title}</p>
  <div className="flex flex-row gap-x-2">
    {Item.map((data, index) => (
      <div key={index}>{data}</div> 
    ))}
  </div>
  </div>
}
