
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

export type IconKey = "arrowDown" | "close" | "eye" | "lockClosed" | "lockOpen" | "plus" | "rocket" | "switch" | "thrash" | "upload";

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
};

const Icon = ({
    name,
    size = 7,
    color = "pink_very_light",
  }: {
    name: IconKey;
    size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    color?: "pink_very_light" | "purple_light" | "purple" | "purple_dark";
  }) => {
    const SvgIcon = iconMap[name];
    return <SvgIcon strokeWidth={50} className={`fs-${size}`}  />;
  };

export default Icon