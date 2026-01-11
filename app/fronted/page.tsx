
import dynamic from "next/dynamic"

const KonosubaScene  = dynamic(
  () => import("@/components/canvasComponents/Konusuba")
)


export default function UIDesign() {
return <div className="w-full h-screen">
<KonosubaScene />
</div>
}
