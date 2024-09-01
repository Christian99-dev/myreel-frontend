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

// Theme parameters
import { IconKey, FontSize, MainColor } from "@/types/theme";

// Tailwind variables
import tailwindConfig from "@/root/tailwind.config";

// access themecolors typesafe
const themeColors = tailwindConfig.theme?.colors as Record<MainColor, string> | undefined;

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
  size,
  color,
  strokeWidth = 35,
}: {
  name: IconKey;
  size: FontSize;
  color: MainColor;
  strokeWidth?: number;
}) => {
  // get icon
  const SvgIcon = iconMap[name];

  // Safely access the color from the Tailwind configuration
  const strokeColor = themeColors && color in themeColors ? themeColors[color] : "black";

  return (
    <SvgIcon
      stroke={strokeColor}
      className={`fs-${size}`}
      strokeWidth={strokeWidth}
    />
  );
};

export default Icon;
