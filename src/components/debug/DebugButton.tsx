import Button from "@/components/shared/Button";
import Icon from "@/components/shared/Icon";

export default function DebugButton() {
  return (
    <div className="w-full flex my-20 gap-10 text-center justify-center align-center">
      <div className="flex flex-col gap-5">
        <Button text="Button" theme="dark" />
        <Button text="Button" />
        <Button text="Gruppe Suchen" iconName="search" theme="dark" />
        <Button text="Gruppe Suchen" iconName="eye" />
        <Button text="Button" iconPosition="right" iconName="plus" theme="dark" />
        <Button text="Button" iconPosition="right" iconName="eye" />
      </div>
      <div className="flex flex-col gap-5">
        <Button text="Button" theme="dark" disabled />
        <Button text="Button" disabled />
        <Button text="Gruppe Suchen" iconName="plus" theme="dark" disabled />
        <Button text="Gruppe Suchen" iconName="eye" disabled />
        <Button text="Button" iconPosition="right" iconName="plus" theme="dark" disabled />
        <Button text="Button" iconPosition="right" iconName="eye" disabled />
      </div>
      <div className="flex flex-col gap-5">
        <Icon size={4} name="close" color="pink-very-light" />
        <Icon size={4} name="eye" color="purple" />
        <Icon size={4} name="plus" color="purple-light" />
        <Icon size={4} name="lockOpen" color="purple-dark" />
      </div>
      <div className="flex flex-col gap-5">
        <Icon size={4} hover={true} name="close" color="pink-very-light" />
        <Icon size={4} hover={true} name="eye" color="purple" />
        <Icon size={4} hover={true} name="plus" color="purple-light" />
        <Icon size={4} hover={true} name="lockOpen" color="purple-dark" />
      </div>
      <div className="flex flex-col gap-5">
        <Icon disabled={true} size={4} hover={true} name="close" color="pink-very-light" />
        <Icon disabled={true} size={4} hover={true} name="eye" color="purple" />
        <Icon disabled={true} size={4} hover={true} name="plus" color="purple-light" />
        <Icon disabled={true} size={4} hover={true} name="lockOpen" color="purple-dark" />
      </div>
    </div>
  );
}
