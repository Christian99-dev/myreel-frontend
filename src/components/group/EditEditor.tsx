import { GetEditResponse } from "@/types/EditService";
import { useEffect, useState } from "react";
import LoadingText from "../shared/LoadingText";
import Icon from "@/components/shared/Icon";
import { EditService } from "@/services/backend/EditService";

export default function EditEditor({ editRes }: { editRes: GetEditResponse | null | undefined }) {
  if (!editRes || editRes.edit.video_src === "") return <Loading />;

  return (
    <div className="w-full h-full">
      Active edit : {editRes.edit.edit_id} {editRes.edit.video_src}
    </div>
  );
}

const Loading = () => (
  <div className="w-full h-full bg-purple-dark flex items-center justify-center flex-col">
    <h1 className="fs-7 text-bold pb-[--spacing-10] font-normal text-pink-very-light">
      <LoadingText text="Edit wird geladen" />
    </h1>
    <Icon
      floating={true}
      strokeWidth={3}
      name="bigHero"
      customSizeTailwindString="text-[150px]"
      color="pink-very-light"
    />
  </div>
);
