import Icon from "@/components/shared/Icon";
import { FontSize, IconKey, MainColor } from "@/types/theme";

const DebugIcons = () => {
  return (
    <div className={`flex py-20 w-full overflow-y-auto`}>
      {<TestSet size={4} color="purple" />}
      {<TestSet size={4} color="purple_dark" />}
      {<TestSet size={4} color="purple_light" />}
      {<TestSet size={4} color="pink_very_light" />}
    </div>
  );
};

const TestSet = ({ size, color }: { size: FontSize; color: MainColor }) => {
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
  const testHorizontal = true;
  return (
    <div className={`${testHorizontal && "flex"}`}>
      {testHorizontal && <div className={`fs-${size}`}>Hallo</div>}
      {iconKeys.map((value, key) => {
        return (
          <div key={key}>
            <Icon name={value} size={size} color={color} />
          </div>
        );
      })}
      {testHorizontal && <div className={`fs-${size}`}>Hallo</div>}
    </div>
  );
};

export default DebugIcons;
