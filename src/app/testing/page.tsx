import DebugIcons from "@/components/debug/DebugIcon";
import DebugButton from "@/components/debug/DebugButton";
import DebugInput from "@/components/debug/DebugInput";

export default function Testing() {
    return (
      <div className="w-screen my-20">
        {true && <DebugInput />}
        {true && <DebugButton />}
        {true && <DebugIcons />}
      </div>
    );
  }