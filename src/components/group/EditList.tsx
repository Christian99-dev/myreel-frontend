import { Edit } from "@/types/GroupService";
import PanelButton from "@/components/shared/PanelButton";

export default function EditList ({
  edits,
  onChange,
  active,
}: {
  edits: Edit[];
  onChange: (edit_id: number) => void;
  active?: number | null;
}) {
  return edits.map(({ name, edit_id, created_by, isLive }) => {
    return (
      <PanelButton
        greenBorder={isLive}
        key={edit_id}
        text={name}
        active={active == edit_id}
        onClick={() => onChange(edit_id)}
        user={{
          id: created_by.user_id,
          name: created_by.name,
        }}
      />
    );
  });
};
