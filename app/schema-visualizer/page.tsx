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
import { getInfoFromSchema } from "./components/SchemaVisualizer.utils";
import { schema } from "./components/SchemaVisualizer.constants";
import ModelNode from "./components/ModelNode";

const modelTypes = {
  model: ModelNode,
};

const { models } = getInfoFromSchema(schema);

const nodes: Node[] = models.map((model) => {
  return {
    id: model.name,
    position: { x: 0, y: 0 },
    data: model,
    type: "model",
  };
});

// const nodes: Node[] = [
//   {
//     id: "2",
//     data: {
//       label: "Node 2",
//     },
//     position: { x: 200, y: 0 },
//   },
// ];

const edges: Edge[] = [];

const SchemaVisualizer = () => {
  console.log(nodes);

  return (
    <div className="h-screen w-screen bg-[#1c1c1c]">
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={edges}
        nodeTypes={modelTypes}
        colorMode={"dark"}
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
