import React, { useContext } from "react";
import { KeysetContext } from "../App";
import { ArrowRightIcon, KeyIcon } from "@heroicons/react/24/solid";
import { Point } from "../curve/EDDSA/EDDSA";
import { classNames } from "../util";
import BN from "bn.js";

const Keys = () => {
  const keySet = useContext(KeysetContext);
  
  return (
    <div className="max-w-5xl mx-auto">
      
      <div className="p-2 w-full rounded-md flex justify-between">
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
      <div className="border bg-gray-200 rounded-md p-2">
        <h3 className="font-bold flex gap-1">
          {" "}
          {title === "Private Key" ? (
            <KeyIcon
              className={classNames("h-3 w-3 my-auto", "fill-orange-400")}
            />
          ) : (
            <KeyIcon
              className={classNames("h-3 w-3 my-auto", "fill-blue-400")}
            />
          )}
          {title}
        </h3>

        <div className="flex flex-col">
          <div className="bg-red-300 rounded-t-md p-1 px-2 flex gap-1">
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
    </div>
  );
};

const KeyDetails: React.FC<{ point: BN; cord: "x" | "y" }> = ({
  point,
  cord,
}) => {
  const keySet = useContext(KeysetContext);

  return (
    <div
      className={classNames(
        `rounded-b-md p-1 flex gap-1`,
        cord === "x" ? "bg-red-200" : "bg-blue-200"
      )}
    >
      <ul className="flex mx-auto text-sm font-mono gap-2">
        <li className="flex gap-1 after:border-dashed after:border-r after:p-1 after:border-black">
          <span className="font-bold">Byte(s):</span>
          {point.byteLength()}
        </li>
        <li>
          <span className="font-bold">Origin: </span>{keySet.name}
        </li>
      </ul>
    </div>
  );
};

export default Keys;
