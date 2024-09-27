import { ReactNode } from "react";

export default function PanelLayout({ children }: { children: ReactNode[] }) {
  return (
    <div className="h-screen flex flex-col">
      {/** TopBar */}
      <div className="bg-purple-very-dark p-[--spacing-5] border-b border-b-purple-light">
        {children[0]}
      </div>

      {/** Side Bar und Main Content */}

      <div className="bg-purple-very-dark flex flex-1">
        {/** Side Bar */}
        <div className="border-r border-r-purple-light w-[10%] p-[--spacing-7] relative ios-scrollbar">
          <div className="absolute top-0 left-0 right-0 bottom-0 p-[--spacing-7] overflow-y-auto">
            {children[1]}
          </div>
        </div>

        {/** Main Content */}
        <div className="flex-1 bg-purple-dark relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 px-[--spacing-10] py-[--spacing-10] overflow-y-auto ios-scrollbar">
            {children[2]}
          </div>
        </div>
      </div>
    </div>
  );
}
