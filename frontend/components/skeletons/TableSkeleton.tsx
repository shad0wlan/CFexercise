import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import Text from "@/components/ui/Text";

import ContentWrapper from "@/components/ui/ContentWrapper";

type Props = {
  title: string;
};

export default function TableSkeleton({ title }: Props) {
  return (
    <ContentWrapper>
      <ContentHeaderWrapper>
        <Text as="h2" className="text-2xl" isTitle>
          {title}
        </Text>
      </ContentHeaderWrapper>
      <div className="animate-pulse p-10 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2.5 min-w-[1200px]">
          <thead>
            <tr>
              {[...Array(6)].map((_, index) => (
                <th key={index} className="px-5 pb-4 text-left">
                  <div className="h-5 bg-gray-200 rounded w-32"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(6)].map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-5 first:border-l last:border-r border-y first:rounded-l-lg last:rounded-r-lg text-left"
                  >
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ContentWrapper>
  );
}
