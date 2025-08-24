"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type Props = {
  error: string | null;
};
const LocalPageError = ({ error }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 items-center justify-center p-10">
      <p className="font-bold">{error}</p>
      <Button
        onClick={() => router.refresh()}
        type="button"
        className="max-w-[200px] py-3"
      >
        Ανανέωση
      </Button>
    </div>
  );
};

export default LocalPageError;
