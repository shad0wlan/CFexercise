type Props = {
  count?: number;
  withLabel?: boolean;
};

export default function FormSkeleton({ count = 6, withLabel = true }: Props) {
  return (
    <div className="form animate-pulse">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="w-full flex flex-col gap-2 mb-4">
          {withLabel && <div className="h-4 w-1/4 bg-gray-300 rounded" />}
          <div className="h-10 w-full bg-gray-300 rounded-[10px]" />
        </div>
      ))}
    </div>
  );
}
