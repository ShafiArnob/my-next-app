"use client";
import {
  Edge,
  MiniMap,
  Controls,
  Node,
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";
import { useCallback } from "react";

const initialNodes: Node[] = [
  {
    id: "1",
    data: {
      label: "Node 1",
    },
    // style: { border: "1px solid #777" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: {
      label: "Node 2",
    },
    position: { x: 200, y: 0 },
  },
  {
    id: "3",
    data: {
      label: "Node 3",
    },
    position: { x: 300, y: 0 },
  },
];

const initialEdges: Edge[] = [
  { id: "1-2", source: "1", target: "2", animated: true },
];

type Props = {};
const WorkFlow = (props: Props) => {
  const [nodes, setNodes, onNodeChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgeChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length} + 1`,
        type: "customEdge",
      };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges]
  );

  return (
    <div className="min-h-screen bg-black">
      <div>
        <h4 className="">React Flow</h4>
      </div>
      <div className="h-[600px] w-[800px] border-2">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodeChange}
          onEdgesChange={onEdgeChange}
          onConnect={onConnect}
          colorMode={"dark"}
          fitView
          className="bg-teal-50"
        >
          {/* <MiniMap /> */}
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkFlow;
