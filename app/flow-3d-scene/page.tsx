"use client";
import React, { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";

import { Output } from "./components/Output";
import PositionNode from "./components/Position";
import RotationNode from "./components/Rotation";
import ScaleNode from "./components/Scale";

const nodeTypes = {
  Output: Output,
  Position: PositionNode,
  Rotation: RotationNode,
  Scale: ScaleNode,
};

const initialNodes = [
  { id: "1", position: { x: 500, y: 400 }, type: "Output", data: { id: "1" } },
  { id: "2", position: { x: 30, y: 50 }, type: "Position", data: { id: "2" } },
  { id: "3", position: { x: 70, y: 50 }, type: "Rotation", data: { id: "3" } },
  { id: "4", position: { x: 110, y: 50 }, type: "Scale", data: { id: "4" } },
];
const initialEdges = [];

const Flow3DScene = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="bg-zinc-900">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background gap={12} size={1} className="bg-zinc-700" />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default Flow3DScene;
