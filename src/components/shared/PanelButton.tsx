import UserTag from "./UserTag";

const PanelButton = ({
  text,
  onClick,
  user,
  greenBorder,
  active,
}: {
  text: string;
  onClick?: () => void;
  user?: { name: string; id: number };
  greenBorder?: boolean;
  active?: boolean;
}) => {
  return (
    <button
      className={`
        flex
        justify-between
        items-center
        bg-pink-very-light 
        text-purple 
        hover:bg-purple-light 
        hover:text-pink-very-light  
        
        ${active ? "bg-purple" : ""}
        ${active ? "!text-pink-very-light" : ""}
        
        w-full 
        font-medium 
        rounded-main 
        
        py-[--spacing-2] px-[--spacing-5] 
        text-left
        transition-colors duration-200 ease-in-out

         `}
    >
      {text}

      {user && <UserTag name={user.name} id={user.id} />}
    </button>
  );
};

export default PanelButton;
