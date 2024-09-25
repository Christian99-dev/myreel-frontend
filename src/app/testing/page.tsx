"use client";
import DebugIcons from "@/components/debug/DebugIcon";
import DebugButton from "@/components/debug/DebugButton";
import DebugInput from "@/components/debug/DebugInput";
import DebugSongServices from "@/components/debug/DebugSongServices";
import DebugGroupServices from "@/components/debug/DebugGroupServices";
import DebugFileServices from "@/components/debug/DebugFileService";
import DebugUserServices from "@/components/debug/DebugUserService";
import { SessionService } from "@/utils/session";

export default function Testing() {
  // SessionService.setItem(
  //   "admintoken",
  //   "270d159e9a8324553e131bd49910402f41250450b8d0fa93acaa9deb2896df1c"
  // );

  return (
    <div className="w-screen my-20">
      {false && <DebugInput />}
      {false && <DebugButton />}
      {false && <DebugIcons />}

      {true && <DebugSongServices />}
      <div className="h-20 w-20"></div>
      {true && <DebugGroupServices />}
      <div className="h-20 w-20"></div>
      {true && <DebugFileServices />}
      <div className="h-20 w-20"></div>
      {true && <DebugUserServices />}
    </div>
  );
}
