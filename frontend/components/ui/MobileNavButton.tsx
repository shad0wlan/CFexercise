import { Dispatch, SetStateAction } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileNavButton({ isOpen, setIsOpen }: Props) {
  const line = `h-[4px] rounded-full transition ease transform duration-300 bg-primary w-[40px]`;

  return (
    <button
      className="relative md:hidden flex flex-col h-12 w-12 justify-center group gap-2 ml-auto z-20"
      onClick={() => setIsOpen((prevState) => !prevState)}
    >
      <div className={`${line} ${isOpen && "rotate-45 translate-y-3"}`} />
      <div className={`${line} ${isOpen && "opacity-0"}`} />
      <div className={`${line} ${isOpen && "-rotate-45 -translate-y-3"}`} />
    </button>
  );
}
