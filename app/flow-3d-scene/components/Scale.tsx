import { useState } from "react";
import { Handle, Position } from "@xyflow/react";

export default function Scale({ data }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  return (
    <div className=" w-52 rounded-md bg-back overflow-hidden border border-solid border-back">
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ top: 30 }}
      />

      <div className="p-2 bg-purple-500 z-10  text-white">Scale</div>
      <div className="flex flex-row justify-between p-1">
        <div>x</div>
        <input
          type="number"
          className="p-1 bg-white opacity-50 text-sm"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-row justify-between p-1">
        <div>y</div>
        <input
          type="number"
          className="p-1 bg-white opacity-50 text-sm"
          value={y}
          onChange={(e) => setY(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-row justify-between p-1">
        <div>z</div>
        <input
          type="number"
          className="p-1 bg-white opacity-50 text-sm"
          value={z}
          onChange={(e) => setZ(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
