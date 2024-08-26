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
import { initialEdges, initialNodes } from "./Workflow.constants";
import PaymentInit from "./components/PaymentInit";
import PaymentCountry from "./components/PaymentCountry";
import PaymentProvider from "./components/PaymentProvider";
import PaymentProviderSelect from "./components/PaymentProviderSelect";

const nodeTypes = {
  paymentInit: PaymentInit,
  paymentCountry: PaymentCountry,
  paymentProvider: PaymentProvider,
  paymentProviderSelect: PaymentProviderSelect,
};

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
          nodeTypes={nodeTypes}
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
