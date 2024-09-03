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
import Link from "next/link";

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
  onClick,
  href,
  strokeWidth = 60,
  groupHover = false,
  disabled = false,
}: {
  name: IconKey;
  size: FontSize;
  color: MainColor;
  onClick?: () => any;
  href?: string;
  strokeWidth?: number;
  groupHover?: boolean;
  disabled?: boolean;
}) {
  // get icon
  const SvgIcon = iconMap[name];

  // hover color
  const hoverColor = {
    "purple": "pink-very-light",
    "pink-very-light": "purple",
    "purple-dark": "purple-light",
    "purple-light": "purple-dark",
  }[color];

  // determine if hover and cursor effects should be applied
  const applyHover = (onClick || href) && !disabled;
  const cursorClass = applyHover ? "cursor-pointer" : "cursor-default";

  const classNames = `
    transition-colors duration-200 ease-in-out 
    fs-${size} 
    stroke-${color}
    ${groupHover ? `group-hover:stroke-${hoverColor} group-hover:cursor-pointer` : ``}
    ${applyHover ? `hover:stroke-${hoverColor}` : ``}
    ${disabled ? `opacity-50 cursor-not-allowed` : `opacity-100`}
    ${cursorClass}
  `;

  if (disabled) {
    return <SvgIcon className={classNames} strokeWidth={strokeWidth} />;
  }

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <SvgIcon className={classNames} strokeWidth={strokeWidth} />
      </Link>
    );
  }

  if (onClick) {
    return (
      <div className="inline-block" onClick={onClick}>
        <SvgIcon className={classNames} strokeWidth={strokeWidth} />
      </div>
    );
  }

  return <SvgIcon className={classNames} strokeWidth={strokeWidth} />;
}