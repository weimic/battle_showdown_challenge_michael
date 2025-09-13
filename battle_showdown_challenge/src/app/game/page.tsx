"use client";
import Image from "next/image";
import Jack from "../../../public/jack.png";
import Snowman from "../../../public/snowman.png";
import React, { useState, useRef  } from "react";
import coverImg from "../../../public/battleground.jpeg";

export default function Home() {

  const [snowmanHealth, setSnowmanHealth] = useState(100);
  const [jackHealth, setJackHealth] = useState(100);
  const [turn, setTurn] = useState(0);
  const [mac, setMac] = useState(0);
  const [pain, setPain] = useState(1);
  const [att, setAtt] = useState(1); //Attack!
  const [moved, setMoved] = useState(false);
  const [snowMove, setSnowMove] = useState("None");
  const [log, setLog] = useState(["Welcome to Showdown."]);
  const console = useRef(null);
  const [name, setName] = useState("Jack");

  const addMessage = (message: string) => {
    setLog(log => [...log, message]);
  }

  function handleRizz(id: number): void {
    if(moved || jackHealth == 0 || snowmanHealth == 0) {
      return;
    }
    let nPain = pain;
    let nAtt = att;
    let nMac = mac;
    let nJackHealth = jackHealth;
    let nSnowmanHealth = snowmanHealth;


    // Jack stuff
    if(id == 1) { // Build Mac
      nPain *= 1.5;
      nMac += 1;
      addMessage(name+" used Build Mac!");

    } else if(id == 2 && mac > 0) { // Throw Mac
      nAtt *= 20;
      nMac -= 1;


    } else if(id == 3 && mac > 0) { // Eat Mac
      nMac -= 1;
      nJackHealth += 10;


    } else if(id == 4) { // Fork Jab
      nAtt *= 5;
    }

    //Snowman stuff
    let snowA = Math.random(); // Snowman Attack ID
    let odds1 = 0.2;
    let odds2 = 0.3;
    let odds3 = 0.3;
    let odds4 = 0.1; // to help the math.
    let odds5 = 0.1;


    if(snowA < (odds1)) { // Snow-ShieldTM
      setSnowMove("SnowShield");
      nAtt *= 0.2;
    } else if(snowA < (odds1 + odds2)) { // Snow-BallTM
      setSnowMove("SnowBall");
      nPain *= 8;
    } else if(snowA < (odds1 + odds2 + odds3)) { // Snow-IngTM
      setSnowMove("SnowIng");
      nSnowmanHealth += 10;
    } else if(snowA < (odds1 + odds2 + odds3 + odds4)) { // Snow-IceTM
      let snowB = Math.random();
      if(snowB < 0.5) { // Odds of Snow-Ice working
        setSnowMove("SnowIce WORKS");
        nAtt = 1;
        nMac = mac;
        nJackHealth = jackHealth;
        nPain = 5;
      } else {
        setSnowMove("SnowIce FAILS");
      }
    } else if(snowA < (odds1 + odds2 + odds3 + odds4 + odds5)) { // Snow-Storm
      let snowB = Math.random();
      if(snowB < 0.7) { // Odds of Snow-Storm working
        nPain *= 30;
        setSnowMove("SnowStorm WORKS");
      } else {
        setSnowMove("SnowStorm FAILS");
      }
    }


    // Calculate Pain
    if((id == 1 && nPain != 1.5) || (id != 1 && nPain != 1)) {
      nJackHealth -= Math.floor(nPain);
      
    }

    // Calculate Attack
    if(nAtt != 1) {
      nSnowmanHealth -= Math.floor(nAtt);
    }

    // Keep health within bounds
    if(nJackHealth < 0) nJackHealth = 0;
    if(nJackHealth > 100) nJackHealth = 100;
    if(nSnowmanHealth < 0) nSnowmanHealth = 0;
    if(nSnowmanHealth > 100) nSnowmanHealth = 100;

    setMac(nMac);
    setPain(1);
    setAtt(1);
    setJackHealth(nJackHealth);
    setSnowmanHealth(nSnowmanHealth);
    setTurn(turn+1);
    // setMoved(true);
  }

  return (
    <div className="relative min-h-screen" style={{
      backgroundImage: `url(${coverImg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center"}}>

      <div className="flex flex-row justify-center gap-60">
        

        {/* JACK */}
        <div className="flex flex-col border-2 min-h-screen">
          <div className="flex-1 border-2 bg-red-100/50">
            DEBUG INFO:<br/>
            Turn {turn} <br/>
            SnowMove {snowMove}
          </div>

          <div className="w-[100%] flex justify-center flex-col items-start text-xl border-2">

            {/* IMAGE */}
            <div className="animate-idle">
              <Image className="animate-slidein overflow-hidden" src={Jack} alt="Picture of Jack" width={400} />
            </div>

            {/* HEALTH BAR */}
            <div className="font-bold mt-10 mb-2">Jack - {jackHealth} HP - {mac} Macs</div>

            {/* MOVES */}
            <div className="flex-col mb-10 w-full border-2">
              <div className="flex mt-2 justify-between gap-5">
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

        
        <div className="w-[30%] flex h-full min-h-screen flex-col border-2">
          <div className="h-[200px] border-2 max-h-1/5">
            Hello.
          </div>
          {/* SNOWMAN */}
          <div className="flex flex-col justify-center items-center text-xl border-2">
            {/* IMAGE */}
            <div className="animate-idle">
            <Image className="animate-slideinl overflow-hidden" src={Snowman} alt="Picture of Snowman" width={300}/>   
            </div>
            
            {/* HEALTH BAR */}
            <div className="font-bold -mt-5 mb-2">Snowman - {snowmanHealth} HP </div>
          </div>

          <div className="flex-1 border-2">
            uh.
          </div>

          <div className="h-[200px] w-[800px] overflow-y-auto p-[10px] mb-20 border-2 bg-gray-800/80 text-white text-right no-scrollbar">
            {
              log.map((log, i) => (
                <div>{log}</div>
              ))
            }
          </div>

        </div>


        
      </div>
    </div>
  );
}
