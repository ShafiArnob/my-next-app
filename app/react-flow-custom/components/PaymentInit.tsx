import { Handle, NodeProps, Position } from "@xyflow/react";

const PaymentInit = ({ data: { amount } }: NodeProps<{ amount: number }>) => {
  return (
    <div className="bg-white border border-[#aa1fff]">
      <div className="bg-[#410566] p-1">
        <p className="text-lg text-white">Payment Initialzed</p>
      </div>
      <div className="p-2">
        <p className="text-2xl text-blue-600">${amount}</p>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default PaymentInit;
