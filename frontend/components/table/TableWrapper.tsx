import Text from "@/components/ui/Text";
import ButtonLink from "@/components/ui/ButtonLink";
import TableSearch from "@/components/table/TableSearch";
import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";

type Props = {
  children: React.ReactNode;
  title: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  linkHref?: string;
  linkLabel?: string;
};

export default function TableWrapper({
  children,
  title,
  search,
  setSearch,
  linkHref,
  linkLabel,
}: Props) {
  return (
    <ContentWrapper>
      <ContentHeaderWrapper>
        <div className="flex items-center gap-5 flex-wrap">
          <Text as="h2" className="text-2xl" isTitle>
            {title}
          </Text>
          <TableSearch search={search} setSearch={setSearch} />
        </div>
        {linkHref ? (
          <ButtonLink className="w-max px-6 py-3" href={linkHref}>
            {linkLabel}
          </ButtonLink>
        ) : null}
      </ContentHeaderWrapper>
      <div className="p-10 overflow-x-hidden">
        <div className="overflow-x-auto">{children}</div>
      </div>
    </ContentWrapper>
  );
}
