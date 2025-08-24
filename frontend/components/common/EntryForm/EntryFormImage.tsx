import Image from "next/image";

type Props = {
  image: string;
};

export default function EntryFormImage({ image }: Props) {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image}`}
      alt="Machine image"
      className="w-full h-full object-contain"
      fill
    />
  );
}
