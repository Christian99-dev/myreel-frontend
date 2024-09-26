"use client";

import PanelLayout from "@/components/shared/PanelLayout";
import { GroupService } from "@/services/backend/GroupService";
import { GetResponse } from "@/types/GroupService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { group_id: group_id_param } = useParams<{ group_id: string }>();
  const [group, setGroup] = useState<GetResponse | null>(null);
  const router = useRouter();

  const groupService = new GroupService();

  useEffect(() => {

    if (!group_id_param) {
      // Falls group_id_param nicht vorhanden ist, leite zur Startseite weiter
      router.push("/");
      return;
    }

    groupService
      .getGroup(group_id_param)
      .onError((_, statuscode) => {
        console.log("error")
        switch (statuscode) {
          case 404: {
            alert("Group not found");
            router.push("/")
            break;
          }
          case 403: {
            alert("Unauthorized");
            router.push("/")
            break;
          }
          default: {
            alert(statuscode);
            break;
          }
        }
      })
      .onSuccess((res) => {
        setGroup(res);
      });
  }, []);

  return (
    <PanelLayout title={group ? group.group_name : "Loading ... "}>
      <>test</>
      <></>
    </PanelLayout>
  );
}
