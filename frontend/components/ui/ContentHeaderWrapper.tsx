type Props = {
  children: React.ReactNode;
};

export default function ContentHeaderWrapper({ children }: Props) {
  return (
    <div className="min-h-16 flex items-center justify-between gap-5 flex-wrap bg-light-gray rounded-[20px] px-10 py-[10px] w-full">
      {children}
    </div>
  );
}
