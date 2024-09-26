"use client";
import DebugIcons from "@/components/debug/DebugIcon";
import DebugButton from "@/components/debug/DebugButton";
import DebugInput from "@/components/debug/DebugInput";
import DebugSongServices from "@/components/debug/DebugSongServices";
import DebugGroupServices from "@/components/debug/DebugGroupServices";
import DebugFileServices from "@/components/debug/DebugFileService";
import DebugUserServices from "@/components/debug/DebugUserService";
import DebugEditServices from "@/components/debug/DebugEditService";
import DebugSlotServices from "@/components/debug/DebugSlotService";
import DebugWebSocketServices from "@/components/debug/DebugWebSocket";
import DebugModal from "@/components/debug/DebugModal";
import { SessionService } from "@/utils/session";

export default function Testing() {
  // SessionService.setItem(
  //   "admintoken",
  //   "270d159e9a8324553e131bd49910402f41250450b8d0fa93acaa9deb2896df1c"
  // );

  return (
    <div className="w-screen my-20">
      {true && <DebugModal />}
      {false && <DebugInput />}
      {true && <DebugButton />}
      {true && <DebugIcons />}

      {false && <DebugSongServices />}
      <div className="h-20 w-20"></div>
      {false && <DebugGroupServices />}
      <div className="h-20 w-20"></div>
      {false && <DebugFileServices />}
      <div className="h-20 w-20"></div>
      {false && <DebugUserServices />}
      <div className="h-20 w-20"></div>
      {false && <DebugEditServices />}
      <div className="h-20 w-20"></div>
      {false && <DebugSlotServices />}
      <div className="h-20 w-20"></div>
      {false && <DebugWebSocketServices />}
      
    
    </div>
  );
}
