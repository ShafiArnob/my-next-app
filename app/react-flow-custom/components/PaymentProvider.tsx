import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import Image from "next/image";
import { X } from "react-bootstrap-icons";
const PAYMENT_PROVIDER_IMAGE_MAP: { [code: string]: string } = {
  St: "https://cdn.worldvectorlogo.com/logos/stripe-2.svg",
  Ap: "https://cdn.worldvectorlogo.com/logos/apple-14.svg",
  Gp: "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg",
  Pp: "https://avatars.githubusercontent.com/u/476675?s=280&v=4",
  Am: "https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png",
};

export default function PaymentProvider({
  data: { name, code },
  id,
}: NodeProps<{ name: string; code: string }>) {
  const { setNodes } = useReactFlow();

  return (
    <div className="flex items-center bg-white p-1 pb-1 pl-3 gap-2 border-2 border-[#5e5eff] rounded-[24px] w-[140px]">
      <div className="h-4 w-4">
        <Image
          height={100}
          width={100}
          src={PAYMENT_PROVIDER_IMAGE_MAP[code]}
          alt=""
        />
      </div>

      <div className="grow">
        <p className="text-xs ">{name}</p>
      </div>

      <button
        // aria-label="Delete Payment Provider"
        // pointerEvents="all"
        // icon={}
        // color="red"
        // bg="transparent"
        // size="small"
        onClick={
          () =>
            setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id)) //Delete Nodes
        }
      >
        <X />
      </button>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
