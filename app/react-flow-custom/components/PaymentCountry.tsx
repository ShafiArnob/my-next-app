import { Handle, NodeProps, Position } from "@xyflow/react";
import ReactCountryFlag from "react-country-flag";
import CustomHandle from "./CustomHandle";

export default function PaymentCountry({
  data: { currency, country, countryCode },
}: NodeProps<{
  currency: string;
  country: string;
  countryCode: string;
}>) {
  return (
    <div className="flex items-center rounded-xl bg-[#e2e8f0] border-2 border-[#bbbdbf] p-2 gap-2 w-[155px]">
      <div>
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          aria-label={country}
          style={{ fontSize: "2em", lineHeight: "2em" }}
        />
      </div>
      <div className="grow">
        <div>
          <p>{country}</p>
          <p className="text-xs">{currency}</p>
        </div>
      </div>
      <CustomHandle type="source" position={Position.Right} />
      <CustomHandle type="target" position={Position.Left} />
    </div>
  );
}
