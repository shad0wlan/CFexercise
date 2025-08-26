import ContentWrapper from "@/components/ui/ContentWrapper";
import ContentHeaderWrapper from "@/components/ui/ContentHeaderWrapper";
import Text from "@/components/ui/Text";
import ProductionMaterials from "@/components/common/BasicInfoPage/ProductionMaterials";
import Colors from "@/components/common/BasicInfoPage/Colors";
import PackageTypes from "@/components/common/BasicInfoPage/PackageTypes";
import Extras from "@/components/common/BasicInfoPage/Extras";
import { titles } from "@/lib/constants/titles";

export default function BasicInfoPage() {
  return (
    <ContentWrapper className="mt-5">
      <ContentHeaderWrapper>
        <Text as="h2" className="text-2xl" isTitle>
          {titles.basicInfo}
        </Text>
        <div className="mt-3">
          <p className="text-sm text-gray-600">
            💡 <strong>Για να προσθέσετε νέα επιλογή:</strong> Πληκτρολογήστε απευθείας στο πεδίο επιλογής και πατήστε Enter
          </p>
        </div>
      </ContentHeaderWrapper>
      <div className="flex flex-col gap-3 p-10 max-w-[900px] w-full mx-auto">
        <ProductionMaterials />
        <PackageTypes />
        <Colors />
        <Extras />
      </div>
    </ContentWrapper>
  );
}
