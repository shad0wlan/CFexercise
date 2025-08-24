"use client";
import { useState } from "react";
import MobileNavButton from "@/components/ui/MobileNavButton";
import MobileNavigation from "@/components/navigation/MobileNavigation";
import NavLink from "@/components/navigation/NavLink";

type Props = {
  paths: {
    id: number;
    path: string;
    label: string;
  }[];
};

export default function MobileNavigationContainer({ paths }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <MobileNavButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileNavigation isOpen={isOpen}>
        {paths.map((item) => (
          <NavLink
            key={item.id}
            path={item.path}
            label={item.label}
            className="border-b-0 text-base w-full"
            onClick={() => setIsOpen(false)}
          />
        ))}
      </MobileNavigation>
    </>
  );
}
