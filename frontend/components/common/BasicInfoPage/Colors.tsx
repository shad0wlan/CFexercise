import ReactSelect from "@/components/form/ReactSelect";
import { Suspense } from "react";
import Await from "@/components/common/Await";
import LocalPageError from "@/components/common/LocalPageError";
import { endpoints } from "@/lib/constants/endpoints";
import { tags } from "@/lib/constants/tags";
import { Color } from "@/lib/types/color";
import getColorsAction from "@/lib/actions/colors/get-colors-action";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import BasicInfoSkeleton from "@/components/skeletons/BasicInfoSkeleton";

export default function Colors() {
  return (
    <Suspense fallback={<BasicInfoSkeleton />}>
      <Await<Color[]>
        resolve={getColorsAction}
        errorFallback={(error) => <LocalPageError error={error} />}
      >
        {(colors) => {
          const colorOptions = colors.map((color) => ({
            value: color.id,
            label: color.name,
          }));
          return (
            <div className="flex items-center">
              <ReactSelect
                options={colorOptions}
                endpoint={endpoints.colors}
                tag={tags.colors}
                placeholder="Χρώματα"
              />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
