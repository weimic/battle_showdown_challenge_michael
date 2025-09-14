"use client";
import Image from "next/image";
import Jack from "../../public/jack.png";
import JackH from "../../public/jackhandles.png";
import Snowman from "../../public/snowman.png";
import Fork from "../../public/masterpiece.png";
import JackEat from "../../public/jackeata.png";
import MacThrow from "../../public/macthrow.png";
import JackLove from "../../public/jacklove.png";
import JackPot from "../../public/jackpot.png";
import Explode from "../../public/explo.gif";
import Sparkle from "../../public/sparkle.gif";
import Mac from "../../public/mac.png";
import React, { useState, useRef  } from "react";
import coverImg from "../../public/battleground.jpeg";
import Snowball from "../../public/snowball.png";
import Lightning from "../../public/lightning.gif";
import Snowpile from "../../public/snowpile.png";
import Snow from "../../public/snow.gif";
import Ice from "../../public/icecube.png";
import Firework from "../../public/fireworks.gif";
// import Pokemon from "../../../public/pokemon.mp3";

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
  const [win, setWin] = useState(false);
  const [done, setDone] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  
  const doneToggle = () => {
    setDone(!done);
  };

  const gameToggle = () => {
    setGameStart(!gameStart);
    const music = new Audio("/pokemon.mp3");
    music.loop = true;
    music.volume = 0.7;
    music.play();
  }

  const [guide, toggleGuide] = useState(false);
  const guideToggle = () => {
    toggleGuide(!guide);
  };

  const [guideE, toggleGuideE] = useState(false);
  const guideToggleE = () => {
    toggleGuideE(!guideE);
  };


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
    let healthE = false;


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
        nJackHealth = Math.min(jackHealth+10, 100);
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
      nPain *= 10;
      setTimeout(() => addMessage(eName+" used Snow-Ball™!"), 999);
      setTimeout(() => setExpl(true), 2000);
      setTimeout(() => setExpl(false), 3000);

      setTimeout(() => setSnowB(true), 1000);
      setTimeout(() => setSnowB(false), 2000);


    } else if(snowA < (odds1 + odds2 + odds3)) { // Snow-IngTM
      setSnowMove("SnowIng");
      nSnowmanHealth += 10;
      healthE = true;

      setTimeout(() => addMessage(eName+" used Snow-Ing™!"), 998);
      setTimeout(() => addMessage(eName + " healed for 10 HP!"), 999);
      
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
        addMessage(name+" slipped and did nothing this turn.");

        setTimeout(() => setExpl(true), 2000);
        setTimeout(() => setExpl(false), 3000);

        setTimeout(() => setIce(true), 1000);
        setTimeout(() => setIce(false), 2200);

        setTimeout(() => setFall(true), 2000);
        setTimeout(() => setFall(false), 3000);
      } else {
        setTimeout(() => setSnowMove("SnowIce FAILS"), 1500);
        setTimeout(() => addMessage("It failed!"), 1501);
      }


    } else if(snowA < (odds1 + odds2 + odds3 + odds4 + odds5)) { // Snow-Storm
      setTimeout(() => addMessage(eName+" used Snow-Storm™!"),998);
      let snowB = Math.random();
      if(snowB < 0.6) { // Odds of Snow-Storm working
        nPain *= 30;
        setSnowMove("SnowStorm WORKS");
        setTimeout(() => addMessage("It worked!"), 999);

        setTimeout(() => setExpl(true), 2000);
        setTimeout(() => setExpl(false), 3000);

        setTimeout(() => setSnowing(true), 1000);
        setTimeout(() => setSnowing(false), 2000);

        setTimeout(() => setLightning(true), 1000);
        setTimeout(() => setLightning(false), 2000);


      } else {
        setSnowMove("SnowStorm FAILS");
        setTimeout(() => addMessage("It failed!"), 999);
      }
    }

    // Calculate Attack
    if(nAtt != 1 && Math.floor(nAtt) != 0) {
      nSnowmanHealth -= Math.floor(nAtt);
      setTimeout(() => setSnowmanHealth(nSnowmanHealth), 994);
      setTimeout(() => addMessage(eName+ " took " + Math.floor(nAtt) + " damage!"), 995);
    }

    // Calculate Pain
    if(nSnowmanHealth != 0 && (id == 1 && nPain != 1.5) || (id != 1 && nPain != 1)) {
      nJackHealth -= Math.floor(nPain);
      setTimeout(() => addMessage(name+" took "+Math.floor(nPain) + " damage!"), 2000);
    }

    
    // Keep health within bounds
    if(nJackHealth < 0) {
      nJackHealth = 0;
      setTimeout(() => addMessage(name+" died!"), 2001);
    }
    if(nJackHealth > 100) {
      nJackHealth = 100;
      setTimeout(() => addMessage(name+" healed to full health."), 996);
    }
    if(nSnowmanHealth < 0) { 
      nSnowmanHealth = 0;
      setTimeout(() => addMessage(eName + " died!"), 996);
      setWin(true);
    }
    if(nSnowmanHealth > 100) {
      nSnowmanHealth = 100;
      setTimeout(() => addMessage(eName+ " healed to full health."), 2001);
    }

    setMac(nMac);
    setPain(1);
    setAtt(1);
    setTimeout(() => setJackHealth(nJackHealth), 2000);
    if(healthE) {
      setTimeout(() => setSnowmanHealth(nSnowmanHealth), 2000);
    }
    if(nSnowmanHealth != 0 && nJackHealth != 0) {
      setTurn(turn+1);
      setTimeout(()=>addMessage("..."), 2002);
      setTimeout(() => addMessage("Turn "+(turn+1)), 2003);
      setTimeout(() => setMoved(false), 2003);
    } else {
      setTimeout(() => setDone(true), 3000);
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
            <Image src={Lightning} alt="Lightning" width={900}/>
          </div>
        )}
      </div>

      <div className="">
        {gameStart && (
          <div className = "absolute top-0 right-0 z-5 text-white p-2 text-sm">
            ♫ Pokemon Card GB 2: GRdan Sanjou (GB) (gamerip) (2001)
          </div>
        )}
      </div>

      {/* START */}
      <div>
        {!gameStart && (
          <div className="flex flex-col absolute w-[100%] h-[100%] bg-green-100/90 z-40 justify-center items-center animate-slideinu">
            <Image src={Mac} alt="Mac" className="-mt-50" width={200}/>
            <div className = "text-[80px] items-center flex flex-col animate-start">
              
              <div className="text-black-900 flex flex-row">Jack's <div className="ml-15 mr-15 text-yellow-500 underline underline-offset-[-5px] animate-mac">Mac</div> Attack</div>
              <div className="text-[30px] -mt-2">Melt the snowman.</div>
            </div>
            <div className = "text-[20px] mt-10 items-center flex flex-col">
              Name:
              <input type="text" maxLength={15} className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500 focus:border-yellow-500" placeholder="Jack" onChange={(e) => setName(e.target.value)}/>
              <p className="text-[15px] text-gray-600 mt-2">Max 15 characters</p>
            </div>
            <button className="rounded-full bg-yellow-50/70 border-2 hover:bg-gray-50/100 p-5 mt-5 cursor-pointer" onClick={gameToggle}>Start</button>
          </div>
        )}
      </div>

      {/* FIREWORKS */}
      <div>
        {done && win && (
          <div className="absolute z-50">
              <Image src={Firework} alt="firework" width={600}/>
              <Image className="ml-350 -mt-80" src={Firework} alt="firework" width={400}/>
          </div>
        )}
      </div>
      {/* END - VICTORY */}
      <div>
        {done && win && (
          <div className="flex flex-col absolute w-[100%] h-[100%] bg-green-100/90 z-40 justify-center items-center animate-slideinu">
            <div className = "text-[80px] items-center flex flex-col">
              <div className="text-green-900">Congratulations!</div>
              <div className="flex flex-row">
                <div className="text-red-500">Y</div>
                <div className="text-orange-500">o</div>
                <div className="text-yellow-500">u</div>
                <div className="text-green-500 ml-15">w</div>
                <div className="text-blue-500">o</div>
                <div className="text-purple-500">n</div>
                <div className="text-pink-500">!</div>
              </div>
              <div className="text-[30px] -mt-2">Refresh to play again.</div>
            </div>
            <button className="rounded-full bg-gray-50/70 border-2 hover:bg-gray-50/100 p-5 mt-10 cursor-pointer" onClick={doneToggle}>View Game</button>
          </div>
        )}
      </div>
      
      {/* END - DEFEAT */}
      <div>
        {done && !win && (
          <div className="flex flex-col absolute w-[100%] h-[100%] bg-red-100/90 z-100 justify-center items-center animate-slideinu">
            <div className = "text-[80px] items-center flex flex-col">
              <div className="text-black-900">:(</div>
              <div className="flex flex-row">
                <div className="text-red-800">Y</div>
                <div className="text-red-700">o</div>
                <div className="text-red-600">u</div>
                <div className="text-red-500 ml-15">l</div>
                <div className="text-red-600">o</div>
                <div className="text-red-700">s</div>
                <div className="text-red-800">t</div>
                <div className="text-red-900">!</div>
              </div>
              <div className="text-[30px] -mt-2">Refresh to play again.</div>
            </div>
            <button className="rounded-full bg-gray-50/70 border-2 hover:bg-gray-50/100 p-5 mt-10 cursor-pointer" onClick={doneToggle}>View Game</button>
          </div>
        )}
      </div>
      


      <div className="flex flex-row justify-center gap-60">
        {/* JACK */}
        {gameStart && (<div className="flex flex-col min-h-screen w-[28%]">

          {/* DEBUG */}
          <div className="flex-1 bg-red-100/50 opacity-0">
          </div>

          <div className="relative w-[100%] flex justify-center flex-col items-start text-xl">

            {/* IMAGE */}
            {gameStart && (<div className="animate-slidein cursor-pointer" onClick={guideToggle}>
              {!(jackA || eat || build || fall) && (
                <Image className="animate-idle overflow-hidden" src={Jack} alt="Picture of Jack" width={400} />
              )}
            </div>)}
            
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

            {/* CARD INFO */}
            {guide && (<div className = "absolute w-[100%] -top-3 bg-gray-800/90 border-gray-400 text-white p-10 border-5 cursor-pointer" onClick={guideToggle}>
              <div className="border-b-2 mb-5">
                MOVESET - {name}
              </div>
              <div className="border-b-2 mb-5">
                <div className = "text-semibold mb-2">
                  Build Mac
                </div>
                <div className="text-sm mb-5">
                  Gain a Mac, but take 1.5x damage when you are attacked.
                </div>
              </div>
              <div className="border-b-2 mb-5">
                <div className = "text-semibold mb-2">
                  Eat Mac
                </div>
                <div className="text-sm mb-5">
                  Consume a Mac and heal for 10 HP.
                </div>
              </div>
              <div className="border-b-2 mb-5">
                <div className = "text-semibold mb-2">
                  Throw Mac
                </div>
                <div className="text-sm mb-5">
                  Consume a Mac and deal 20 HP to the enemy.
                </div>
              </div>
              <div className="">
                <div className = "text-semibold mb-2">
                  Fork Jab
                </div>
                <div className="text-sm">
                  Use your fork to deal 5 HP to the enemy.
                </div>
              </div>
            </div>)}


            {/* HEALTH BAR */}
            <div className="w-[100%] font-bold mt-10 mb-2 border-6 bg-gray-800/80 text-white border-gray-400 p-5">
              <div className="flex flex-row justify-between">
                <div>{name}</div><div>{mac} Macs</div>
              </div>
              <div className="border-2 w-full bg-gray-200 mt-2 rounded-full h-4">
                <div className = "bg-green-500 h-3 rounded-full transition-all duration-300 ease-in-out"
                  style={{width: `${jackHealth}%`}}>
                </div>
              </div>
              <div className="text-[10px] font-thin text-right mt-2 -mb-2">
                {jackHealth}/100 HP 
              </div>
            </div>

            {/* MOVES */}
            <div className="flex-col mb-10 w-full">
              <div className="flex mt-2 justify-between gap-5">
                <button className="bg-gray-200 pl-4 pr-4 pt-2 pb-2 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer" onClick={() => handleRizz(1)}>Build Mac</button>
                <div className="items-end">
                  <button className="bg-gray-200 pl-4 pr-4 pt-2 pb-2 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer" onClick={() => handleRizz(2)}>Throw Mac</button>
                </div>
              </div>
              <div className="flex mt-2 mb-4 justify-between">
                <button className="bg-gray-200 pl-4 pr-4 pt-2 pb-2 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer" onClick={() => handleRizz(3)}>Eat Mac</button>
                <div className="">
                  <button className="bg-gray-200 pl-4 pr-4 pt-2 pb-2 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer" onClick={() => handleRizz(4)}>Fork Jab</button>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>)}

        {/* SNOWMAN */}
        {gameStart && (<div className="w-[30%] flex h-full min-h-screen flex-col">
          <div className="h-[100px] max-h-1/5">
            
          </div>
          
          <div className="flex flex-col justify-center items-center text-xl ">

            {/* IMAGE */}
            <div className="animate-idle cursor-pointer" onClick={guideToggleE}>
              {gameStart && (<Image className="animate-slideinl overflow-hidden" src={Snowman} alt="Picture of Snowman" width={300}/>)}   
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

            {/* CARD INFO */}
            {guideE && (<div className = "absolute w-[30%] top-13 bg-gray-800/90 border-gray-400 text-white p-10 border-5 cursor-pointer z-100" onClick={guideToggleE}>
              <div className="border-b-2 mb-5">
                MOVESET - {eName}
              </div>
              <div className="border-b-2 mb-5">
                <div className = "text-semibold mb-2">
                  Snow-Shield™
                </div>
                <div className="text-sm mb-5">
                  Patented snow technology that blocks 80% of damage.
                </div>
              </div>
              <div className="border-b-2 mb-5">
                <div className = "text-semibold mb-2">
                  Snow-Ball™
                </div>
                <div className="text-sm mb-5">
                  Patented snow technology that deals 10 HP.
                </div>
              </div>
              <div className="border-b-2 mb-5">
                <div className = "text-semibold mb-2">
                  Snow-Ing™
                </div>
                <div className="text-sm mb-5">
                  Patented snow technology that heals 8 HP.
                </div>
              </div>
              <div className="border-b-2 mb-5">
                <div className = "text-semibold mb-2">
                  Snow-Ice™
                </div>
                <div className="text-sm mb-5 ellipsis">
                  Patented snow technology that is ice, actually. It has a 50% chance of working. When it works, {name} slips, does nothing, and is hurt for 5 HP.
                </div>
              </div>
              <div className="">
                <div className = "text-semibold mb-2">
                  Snow-Storm™
                </div>
                <div className="text-sm">
                  Patented snow technology that has a 60% chance of working. When it works, it deals 30 HP.
                </div>
              </div>
            </div>)}
  


            {/* HEALTH BAR */}
            <div className="w-[100%] font-bold -mt-5 mb-2 border-6 bg-gray-800/80 text-white border-gray-400 p-5">
              {eName}
              <div className="border-2 w-full bg-gray-200 mt-2 rounded-full h-4">
                <div className = "bg-green-500 h-3 rounded-full transition-all duration-300 ease-in-out"
                  style={{width: `${snowmanHealth}%`}}>
                </div>
                
              </div>
              <div className="text-[10px] font-thin text-right mt-2 -mb-2">
                {snowmanHealth}/100 HP 
              </div>
            </div>
          </div>

          {/* SUPER COOL GAP */}
          <div className="flex-1">
            
          </div>


          {/* CONSOLE */}
          {gameStart && (<div className="animate-slideinu h-[300px] w-[850px] overflow-y-auto p-[10px] mb-5 border-6 bg-gray-800/80 text-white border-gray-400 text-right no-scrollbar">
            {
              log.map((log, i) => (
                <div key={i}>{log}</div>
              ))
            }
            <div ref={console}/>
          </div>)}
          
        </div>)}
          
        
          

        
      </div>
    </div>
  );
}
