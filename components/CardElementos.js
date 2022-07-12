/* eslint-disable @next/next/no-img-element */
export default function CardElementos({ children, src, alt, subtitle }) {
  return (    
      <a href="#" className="block text-center">
        <figure>
          <img
            src={src}
            alt={alt}
            className="h-36 w-auto mx-auto"
          />
          <caption className="text-center flex justify-center">
            {subtitle}
          </caption>
        </figure>
      </a>
  )
}