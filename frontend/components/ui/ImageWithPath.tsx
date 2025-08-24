import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type Props = {
  image: string;
  alt: string;
  className?: string;
  [key: string]: any;
};

export default function ImageWithPath({
  image,
  alt,
  className,
  ...restProps
}: Props) {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
      alt={alt}
      className={cn("w-full h-full object-contain", className)}
      {...restProps}
    />
  );
}
