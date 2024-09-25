import DebugIcons from "@/components/debug/DebugIcon";
import DebugButton from "@/components/debug/DebugButton";
import DebugInput from "@/components/debug/DebugInput";
import DebugSongServices from "@/components/debug/DebugSongServices";
import DebugGroupServices from "@/components/debug/DebugGroupServices";

export default function Testing() {
    return (
      <div className="w-screen my-20">
        {false && <DebugInput />}
        {false && <DebugButton />}
        {false && <DebugIcons />}
        {false && <DebugSongServices />}
        {true && <DebugGroupServices />}
      </div>
    );
  }