"use client";
import { IconKey, MainColor } from "@/types/theme";
import Icon from "./Icon";
import Link from "next/link";

export default function Button({
  text,
  iconName,
  onClick,
  href,
  theme = "light",
  iconPosition = "left",
  disabled = false,
}: {
  text: string;
  iconName?: IconKey;
  onClick?: () => any;
  href?: string;
  theme?: "light" | "dark";
  iconPosition?: string;
  disabled?: boolean;
}) {
  // Parameters
  const smallerPadding = iconName != undefined;

  // Style
  const style: Record<
    "light" | "dark",
    {
      font: MainColor;
      fontHover: MainColor;
      background: MainColor;
      backgroundHover: MainColor;
    }
  > = {
    dark: {
      font: "pink-very-light",
      fontHover: "purple",
      background: "purple",
      backgroundHover: "pink-very-light",
    },
    light: {
      font: "purple",
      fontHover: "pink-very-light",
      background: "pink-very-light",
      backgroundHover: "purple",
    },
  };
  const padding = smallerPadding
    ? "py-[--spacing-2] px-[--spacing-5]"
    : "py-[--spacing-2] px-[--spacing-8]";
  const opacity = disabled ? "opacity-50" : "opacity-100";
  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";

  const content = (
    <>
      {iconName && iconPosition === "left" && (
        <Icon
          groupHover={true}
          name={iconName}
          size={9}
          color={style[theme].font}
        />
      )}
      {text}
      {iconName && iconPosition === "right" && (
        <Icon
          groupHover={true}
          name={iconName}
          size={9}
          color={style[theme].font}
        />
      )}
    </>
  );

  const classNames = `
    ${disabled ? `` : `group`}
    self-start
    rounded-main 
    flex
    fs-9 
    gap-[--spacing-2]  
    font-medium
    transition-colors duration-200 ease-in-out

    ${padding}
    ${opacity}
    ${cursor}

    text-${style[theme].font}
    ${disabled ? `` : `hover:text-${style[theme].fontHover}`}

    bg-${style[theme].background}
    ${disabled ? `` : `hover:bg-${style[theme].backgroundHover}`}
  `;

  if (href && !disabled) {
    return (
      <Link href={href} className={classNames}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classNames}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
