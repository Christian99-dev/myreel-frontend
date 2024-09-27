import React from "react";
import UserTag from "./UserTag";

const PanelButton = ({
  text,
  onClick,
  user,
  greenBorder,
  active,
  alt,
}: {
  text: string;
  onClick?: () => void;
  user?: { name: string; id: number };
  greenBorder?: boolean;
  active?: boolean;
  alt?: "create";
}) => {
  const styleMap = {
    default: {
      border: greenBorder ? "border-[#86ba7b] border-[2px]" : "",
      background: "bg-pink-very-light",
      textColor: "text-purple",
      hover: "hover:bg-purple-light hover:text-pink-very-light",
    },
    create: {
      border: "border-2 border-dotted border-purple-light",
      background: "bg-pink-light bg-opacity-50 group",
      textColor: "text-purple-light",
      hover: "hover:border-pink-very-light hover:text-pink-very-light",
    },
  };

  const activeStyles = {
    background: "bg-purple",
    textColor: "!text-pink-very-light",
    hover: "hover:bg-purple-light hover:text-pink-very-light",
  };

  // Bestimmen des aktuellen Stils basierend auf dem 'alt'-Prop
  const currentStyle = alt === "create" ? styleMap.create : styleMap.default;

  // Kombinieren der Basis- und aktuellen Stilklassen
  let classes = `
    flex
    justify-between
    items-center
    w-full
    font-medium
    rounded-main
    py-[--spacing-2] px-[--spacing-5]
    text-left
    transition-colors duration-200 ease-in-out
    ${currentStyle.border}
    ${currentStyle.background}
    ${currentStyle.textColor}
    ${currentStyle.hover}
  `;

  // Hinzufügen der aktiven Stilklassen, falls 'active' wahr ist
  if (active) {
    classes += `
      ${activeStyles.background}
      ${activeStyles.textColor}
      ${activeStyles.hover}
    `;
  }

  return (
    <button onClick={onClick} className={classes}>
      {text}

      {/* 
        Wenn 'alt' auf "create" gesetzt ist und ein Benutzer vorhanden ist, 
        zeigen wir das UserTag nur bei Hover.
      */}
      {user && alt === "create" ? (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <UserTag name={user.name} id={user.id} />
        </div>
      ) : (
        user && <UserTag name={user.name} id={user.id} />
      )}
    </button>
  );
};

export default PanelButton;
