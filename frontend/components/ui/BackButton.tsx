"use client";
import IconWrapper from "@/components/ui/IconWrapper";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

const BackButton = () => {
  const router = useRouter();
  return (
    <IconWrapper
      onClick={() => router.back()}
      icon={IoChevronBack}
      className="flex my-2 lg:flex-row items-center gap-2 lg:gap-2"
    >
      ΠΙΣΩ
    </IconWrapper>
  );
};

export default BackButton;
