"use client";
import Image from "next/image";
import Jack from "../../public/jack.png";
import Snowman from "../../public/snowman.png";
import React, { useState  } from "react";
import Link from "next/link";


export default function Home() {

  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        <div className="w-[30%] flex justify-center h-[100%] flex-col items-center text-xl">
          <Link href="/game">
            <button className="bg-gray-200 mt-2 pl-4 pr-4 pt-2 pb-2 rounded border border-gray-300 hover:bg-gray-100">Start</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
