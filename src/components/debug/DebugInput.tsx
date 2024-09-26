"use client";
import Input from "@/components/shared/Input";
import { useState } from "react";
import Button from "@/components/shared/Button";

export default function DebugInput() {
  const [inputOne, setInputOne] = useState("test");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("test");
  return (
    <div className="w-1/2 m-auto flex flex-col gap-10 bg-purple-dark p-10">
      <Input
        label="Name"
        placeholder="Dein name"
        onChange={(e) => {
          setInputOne(e.target.value);
        }}
        value={inputOne}
      />
      <Input
        label="Name"
        placeholder="Dein name"
        onChange={(e) => {
          setInputTwo(e.target.value);
        }}
        value={inputTwo}
      />
      <div className="flex">
        <Input
          label="Name"
          placeholder="Dein name"
          onChange={(e) => {
            setInputThree(e.target.value);
          }}
          value={inputThree}
        />

        <div className="flex flex-col">
          <div className="h-full"></div>
          <Button text="Test" />
        </div>
      </div>
    </div>
  );
}
