import DebugIcons from "@/components/debug/DebugIcon";
import DebugButton from "@/components/debug/DebugButton";
import DebugInput from "@/components/debug/DebugInput";
import DebugRoutes from "@/components/debug/DebugRoutes";

export default function Testing() {
    return (
      <div className="w-screen my-20">
        {false && <DebugInput />}
        {false && <DebugButton />}
        {false && <DebugIcons />}
        {true && <DebugRoutes />}
      </div>
    );
  }