"use client";
import Image from "next/image";
import Jack from "../../../public/jack.png";
import Snowman from "../../../public/snowman.png";
import React, { useState  } from "react";
import coverImg from "../../../public/battleground.jpeg";

export default function Home() {

  const [snowmanHealth, setSnowmanHealth] = useState(100);
  const [jackHealth, setJackHealth] = useState(100);
  const [turn, setTurn] = useState(0);
  const [mac, setMac] = useState(0);
  const [pain, setPain] = useState(1);
  const [att, setAtt] = useState(1); //Attack!
  const [moved, setMoved] = useState(false);

  function handleRizz(id: number): void {
    if(moved) {
      return;
    }
    let nPain = pain;
    let nAtt = att;
    let nMac = mac;
    let nJackHealth = jackHealth;
    let nSnowmanHealth = snowmanHealth;
    let x = id;

    if(id == 1) {
      nPain *= 1.5;
      nMac += 1;
      x = 1;
    } else if(id == 2 && mac > 0) {
      nAtt *= 20;
      nMac -= 1;
    } else if(id == 3 && mac > 0 && jackHealth+10 < 100) {
      nMac -= 1;
      nJackHealth += 10;
    } else if(id == 4) {
      nAtt *= 5;
    }

    //Snowman stuff ADD LATER
    let y = 1;

    if((id == 1 && nPain != 1.5) || (id != 1 && nPain != 1)) {
      nJackHealth -= nPain;
      if(nJackHealth < 0) nJackHealth = 0;
    }
    if(nAtt != 1) {
      nSnowmanHealth -= nAtt;
      if(nSnowmanHealth < 0) nSnowmanHealth = 0;
    }
    setMac(nMac);
    setPain(1);
    setAtt(1);
    setJackHealth(nJackHealth);
    setSnowmanHealth(nSnowmanHealth);
    setTurn(turn+1);
    setMoved(true);
  }

  return (
    <div className="relative min-h-screen" style={{
      backgroundImage: `url(${coverImg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center"}}>

      <div className="flex flex-row items-center justify-center gap-60">
        

        {/* JACK */}
        <div className="flex-col border-2">
          <div className="h-[240px] border-2 bg-red-100/50">
            DEBUG INFO:<br/>
            Turn {turn}
          </div>

          <div className="w-[100%] flex justify-center flex-col items-start text-xl border-2">

            {/* IMAGE */}
            <div className="animate-idle">
              <Image className="animate-slidein overflow-hidden" src={Jack} alt="Picture of Jack" width={500} />
            </div>

            {/* HEALTH BAR */}
            <div className="font-bold mt-10 mb-2">Jack - {jackHealth} HP - {mac} Macs</div>

            {/* MOVES */}
            <div className="flex-col mb-10 w-full border-2">
              <div className="flex mt-2 justify-between">
                <button className="bg-gray-200 pl-4 pr-4 pt-2 pb-2 rounded border border-gray-300 hover:bg-gray-100" onClick={() => handleRizz(1)}>Build Mac</button>
                <div className="items-end">
                  <button className="bg-gray-200 pl-4 pr-4 pt-2 pb-2 rounded border border-gray-300 hover:bg-gray-100" onClick={() => handleRizz(2)}>Throw Mac</button>
                </div>
              </div>
              <div className="flex mt-2 mb-4 justify-between">
                <button className="bg-gray-200 pl-4 pr-4 pt-2 pb-2 rounded border border-gray-300 hover:bg-gray-100" onClick={() => handleRizz(3)}>Eat Mac</button>
                <div className="">
                  <button className="bg-gray-200 pl-4 pr-4 pt-2 pb-2 rounded border border-gray-300 hover:bg-gray-100" onClick={() => handleRizz(4)}>Fork Jab</button>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
        



        {/* SNOWMAN */}
        <div className="w-[30%] flex justify-center h-[100%] mb-50 flex-col items-center text-xl border-2">

          {/* IMAGE */}
          <div className="animate-idle">
           <Image className="animate-slideinl overflow-hidden" src={Snowman} alt="Picture of Snowman" width={300} height={300} />   
          </div>
          
          {/* HEALTH BAR */}
          <div className="font-bold -mt-5 mb-2">Snowman - {snowmanHealth} HP </div>
        </div>
      </div>
    </div>
  );
}
