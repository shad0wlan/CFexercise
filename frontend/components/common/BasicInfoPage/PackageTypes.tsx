import ReactSelect from "@/components/form/ReactSelect";
import { Suspense } from "react";
import Await from "@/components/common/Await";
import LocalPageError from "@/components/common/LocalPageError";
import { endpoints } from "@/lib/constants/endpoints";
import { tags } from "@/lib/constants/tags";
import { PackageType } from "@/lib/types/package-type";
import getPackageTypesAction from "@/lib/actions/package-types/get-package-types-action";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import BasicInfoSkeleton from "@/components/skeletons/BasicInfoSkeleton";

export default function PackageTypes() {
  return (
    <Suspense fallback={<BasicInfoSkeleton />}>
      <Await<PackageType[]>
        resolve={getPackageTypesAction}
        errorFallback={(error) => <LocalPageError error={error} />}
      >
        {(packageTypes) => {
          const packageTypeOptions = packageTypes.map((packageType) => ({
            value: packageType.id,
            label: packageType.name,
          }));
          return (
            <div className="flex items-center">
              <ReactSelect
                options={packageTypeOptions}
                endpoint={endpoints.packageTypes}
                tag={tags.packageTypes}
                placeholder="Τύποι Συσκευασίας"
              />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
