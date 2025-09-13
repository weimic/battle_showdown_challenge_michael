"use client";
import Image from "next/image";
import Jack from "../../../public/jack.png";
import JackH from "../../../public/jackhandles.png";
import Snowman from "../../../public/snowman.png";
import Fork from "../../../public/masterpiece.png";
import JackEat from "../../../public/jackeata.png";
import MacThrow from "../../../public/macthrow.png";
import JackLove from "../../../public/jacklove.png";
import JackPot from "../../../public/jackpot.png";
import Explode from "../../../public/explo.gif";
import Sparkle from "../../../public/sparkle.gif";
import Mac from "../../../public/mac.png";
import React, { useState, useRef  } from "react";
import coverImg from "../../../public/battleground.jpeg";
import Snowball from "../../../public/snowball.png";
import Lightning from "../../../public/lightning.gif";
import Snowpile from "../../../public/snowpile.png";
import Snow from "../../../public/snow.gif";
import Ice from "../../../public/icecube.png";


export default function Home() {

  const [snowmanHealth, setSnowmanHealth] = useState(100);
  const [jackHealth, setJackHealth] = useState(100);
  const [turn, setTurn] = useState(1);
  const [mac, setMac] = useState(0);
  const [pain, setPain] = useState(1);
  const [att, setAtt] = useState(1); //Attack!
  const [moved, setMoved] = useState(false);
  const [snowMove, setSnowMove] = useState("None");
  const console = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("Jack");
  const [eName, setEName] = useState("Snowman");
  const [log, setLog] = useState(["You encountered a "+eName+"! ", "...", "Turn 1"]);

  const [fork, setFork] = useState(false);
  const [jackA, setJackA] = useState(false);
  const [throwa, setThrowa] = useState(false);
  const [eat, setEat] = useState(false);
  const [build, setBuild] = useState(false);
  const [expl, setExpl] = useState(false);
  const [explE, setExplE] = useState(false);
  const [heal, setHeal] = useState(false);
  const [healE, setHealE] = useState(false);

  const [snowB, setSnowB] = useState(false);
  const [snowing, setSnowing] = useState(false);
  const [lightning, setLightning] = useState(false);
  const [snowpile, setSnowpile] = useState(false);
  const [ice, setIce] = useState(false);
  const [fall, setFall] = useState(false);

  const addMessage = (message: string) => {
    setLog(log => [...log, message]);
  }

  React.useEffect(() => {
    if(console.current) {
      console.current.scrollIntoView({behavior: "smooth"});
    }
  }, [log]);

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
      addMessage(name+" takes 1.5x damage from attacks.");

      setBuild(true);
      setTimeout(() => setBuild(false), 1200);

    } else if(id == 2) { // Throw Mac
      if(mac>0) {
        nAtt *= 20;
        nMac -= 1;
        addMessage(name+" used Throw Mac!");
        
        setThrowa(true);
        setJackA(true);

        setTimeout(() => setJackA(false), 1200);
        setTimeout(() => setThrowa(false), 1200);

        setTimeout(() => setExplE(true), 1000);
        setTimeout(() => setExplE(false), 2000);

      } else {
        addMessage(name + " tried to use Throw Mac, but they had no macs.");
      }
      

    } else if(id == 3) { // Eat Mac
      if(mac > 0) {
        nMac -= 1;
        nJackHealth += 10;
        addMessage(name+" used Eat Mac!");
        addMessage(name+" healed for 10 HP!");
        setEat(true);
        setTimeout(() => setEat(false), 1200);

        setHeal(true);
        setTimeout(() => setHeal(false), 1200);

      } else {
        addMessage(name + " tried to use Eat Mac, but they had no macs.");
      }
      


    } else if(id == 4) { // Fork Jab
      nAtt *= 5;
      addMessage(name+" used Fork Jab!");
      setFork(true);
      setJackA(true);
      setTimeout(() => setJackA(false), 1200);
      setTimeout(() => setFork(false), 1200);

      setTimeout(() => setExplE(true), 1000);
      setTimeout(() => setExplE(false), 2000);
    }

    //Snowman stuff
    let snowA = Math.random(); // Snowman Attack ID
    let odds1 = 0.2;
    let odds2 = 0.3;
    let odds3 = 0.3;
    let odds4 = 0.1;
    let odds5 = 0.1;


    if(snowA < (odds1)) { // Snow-ShieldTM
      setSnowMove("SnowShield");
      nAtt *= 0.201;
      addMessage(eName+" used Snow-Shield™!");
      addMessage(eName+" takes 0.2x damage from attacks.");

      setTimeout(() => setSnowpile(true), 1000);
      setTimeout(() => setSnowpile(false), 2000);

    } else if(snowA < (odds1 + odds2)) { // Snow-BallTM
      setSnowMove("SnowBall");
      nPain *= 8;
      addMessage(eName+" used Snow-Ball™!");
      setTimeout(() => setExpl(true), 2000);
      setTimeout(() => setExpl(false), 3000);

      setTimeout(() => setSnowB(true), 1000);
      setTimeout(() => setSnowB(false), 2000);


    } else if(snowA < (odds1 + odds2 + odds3)) { // Snow-IngTM
      setSnowMove("SnowIng");
      nSnowmanHealth += 10;
      addMessage(eName+" used Snow-Ing™!");
      addMessage(eName + " healed for 10 HP!");
      
      setTimeout(() => setHealE(true), 1000);
      setTimeout(() => setHealE(false), 2000);

      setTimeout(() => setSnowing(true), 1000);
      setTimeout(() => setSnowing(false), 2000);

      


    } else if(snowA < (odds1 + odds2 + odds3 + odds4)) { // Snow-IceTM
      let snowB = Math.random();
      addMessage(eName+" used Snow-Ice™!");
      if(snowB < 0.5) { // Odds of Snow-Ice working
        setSnowMove("SnowIce WORKS");
        nAtt = 1;
        nMac = mac;
        nJackHealth = jackHealth;
        nPain = 5;
        setEat(false);
        setHeal(false);

        addMessage("It worked!");
        addMessage(name+" slips and does nothing this turn.");

        setTimeout(() => setExpl(true), 2000);
        setTimeout(() => setExpl(false), 3000);

        setTimeout(() => setIce(true), 1000);
        setTimeout(() => setIce(false), 2200);

        setTimeout(() => setFall(true), 2000);
        setTimeout(() => setFall(false), 3000);
      } else {
        setSnowMove("SnowIce FAILS");
        addMessage("It failed!");
      }


    } else if(snowA < (odds1 + odds2 + odds3 + odds4 + odds5)) { // Snow-Storm
      addMessage(eName+" used Snow-Storm™!");
      let snowB = Math.random();
      if(snowB < 0.6) { // Odds of Snow-Storm working
        nPain *= 30;
        setSnowMove("SnowStorm WORKS");
        addMessage("It worked!");

        setTimeout(() => setExpl(true), 2000);
        setTimeout(() => setExpl(false), 3000);

        setTimeout(() => setSnowing(true), 1000);
        setTimeout(() => setSnowing(false), 2000);

        setTimeout(() => setLightning(true), 1000);
        setTimeout(() => setLightning(false), 2000);


      } else {
        setSnowMove("SnowStorm FAILS");
        addMessage("It failed!");
      }
    }


    // Calculate Pain
    if((id == 1 && nPain != 1.5) || (id != 1 && nPain != 1)) {
      nJackHealth -= Math.floor(nPain);
      addMessage(name+" took "+Math.floor(nPain) + " damage!");
    }

    // Calculate Attack
    if(nAtt != 1 && Math.floor(nAtt) != 0) {
      nSnowmanHealth -= Math.floor(nAtt);
      addMessage(eName+ " took " + Math.floor(nAtt) + " damage!");
    }

    // Keep health within bounds
    if(nJackHealth < 0) {
      nJackHealth = 0;
      addMessage(name+" died!");
    }
    if(nJackHealth > 100) {
      nJackHealth = 100;
      addMessage(name+" healed to full health.");
    }
    if(nSnowmanHealth < 0) { 
      nSnowmanHealth = 0;
      addMessage(eName + " died!");
    }
    if(nSnowmanHealth > 100) {
      nSnowmanHealth = 100;
      addMessage(eName+ " healed to full health.");
    }

    setMac(nMac);
    setPain(1);
    setAtt(1);
    setJackHealth(nJackHealth);
    setSnowmanHealth(nSnowmanHealth);
    if(nSnowmanHealth != 0 && nJackHealth != 0) {
      setTurn(turn+1);
      addMessage("...");
      setTimeout(() => addMessage("Turn "+(turn+1)), 2000);
      setTimeout(() => setMoved(false), 2000);
    }
    setMoved(true);
    
  }

  // RETURN STATEMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  return (
    <div className="relative min-h-screen" style={{
      backgroundImage: `url(${coverImg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center"}}>

      {/* FORK */}
      <div className="">
        {fork && (
          <div className = "absolute top-30/100 left-100 z-5">
            <Image className="animate-fork" src={Fork} alt="fork" width={400}/>
          </div>
        )}
      </div>

      {/* THROW */}
      <div className="">
        {throwa && (
          <div className = "absolute top-30/100 left-100 z-5">
            <Image className="animate-fork" src={MacThrow} alt="MacThrow" width={400}/>
          </div>
        )}
      </div>

      {/* EAT MAC */}
      <div className="">
        {eat && (
          <div className = "absolute top-20/100 left-50 z-5">
            <Image className="animate-mac" src={Mac} alt="Mac" width={400}/>
          </div>
        )}
      </div>


      {/* BUILD MAC */}
      <div className="">
        {build && (
          <div className = "absolute top-20/100 left-140 z-5">
            <Image className="animate-buildp" src={JackPot} alt="JackPot" width={400}/>
          </div>
        )}
        {build && (
          <div className = "absolute top-20/100 left-130 z-5">
            <Image className="animate-buildm" src={Mac} alt="Mac" width={400}/>
          </div>
        )}
      </div>

      {/* SNOWBALL */}
      <div className="">
        {snowB && (
          <div className = "absolute top-/100 left-300 z-5">
            <Image className="animate-snowb" src={Snowball} alt="Snowball" width={600}/>
          </div>
        )}
      </div>

      {/* ICE */}
      <div className="">
        {ice && (
          <div className = "absolute top-/100 left-300 z-5">
            <Image className="animate-snowb" src={Ice} alt="Snowball" width={600}/>
          </div>
        )}
      </div>

      {/* SNOWING */}
      <div className="">
        {snowing && (
          <div className = "absolute top-20/100 left-100 z-5">
            <Image src={Snow} alt="Snowball" width={1200}/>
          </div>
        )}
      </div>

      {/* LIGHTNING */}
      <div className="">
        {lightning && (
          <div className = "absolute top-0/100 left-100 z-5">
            <Image src={Lightning} alt="Lightning" width={1200}/>
          </div>
        )}
      </div>



      <div className="flex flex-row justify-center gap-60">
        

        {/* JACK */}
        <div className="flex flex-col border-2 min-h-screen">
          <div className="flex-1 border-2 bg-red-100/50">
            DEBUG INFO:<br/>
            Turn {turn} <br/>
            SnowMove {snowMove}
          </div>

          <div className="relative w-[100%] flex justify-center flex-col items-start text-xl border-2">

            {/* IMAGE */}
            <div className="animate-slidein">
              {!(jackA || eat || build || fall) && (
                <Image className="animate-idle overflow-hidden" src={Jack} alt="Picture of Jack" width={400} />
              )}
            </div>
            
            {/* IMAGE FALL */}
            {fall && (<div className="">
              <Image className="overflow-hidden animate-fall" src={Jack} alt="Picture of Jack" width={400} />
            </div>)}

            {/* IMAGE HANDLESS */}
            {jackA && (<div className="">
              <Image className="overflow-hidden" src={JackH} alt="Picture of Jack" width={400} />
            </div>)}

            {/* IMAGE EATING*/}
            {eat && (<div className="">
              <Image className="overflow-hidden" src={JackEat} alt="Picture of Jack" width={400} />
            </div>)}
            
            {/* IMAGE BUILD*/}
            {build && (<div className="">
              <Image className="overflow-hidden" src={JackLove} alt="Picture of Jack" width={400} />
            </div>)}

            {/* IMAGE BUILD*/}
            {heal && (<div className="absolute top-20">
              <Image className="overflow-hidden" src={Sparkle} alt="Picture of Jack" width={600} />
            </div>)}

            {/* EXPLODE */}
            {expl && (<div className="absolute -top-30 -left-40">
              <Image className="overflow-hidden" src={Explode} alt="Explosion" width={600} />
            </div>)}


            {/* HEALTH BAR */}
            <div className="font-bold mt-10 mb-2 border-6 bg-gray-800/80 text-white border-gray-400 p-5">{name} - {jackHealth} HP - {mac} Macs</div>

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

        {/* SNOWMAN */}
        <div className="w-[30%] flex h-full min-h-screen flex-col border-2">
          <div className="h-[100px] border-2 max-h-1/5">
            Hello.
          </div>
          
          <div className="flex flex-col justify-center items-center text-xl border-2">
            {/* IMAGE */}
            <div className="animate-idle">
              <Image className="animate-slideinl overflow-hidden" src={Snowman} alt="Picture of Snowman" width={300}/>   
            </div>

            {/* SNOW SHIELD */}
            {snowpile && (<div className="absolute top-50">
              <Image className="overflow-hidden" src={Snowpile} alt="Snowpile" width={600} />
            </div>)}

            {/* EXPLOSION */}
            <div className="absolute -top-40">
              { explE && (
              <Image className="overflow-hidden" src={Explode} alt="BOOM" width={700}/>   
              )}
            </div>

            {/* HEALING */}
            <div className="absolute top-40">
              {healE && (
              <Image className="overflow-hidden" src={Sparkle} alt="Sparkle" width={500}/>   
              )}
            </div>

  


            {/* HEALTH BAR */}
            <div className="font-bold -mt-5 mb-2 border-6 bg-gray-800/80 text-white border-gray-400 p-5">{eName} - {snowmanHealth} HP </div>
          </div>

          {/* SUPER COOL GAP */}
          <div className="flex-1 border-2">
            uh.
          </div>


          {/* CONSOLE */}
          <div className="animate-slideinu h-[300px] w-[850px] overflow-y-auto p-[10px] mb-20 border-6 bg-gray-800/80 text-white border-gray-400 text-right no-scrollbar">
            {
              log.map((log, i) => (
                <div key={i}>{log}</div>
              ))
            }
            <div ref={console}/>
          </div>

        </div>


        
      </div>
    </div>
  );
}
