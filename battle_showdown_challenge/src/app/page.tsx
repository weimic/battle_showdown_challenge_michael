"use client";
import Image from "next/image";
import Jack from "../../public/jack.png";
import Snowman from "../../public/snowman.png";
import React, { useState  } from "react";

export default function Home() {

  const [snowmanHealth, setSnowmanHealth] = useState(100);

  function handleRizz() {
    if ((snowmanHealth - 10) >= 0)
    {
      setSnowmanHealth(snowmanHealth - 10);
    }
    else
    {
      setSnowmanHealth(0);
    }
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        <div className="w-[30%] flex justify-center h-[100%] flex-col items-center text-xl">
          <Image src={Jack} alt="Picture of Jack" width={600} height={600} />
          <div id="jackHealth" className="font-bold mt-4 mb-2">100 Health</div>
          <button className="bg-gray-200 mt-2 pl-4 pr-4 pt-2 pb-2 rounded border border-gray-300 hover:bg-gray-100" onClick={handleRizz}>Rizz - 10</button>
        </div>
        <div className="w-[30%] flex justify-center h-[100%] flex-col items-center text-xl">
          <Image src={Snowman} alt="Picture of Snowman" width={300} height={300} />
          <div id="jackHealth" className="font-bold mt-4 mb-2">{snowmanHealth} Health</div>
        </div>
      </div>
    </div>
  );
}
