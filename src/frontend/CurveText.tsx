import React, { useContext, createContext } from "react";
import { KeysetContext } from "../App";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Point } from "../curve/EDDSA";
import { classNames } from "../util";
import BN from "bn.js";

const CurveText = () => {
  const keySet = useContext(KeysetContext);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gray-200 p-2 w-full rounded-md flex justify-between">
        <KeyTextShowcase Key={keySet.privateKey} title={"Private Key"} />
        <ArrowRightIcon className="w-6 h-6 my-auto" />{" "}
        <KeyTextShowcase Key={keySet.publicKey} title={"Public Key"} />
      </div>
    </div>
  );
};

const KeyTextShowcase: React.FC<{
  Key: Point;
  title: string;
}> = ({ Key, title }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold">{title}</h3>
      <div className="flex flex-col">
        <div className="bg-red-300 rounded-t-md p-1 flex gap-1">
          <span className="text-red-500 font-bold">X</span>
          {Key.x.toString("hex")}
        </div>
        <KeyDetails point={Key.x} cord="x" />
      </div>
      <div className="flex flex-col">
        <div className="bg-blue-300 rounded-md p-1 flex gap-1">
          <span className="text-blue-500 font-bold">Y</span>
          {Key.y.toString("hex")}
        </div>
        <KeyDetails point={Key.y} cord="y" />
      </div>
    </div>
  );
};

const KeyDetails: React.FC<{ point: BN; cord: "x" | "y" }> = ({
  point,
  cord,
}) => {
  return (
    <div
      className={classNames(
        `rounded-b-md p-1 flex gap-1`,
        cord === "x" ? "bg-red-200" : "bg-blue-200"
      )}
    >
      <ul>
        <li className="flex gap-1">
          <span className="font-bold"> Byte(s)</span>
          {point.byteLength()}
        </li>
      </ul>
    </div>
  );
};

export default CurveText;
