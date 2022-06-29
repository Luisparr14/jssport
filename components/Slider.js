/* eslint-disable @next/next/no-img-element */
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useRef } from "react";

export default function Slider() {

  const letfArrow = () => (
    <div className="flex items-center justify-center h-full w-full">
      <Image
        src="/images/icons/left.png"
        alt="left"
        width={30}
        height={30}
      />
    </div>
  )

  const rightArrow = () => (
    <div className="flex items-center justify-center h-full w-full">
      <Image
        src="/images/icons/rigth.png"
        alt="left"
        width={30}
        height={30}
      />
    </div>
  )


  return (
    <main className="flex flex-col flex-auto justify-center h-[calc(100vh-65px)] ">
      <Carousel slide={false}
        leftControl={letfArrow()}
        rightControl={rightArrow()}
      >
        <img src="/images/logo.png" alt="logo" />
        <img src="/images/bg.avif" alt="logo" />
        <img src="/images/logo.png" alt="logo" />
        <img src="/images/logo.png" alt="logo" />
      </Carousel>
    </main>
  )
}