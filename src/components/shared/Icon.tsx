
import ArrowDown from "@/svg/arrow-down.svg";
import Close from "@/svg/close.svg";
import Eye from "@/svg/eye.svg";
import LockedClosed from "@/svg/lock-closed.svg";
import LockOpen from "@/svg/lock-open.svg";
import Plus from "@/svg/plus.svg";
import Rocket from "@/svg/rocket.svg";
import Switch from "@/svg/switch.svg";
import Thrash from "@/svg/thrash.svg";
import Upload from "@/svg/upload.svg";
import Note from "@/svg/note.svg";
import Pause from "@/svg/pause.svg";
import Play from "@/svg/play.svg";
import { IconKey, FontSize, MainColor } from "@/types/theme";

const iconMap: Record<
  IconKey,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  arrowDown: ArrowDown,
  close: Close,
  eye: Eye,
  lockClosed: LockedClosed,
  lockOpen: LockOpen,
  plus: Plus,
  rocket: Rocket,
  switch: Switch,
  thrash: Thrash,
  upload: Upload,
  note: Note,
  pause: Pause,
  play: Play,
};

const Icon = ({
    name,
    size = 4,
    color = "purple",
  }: {
    name: IconKey;
    size?: FontSize;
    color?: MainColor;
  }) => {
    const SvgIcon = iconMap[name];
    return <SvgIcon strokeWidth={30} className={`fs-${size}`} />;
  };

export default Icon