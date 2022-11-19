import React, { useContext } from "react";
import { KeysetContext } from "../App";
import { ArrowRightIcon, KeyIcon } from "@heroicons/react/24/solid";
import { Point } from "../curve/EDDSA/EDDSA";
import { classNames } from "../util";
import BN from "bn.js";
import KeySet from "../curve/EDDSA/keyGeneration";

const Keys = () => {
  const [bob, alice] = useContext(KeysetContext);
  
  return (
    <div className="max-w-5xl mx-auto">
      
      <div className="p-2 w-full rounded-md flex justify-between">
        <KeyTextShowcase keySet={bob} holder={"bob"} title={"Private Key"} />
        <ArrowRightIcon className="w-6 h-6 my-auto" />{" "}
        <KeyTextShowcase keySet={bob} holder={"bob"} title={"Public Key"} />
      </div>
      <div className="p-2 w-full rounded-md flex justify-between">
        <KeyTextShowcase keySet={alice} holder={"alice"} title={"Private Key"} />
        <ArrowRightIcon className="w-6 h-6 my-auto" />{" "}
        <KeyTextShowcase keySet={alice} holder={"alice"} title={"Public Key"} />
      </div>
    </div>
  );
};

const KeyTextShowcase: React.FC<{
  keySet: KeySet;
  holder: string;
  title: string;
}> = ({ keySet, holder, title }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="border bg-gray-200 rounded-md p-2">
        <h3 className="flex gap-1">
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
         <span className="font-bold">{title}</span>
         <span className="text-sm font-semibold">{holder}</span>
         {title === "Private Key" ? <KeyDetails keySet={keySet.privateKey}/> : <KeyDetails keySet={keySet.publicKey}/>}
         
        </h3>
          <div>
      </div>
      {title === "Private Key" ? ( 
    <KeyCordinates point={keySet.privateKey} />
      ) : ( <KeyCordinates point={keySet.publicKey} />)}
        
      </div>
    </div>
  );
};

const KeyCordinates: React.FC<{ point: Point }> = ({ point }) => {
  

  return (<>
   <div className="flex flex-col">
          <div className="bg-red-300 rounded-md p-1 px-2 flex gap-1">
            <span className="text-red-500 font-bold">X</span>
            {point.x.toString("hex")}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-blue-300 rounded-md p-1 flex gap-1">
            <span className="text-blue-500 font-bold">Y</span>
            {point.y.toString("hex")}
          </div>
        </div>
  </>)
}

const KeyDetails: React.FC<{keySet: Point}> = ({
  keySet
}) => {
  return (
      <ul className="flex mx-auto text-sm gap-2">
        <li className="flex gap-1">
          <span className="font-bold">Byte(s):</span>
          {keySet.x.byteLength() + keySet.y.byteLength()}
        </li>
      </ul>

  );
};

export default Keys;
