import ReactSelect from "@/components/form/ReactSelect";
import { Suspense } from "react";
import Await from "@/components/common/Await";
import LocalPageError from "@/components/common/LocalPageError";
import { endpoints } from "@/lib/constants/endpoints";
import { tags } from "@/lib/constants/tags";
import { Extra } from "@/lib/types/extra";
import getExtrasAction from "@/lib/actions/extras/get-extras-action";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import BasicInfoSkeleton from "@/components/skeletons/BasicInfoSkeleton";

export default function Extras() {
  return (
    <Suspense fallback={<BasicInfoSkeleton />}>
      <Await<Extra[]>
        resolve={getExtrasAction}
        errorFallback={(error) => <LocalPageError error={error} />}
      >
        {(extras) => {
          const extrasOptions = extras.map((extra) => ({
            value: extra.id,
            label: extra.name,
          }));
          return (
            <div className="flex items-center">
              <ReactSelect
                options={extrasOptions}
                endpoint={endpoints.extras}
                tag={tags.extras}
                placeholder="Extras"
              />
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
