import Button from "@/components/shared/Button";
import Icon from "@/components/shared/Icon";

export default function Hero() {
  return (
    <header className="min-h-screen flex flex-col">
      {/** Header */}
      <nav className="flex justify-between items-center py-[--spacing-6] px-[--border]">
        <p className="fs-6 text-pink-very-light font-medium">YourReel</p>
        <div className="flex gap-[--spacing-5]">
          <Button iconName="plus" theme="dark" text="Gruppe Erstellen" />
          <Button iconName="search" text="Gruppe Finden" />
        </div>
      </nav>

      {/** Text Section */}
      <div className="flex-1 w-full flex items-center px-[--border] justify-between">
        {/** Text */}
        <div className="w-[60%] flex flex-col gap-[--spacing-7]">
          <h1 className="fs-3 text-[#FFF] font-bold leading-[75px]">
            Kreiere beeindruckende{" "}
            <p className="text-purple-light">Social Media Edits</p>mühelos!
          </h1>
          <h2 className="fs-8 font-medium text-pink-very-light leading-[25px]">
            Erstelle gemeinsam mit anderen kurze, kreative Videos - ganz ohne
            teure Software oder Vorkenntnisse.
          </h2>

          {/** Buttons*/}
          <div className="flex gap-[--spacing-5]">
            <Button iconName="plus" theme="dark" text="Gruppe Erstellen" />
            <Button iconName="search" text="Gruppe Finden" />
          </div>
        </div>

        {/** Icon */}
        <div className="w-min">
          <Icon
            strokeWidth={4}
            name="bigHero"
            customSizeTailwindString="text-[350px]"
            color="pink-very-light"
          />
        </div>
      </div>
    </header>
  );
}
