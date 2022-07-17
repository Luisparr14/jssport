/* eslint-disable @next/next/no-img-element */
import { Carousel } from "flowbite-react";
import Image from "next/image";

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
    <main className="flex flex-col flex-auto justify-center h-[calc(100vh-88px)] md:h-[calc(100vh-56px)] slider">
      <Carousel slide={false}
        leftControl={letfArrow()}
        rightControl={rightArrow()}
      >
        <div >
          <Image className="px-50" src="/images/logo.png" alt="logo"  layout="responsive" width={400} height={200} objectFit="contain" />
        </div>
        <div>
          <Image className="px-50 rounded-lg" src="/images/bg.avif" alt="logo"  layout="responsive" width={400} height={200} objectFit="contain" />
        </div>
        <div >
          <Image className="px-50" src="/images/logo.png" alt="logo"  layout="responsive" width={400} height={200} objectFit="contain" />
        </div>
        <div >
          <Image className="px-50" src="/images/logo.png" alt="logo"  layout="responsive" width={400} height={200} objectFit="contain" />
        </div>
      </Carousel>
    </main>
  )
}