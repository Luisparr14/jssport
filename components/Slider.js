import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Slider() {
  return (
    <main className="h-[calc(100%-104px)] flex flex-col flex-auto justify-center" >
      <div className="relative h-5/6">
        <div className="overflow-hidden relative h-full rounded-lg sm:h-full xl:h-full 2xl:h-full">
          <div id="carousel-item-1" className="hidden duration-700 ease-in-out">
            <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">First Slide</span>
            <Image src="/images/logo.png" className="block absolute top-1/2 left-1/2 w-11/12 h-full object-contain -translate-x-1/2 -translate-y-1/2" alt="logo" width={500} height={500}/>
          </div>
          <div id="carousel-item-2" className="hidden duration-700 ease-in-out">
            <Image src="/images/logo.png" className="block absolute top-1/2 left-1/2 w-11/12 h-full object-contain -translate-x-1/2 -translate-y-1/2" alt="..." width={500} height={500}/>
          </div>
          <div id="carousel-item-3" className="hidden duration-700 ease-in-out">
            <Image src="/images/logo.png" className="block absolute top-1/2 left-1/2 w-11/12 h-full object-contain -translate-x-1/2 -translate-y-1/2" alt="..." width={500} height={500}/>
          </div>
          <div id="carousel-item-4" className="hidden duration-700 ease-in-out">
            <Image src="/images/bg.avif" className="block absolute top-1/2 left-1/2 w-11/12 h-full object-contain -translate-x-1/2 -translate-y-1/2" alt="..." width={500} height={500}/>
          </div>
        </div>
        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          <button id="carousel-indicator-1" type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1"></button>
          <button id="carousel-indicator-2" type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2"></button>
          <button id="carousel-indicator-3" type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3"></button>
          <button id="carousel-indicator-4" type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4"></button>
        </div>
        <button id="data-carousel-prev" type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none">
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="hidden">Previous</span>
          </span>
        </button>
        <button id="data-carousel-next" type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none">
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            <span className="hidden">Next</span>
          </span>
        </button>
      </div>
    </main >
  )
}