import Icon from "@/components/shared/Icon";
import { FontSize, IconKey, MainColor } from "@/types/theme";

const DebugIcons = () => {
  return (
    <div className={`flex py-20 w-full overflow-y-auto`}>
      {<TestSet strokeWidth={1} size={2} color="purple" />}
      {<TestSet strokeWidth={2} size={2} color="purple_dark" />}
      {/* {<TestSet strokeWidth={3} size={2} color="purple_light" />} */}
      {/* {<TestSet strokeWidth={4} size={2} color="pink_very_light" />} */}
    </div>
  );
};

const TestSet = ({ strokeWidth, size, color }: { strokeWidth: number, size: FontSize; color: MainColor }) => {
  const iconKeys: IconKey[] = [
    "arrowDown",
    "close",
    "eye",
    "lockClosed",
    "lockOpen",
    "plus",
    "rocket",
    "switch",
    "thrash",
    "upload",
    "note",
    "pause",
    "play",
  ];
  const testHorizontal = false;
  return (
    <div className={`${testHorizontal && "flex"}`}>
      {testHorizontal && <div className={`fs-${size}`}>Hallo</div>}
      {iconKeys.map((value, key) => {
        return (
          <div key={key}>
            <Icon strokeWidth={strokeWidth} name={value} size={size} color={color} />
          </div>
        );
      })}
      {testHorizontal && <div className={`fs-${size}`}>Hallo</div>}
    </div>
  );
};

export default DebugIcons;
