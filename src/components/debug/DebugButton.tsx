"use client"
import Button from "@/components/shared/Button";
import Icon from "@/components/shared/Icon";

export default function DebugButton() {
  return (
    <div className="w-full flex-col flex my-20 gap-10 text-center justify-center align-center">

      <div className="flex gap-5 justify-center">
        <h1>Style</h1>
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
      </div>

      <div className="flex gap-5 justify-center">
        <h1>Style</h1>
        <div className="flex flex-col gap-5">
          <Icon size={4} name="close" color="pink-very-light" />
          <Icon size={4} name="eye" color="purple" />
          <Icon size={4} name="plus" color="purple-light" />
          <Icon size={4} name="lockOpen" color="purple-dark" />
        </div>
        <div className="flex flex-col gap-5">
          <Icon disabled={true} size={4} name="close" color="pink-very-light" />
          <Icon disabled={true} size={4} name="eye" color="purple" />
          <Icon disabled={true} size={4} name="plus" color="purple-light" />
          <Icon disabled={true} size={4} name="lockOpen" color="purple-dark" />
        </div>
      </div>

      <div className="flex gap-5 justify-center">
        <h1>Functionality</h1>
        <div className="flex flex-col gap-5">  
          <Button text="nothing" iconPosition="right" iconName="eye" />
          <Button onClick={() => console.log("Button click!")} href="/" text="onclick und href" iconPosition="right" iconName="eye" />
          <Button onClick={() => console.log("Button click!")} text="onclick" iconPosition="right" iconName="eye" />
          <Button href="/" text="href" iconPosition="right" iconName="eye" />
        </div>

        <div className="flex flex-col gap-5">  
          <Button disabled={true} text="nothing" iconPosition="right" iconName="eye" />
          <Button disabled={true} onClick={() => console.log("Button click!")} href="/" text="onclick und href" iconPosition="right" iconName="eye" />
          <Button disabled={true} onClick={() => console.log("Button click!")} text="onclick" iconPosition="right" iconName="eye" />
          <Button disabled={true} href="/" text="href" iconPosition="right" iconName="eye" />
        </div>
      </div>

      <div className="flex gap-5 justify-center">
        <h1>Functionality</h1>
        <div className="flex flex-col gap-5">  
          <div className="flex gap-5">
            <p>nothing</p>
            <Icon size={4} name="close" color="purple" />
            <Icon disabled={true} size={4} name="close" color="purple" />
          </div>
          <div className="flex gap-5">
            <p>onclick und href</p>
            <Icon size={4} onClick={() => console.log("Icon click!")} href="/" name="close" color="purple" />
            <Icon disabled={true} size={4} onClick={() => console.log("Icon click!")} href="/" name="close" color="purple" />
          </div>          
          <div className="flex gap-5">
            <p>onclick</p>
            <Icon size={4} onClick={() => console.log("Icon click!")} name="close" color="purple" />
            <Icon disabled={true} size={4} onClick={() => console.log("Icon click!")} name="close" color="purple" />
          </div>          
          <div className="flex gap-5">
            <p>href</p>
            <Icon size={4} href="/" name="close" color="purple" />
            <Icon disabled={true} size={4} href="/" name="close" color="purple" />
          </div>     
        </div>

      </div>
    </div>
  );
}
