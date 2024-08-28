"use client";
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  ReactFlow,
} from "@xyflow/react";
import React from "react";
import "@xyflow/react/dist/base.css";

const nodes: Node[] = [];
const edges: Edge[] = [];

const SchemaVisualizer = () => {
  return (
    <div className="h-screen w-screen bg-[#1c1c1c]">
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={edges}
        fitView
        fitViewOptions={{ padding: 0.4 }}
      >
        <Background color="#222" variant={BackgroundVariant.Lines} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default SchemaVisualizer;
