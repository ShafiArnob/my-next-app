import { NodeProps } from "@xyflow/react";
import { Model } from "./SchemaVisualizer.types";

export default function ModelNode({ data }: NodeProps<Model>) {
  return (
    <div className="rounded-lg min-w-60">
      <div className="p-1 text-center rounded-t-lg rounded-b-none bg-[#3d5787]">
        <span className="font-bold text-white">
          <pre>{data.name}</pre>
        </span>
      </div>
      {data.fields.map(({ type, name }, index) => (
        <div
          key={index}
          className="flex justify-between p-1 text-white even:bg-[#282828] odd:bg-[#232323]"
        >
          <span>
            <pre>{name}</pre>
          </span>
          <span>
            <pre>{type}</pre>
          </span>
        </div>
      ))}
    </div>
  );
}
