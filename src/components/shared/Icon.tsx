// Icons
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
import Search from "@/svg/search.svg";

// Theme parameters
import { IconKey, FontSize, MainColor } from "@/types/theme";

// all possible icons
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
  search: Search,
};

export default function Icon({
  name,
  size,
  color,
  strokeWidth = 60,
  groupHover = false,
  hover = false,
  disabled = false
}: {
  name: IconKey;
  size: FontSize;
  color: MainColor;
  strokeWidth?: number;
  groupHover?: boolean;
  hover?: boolean;
  disabled?: boolean
}) {
  // get icon
  const SvgIcon = iconMap[name];

  // hover options
  const hoverOption: Record<MainColor, MainColor> = {
    "purple": "pink-very-light",
    "pink-very-light": "purple",
    "purple-dark": "purple-light",
    "purple-light": "purple-dark",
  };

  return (
    <SvgIcon
      className={`
        transition-colors duration-200 ease-in-out 
        fs-${size} 
        stroke-${color} 
        ${groupHover && !disabled ? `group-hover:stroke-${hoverOption[color]}` : ``}
        ${hover && !disabled ? `hover:stroke-${hoverOption[color]}` : ``}


        ${disabled ? `opacity-50` : `opacity-100`}
        ${disabled ? `!cursor-not-allowed` : ``}
      `}
      strokeWidth={strokeWidth}
    />
  );
}
