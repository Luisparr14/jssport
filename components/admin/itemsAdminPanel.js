import Image from "next/image";
import Link from "next/link";

export default function ItemsAdminPanel({ titulo, bgColor, href="#", color = "text-black", srcImg, alt, width = 100, height = 100 }) {
  const className = `${bgColor} ${color} rounded-[9999999px] p-5 m-5 min-h-[180px] min-w-[190px]`;
  return (
    <Link href={href}>
      <a className={className}>
        <figure className="flex justify-center">
          <Image
            src={srcImg}
            alt={alt}
            width={width}
            height={height}
          />
        </figure>
        <figcaption className="text-center">{titulo}</figcaption>
      </a>
    </Link>
  );
}