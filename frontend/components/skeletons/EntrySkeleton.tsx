import EntryFormSectionLabel from "@/components/common/EntryForm/EntryFormSectionLabel";

export default function EntrySkeleton() {
  return (
    <div className="py-10 flex flex-col gap-10">
      <div className="flex gap-5 flex-col lg:flex-col px-5 sm:px-10 animate-pulse">
        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
        </div>
        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="flex gap-5">
              <div className="w-full flex flex-col gap-2">
                <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 lg:flex-row px-5 sm:px-10 flex-col-reverse animate-pulse">
        <div className="relative aspect-[2/1] w-full lg:w-1/2 bg-gray-300 rounded-lg"></div>
        <div className="flex gap-5 flex-col w-full lg:w-1/2 lg:flex-col ml-auto mt-5">
          <EntryFormSectionLabel
            label="Θερμοκρασίες"
            className="rounded-[20px]"
          />
          <div className="flex gap-5 flex-col lg:flex-col">
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
            <div className="flex flex-col lg:flex-col gap-2">
              <div className="h-5 bg-gray-300 rounded w-1/4"></div>
              <div className="gap-5 flex-col lg:flex-row grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-10 bg-gray-300 rounded-[10px]"
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:flex-col gap-2">
              <div className="h-5 bg-gray-300 rounded w-1/4"></div>
              <div className="gap-5 flex-col lg:flex-row grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-10 bg-gray-300 rounded-[10px]"
                  ></div>
                ))}
              </div>
              <div className="w-full flex flex-col gap-2 lg:w-1/2">
                <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                <div className="w-full h-10 bg-gray-300 rounded-[10px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EntryFormSectionLabel label="Λεπτομέρειες" className="my-5" />
      <div className="flex gap-5 flex-col px-5 sm:px-10 lg:flex-col animate-pulse">
        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
          <div className="w-full flex flex-col gap-2 lg:w-[200%]">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
          </div>
        </div>
        <div className="flex gap-5 flex-col lg:gap-0 lg:flex-row">
          <div className="flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2">
              <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
              <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
              <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
            </div>
          </div>
          <div className="flex gap-5 w-full flex-col lg:flex-row">
            <div className="flex flex-col gap-5 lg:w-1/3">
              <div className="w-full flex flex-col gap-2">
                <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                <div className="h-10 w-full bg-gray-300 rounded-[10px]"></div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
              <div className="h-32 w-full bg-gray-300 rounded-[10px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
