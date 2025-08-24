"use client";
import Button from "@/components/ui/Button";

type Props = {
  error: Error & { digest: string };
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div className="flex flex-col gap-3 min-h-[100dvh] items-center justify-center">
      <p className="text-2xl font-bold">Παρουσιάστηκε σφάλμα</p>
      <p className="text-lg">{error.message}</p>
      <Button onClick={reset} type="button" className="max-w-[200px] py-4">
        Ανανέωση
      </Button>
    </div>
  );
};

export default Error;
